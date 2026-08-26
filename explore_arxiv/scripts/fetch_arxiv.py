#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
fetch_arxiv.py — targeted arXiv fetcher for the tooth-PnP robustness study.

Why this exists
---------------
The offline tooth-tracking pipeline (Codebase/new_exps) currently reaches only
~40-50% final PnP success because LightGlue (lg) "大量失败" on a large fraction
of frames. The failure clusters are:
  (a) specular highlights blowing out the shiny tooth surface,
  (b) background mismatch between guide views (synthetic bg) and the live query,
  (c) low texture / near-planar geometry -> too few stable keypoint pairs,
  (d) a generic descriptor that does not "understand" guide<->frame similarity.

This script pulls the research most likely to move the needle:
  * dense / semi-dense matchers that survive low texture (LoFTR, ASpanFormer, ...)
  * illumination-invariant / highlight-removal methods for matching
  * render-based (CG <-> CV) 6D pose estimators that use a known mesh
    (MegaPose, FoundationPose, Gen6D, CosyPose, ...) -- we already have upper1.ply
  * few-shot / domain-adapted local features

It uses ONLY the Python standard library (urllib + xml.etree) so it runs
anywhere. Output:
  data/arxiv_raw.json     full parsed records (deduped)
  data/arxiv_index.csv    one line per paper (id,title,bucket,score)
  data/arxiv_digest.md    abstracts grouped by research bucket (the "reading" artifact)

Usage:
  python fetch_arxiv.py                 # fetch + write all outputs
  python fetch_arxiv.py --max 25        # results per keyword query
  python fetch_arxiv.py --pdf 8         # also download + text-extract top N PDFs
"""
from __future__ import annotations

import argparse
import csv
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parent
DATA = HERE.parent / "data"
DATA.mkdir(parents=True, exist_ok=True)

API = "https://export.arxiv.org/api/query"

# ── research buckets (each = one arXiv keyword query) ────────────────────────
BUCKETS = [
    ("dense_matcher",        'all:"detector-free local feature matching"'),
    ("semi_dense",           'all:"semi-dense feature matching"'),
    ("loftr",                'all:"LoFTR"'),
    ("aspantopic",           'all:"ASpanFormer" OR all:"MatchFormer" OR all:"TopicFM"'),
    ("illum_invariant",      'all:"illumination invariant" AND all:"matching"'),
    ("highlight_removal",    'all:"specular highlight removal" OR all:"highlight removal"'),
    ("render_pose",          'all:"6D pose" AND all:"rendering"'),
    ("render_mesh_pose",     'all:"object pose" AND all:"mesh" AND all:"rendering"'),
    ("megapose_family",      'all:"MegaPose" OR all:"FoundationPose" OR all:"Gen6D"'),
    ("cosypose_mv",          'all:"CosyPose" OR all:"multi-view 6D pose"'),
    ("fewshot_features",     'all:"few-shot" AND all:"local feature"'),
    ("known_model_pose",     'all:"6D pose estimation" AND all:"known model"'),
    ("dental_reg",           'all:"tooth" AND all:"registration"'),
    ("detectors",            'all:"SuperPoint" OR all:"ALIKED" OR all:"DISK local features" OR all:"R2D2"'),
]

# Guaranteed-inclusion flagship papers (arXiv ids) regardless of keyword recall.
# All IDs below were verified against the arXiv API (title match) on 2026-08-03.
FLAGSHIP_IDS = [
    "2306.13643",  # LightGlue (ICCV 2023)        -- current matcher
    "2404.19174",  # XFeat (CVPR 2024)            -- current detector
    "1911.11763",  # SuperGlue (CVPR 2020)
    "2104.00680",  # LoFTR (CVPR 2021)
    "2208.14201",  # ASpanFormer (ECCV 2022)
    "2203.09645",  # MatchFormer (CVPR 2022)
    "2207.00328",  # TopicFM (CVPR 2023)
    "2212.06870",  # MegaPose (NeurIPS 2022)
    "2312.08344",  # FoundationPose (CVPR 2024)
    "2204.10776",  # Gen6D (CVPR 2022)
    "2008.08465",  # CosyPose (CVPR 2020)
    "2001.01869",  # HybridPose (CVPR 2020)
    "2104.13526",  # ZePHyR (ECCV 2024)
    "2006.13566",  # DISK (NeurIPS 2020)
]


def _ns(tag: str) -> str:
    return "{http://www.w3.org/2005/Atom}" + tag


def _arxiv_ns(tag: str) -> str:
    return "{http://arxiv.org/schemas/atom}" + tag


def fetch_query(query: str, max_results: int, sleep: float = 1.0) -> list[dict]:
    params = {
        "search_query": query,
        "start": 0,
        "max_results": max_results,
        "sortBy": "relevance",
        "sortOrder": "descending",
    }
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": "exp_idea/1.0"})
    try:
        raw = urllib.request.urlopen(req, timeout=30).read()
    except Exception as e:  # network hiccup -> skip bucket, don't crash
        print(f"  [warn] query failed ({query[:40]}...): {e}", file=sys.stderr)
        return []
    time.sleep(sleep)
    return _parse_feed(raw)


def fetch_ids(ids: list[str], sleep: float = 0.5) -> list[dict]:
    params = {"id_list": ",".join(ids), "max_results": len(ids)}
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": "exp_idea/1.0"})
    try:
        raw = urllib.request.urlopen(req, timeout=30).read()
    except Exception as e:
        print(f"  [warn] id_list fetch failed: {e}", file=sys.stderr)
        return []
    time.sleep(sleep)
    return _parse_feed(raw)


def _parse_feed(raw: bytes) -> list[dict]:
    root = ET.fromstring(raw)
    out = []
    for e in root.findall(_ns("entry")):
        aid_full = e.findtext(_ns("id"), "").strip()
        m = re.search(r"abs/([^v]+)(v\d+)?", aid_full)
        aid = m.group(1) if m else aid_full
        title = " ".join(e.findtext(_ns("title"), "").split())
        summary = " ".join(e.findtext(_ns("summary"), "").split())
        authors = [a.findtext(_ns("name"), "") for a in e.findall(_ns("author"))]
        published = e.findtext(_ns("published"), "")
        updated = e.findtext(_ns("updated"), "")
        cats = [c.get("term") for c in e.findall(_ns("category"))]
        prim = e.find(_arxiv_ns("primary_category"))
        prim_cat = prim.get("term") if prim is not None else (cats[0] if cats else "")
        # pdf link
        pdf = ""
        for l in e.findall(_ns("link")):
            if l.get("title") == "pdf" or (l.get("type") == "application/pdf"):
                pdf = l.get("href", "")
        if not pdf:
            pdf = aid_full.replace("/abs/", "/pdf/")
        out.append({
            "id": aid,
            "title": title,
            "abstract": summary,
            "authors": authors,
            "published": published,
            "updated": updated,
            "categories": cats,
            "primary_category": prim_cat,
            "pdf": pdf,
            "abs_url": f"https://arxiv.org/abs/{aid}",
        })
    return out


def normalize(aid: str) -> str:
    return aid.split("v")[0]


def main():
    ap = argparse.ArgumentParser(description="Targeted arXiv fetcher for tooth-PnP study")
    ap.add_argument("--max", type=int, default=20, help="max results per keyword query")
    ap.add_argument("--pdf", type=int, default=0,
                    help="also download + text-extract the top N papers by bucket count")
    ap.add_argument("--no-flagship", action="store_true")
    args = ap.parse_args()

    records: dict[str, dict] = {}
    bucket_of: dict[str, set] = {}

    def add(rec, bucket):
        key = normalize(rec["id"])
        old = records.get(key)
        if old is None:
            rec["buckets"] = []
            records[key] = rec
        if bucket and bucket not in records[key]["buckets"]:
            records[key]["buckets"].append(bucket)
        bucket_of.setdefault(key, set()).add(bucket)

    print(f"[fetch] {datetime.now(timezone.utc):%Y-%m-%d %H:%M UTC}")
    for name, q in BUCKETS:
        print(f"  bucket '{name}': {q}")
        for r in fetch_query(q, args.max):
            add(r, name)
    if not args.no_flagship:
        print(f"  flagship ids: {len(FLAGSHIP_IDS)}")
        for r in fetch_ids(FLAGSHIP_IDS):
            add(r, "flagship")

    all_recs = list(records.values())
    # score = number of buckets a paper landed in (proxy for relevance)
    for r in all_recs:
        r["bucket_count"] = len(r["buckets"])

    all_recs.sort(key=lambda r: (-r["bucket_count"], r["published"]), reverse=False)
    all_recs.sort(key=lambda r: (-r["bucket_count"], r["published"]))

    # ── raw json ──
    raw_path = DATA / "arxiv_raw.json"
    raw_path.write_text(json.dumps(all_recs, indent=2, ensure_ascii=False),
                        encoding="utf-8")
    print(f"[fetch] {len(all_recs)} unique papers -> {raw_path}")

    # ── index csv ──
    csv_path = DATA / "arxiv_index.csv"
    with csv_path.open("w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["id", "title", "primary_category", "published", "bucket_count",
                    "buckets", "abs_url"])
        for r in all_recs:
            w.writerow([r["id"], r["title"], r["primary_category"], r["published"][:10],
                        r["bucket_count"], "|".join(r["buckets"]), r["abs_url"]])
    print(f"[fetch] index -> {csv_path}")

    # ── digest markdown (the "reading" artifact) ──
    _write_digest(all_recs)

    # ── optional PDF text extraction ──
    if args.pdf and args.pdf > 0:
        _maybe_pdf(all_recs, args.pdf)

    print("[fetch] done.")


def _write_digest(recs: list[dict]):
    lines = [
        "# arXiv digest — tooth-PnP robustness study",
        "",
        f"_Generated {datetime.now(timezone.utc):%Y-%m-%d %H:%M UTC} · "
        f"{len(recs)} unique papers_",
        "",
        "Grouped by research bucket. `(*)` marks flagship papers pulled by id.",
        "",
    ]
    # group by primary bucket (first bucket), but keep flagships in their own section
    order = ["dense_matcher", "semi_dense", "loftr", "aspantopic", "detectors",
             "illum_invariant", "highlight_removal", "render_pose",
             "render_mesh_pose", "megapose_family", "cosypose_mv",
             "fewshot_features", "known_model_pose", "dental_reg", "flagship"]
    by_bucket: dict[str, list[dict]] = {b: [] for b in order}
    for r in recs:
        placed = False
        for b in order:
            if b in r["buckets"]:
                by_bucket[b].append(r)
                placed = True
                break
        if not placed:
            by_bucket.setdefault("other", []).append(r)

    titles = {
        "dense_matcher": "Dense / detector-free local feature matching",
        "semi_dense": "Semi-dense feature matching",
        "loftr": "LoFTR family",
        "aspantopic": "ASpanFormer / MatchFormer / TopicFM",
        "illum_invariant": "Illumination-invariant matching",
        "highlight_removal": "Specular highlight removal",
        "render_pose": "Render-based 6D pose (general)",
        "render_mesh_pose": "Mesh + rendering pose estimation",
        "megapose_family": "MegaPose / FoundationPose / Gen6D",
        "cosypose_mv": "CosyPose / multi-view pose",
        "fewshot_features": "Few-shot / domain-adapted local features",
        "known_model_pose": "Pose from a known 3D model",
        "dental_reg": "Dental / tooth registration",
        "detectors": "Robust local feature detectors (SuperPoint/ALIKED/DISK/R2D2)",
        "flagship": "Flagship pull-list (by id)",
        "other": "Other / uncategorized",
    }
    for b in order + ["other"]:
        items = by_bucket.get(b)
        if not items:
            continue
        lines += ["", f"## {titles.get(b, b)} ({len(items)})", ""]
        for r in sorted(items, key=lambda x: x["published"], reverse=True):
            star = " (*)" if "flagship" in r["buckets"] else ""
            lines.append(f"### {r['title']}{star}")
            lines.append(f"- **id**: {r['id']} · {r['primary_category']} · "
                         f"{r['published'][:10]} · buckets={','.join(r['buckets'])}")
            lines.append(f"- **url**: {r['abs_url']}")
            auth = ", ".join(r["authors"][:4]) + (" et al." if len(r["authors"]) > 4 else "")
            lines.append(f"- **authors**: {auth}")
            lines.append(f"- **abstract**: {r['abstract']}")
            lines.append("")

    out = DATA / "arxiv_digest.md"
    out.write_text("\n".join(lines), encoding="utf-8")
    print(f"[fetch] digest -> {out}")


def _maybe_pdf(recs: list[dict], top_n: int):
    """Best-effort: download + text-extract top-N papers. Needs `pypdf`."""
    try:
        import pypdf  # type: ignore
    except Exception:
        print("  [pdf] pypdf not installed; skipping PDF text extraction "
              "(abstracts already saved in arxiv_raw.json).", file=sys.stderr)
        return
    out_dir = DATA / "papers"
    out_dir.mkdir(parents=True, exist_ok=True)
    chosen = sorted(recs, key=lambda r: -r["bucket_count"])[:top_n]
    for r in chosen:
        pdf_url = r["pdf"].replace("http://", "https://")
        if not pdf_url.endswith(".pdf"):
            pdf_url += ".pdf"
        try:
            req = urllib.request.Request(pdf_url, headers={"User-Agent": "exp_idea/1.0"})
            data = urllib.request.urlopen(req, timeout=60).read()
            tmp = out_dir / f"{r['id']}.pdf"
            tmp.write_bytes(data)
            reader = pypdf.PdfReader(str(tmp))
            text = "\n".join((p.extract_text() or "") for p in reader.pages)
            (out_dir / f"{r['id']}.txt").write_text(text, encoding="utf-8")
            print(f"  [pdf] {r['id']}: {len(reader.pages)} pages extracted")
        except Exception as e:
            print(f"  [pdf] {r['id']} failed: {e}", file=sys.stderr)


if __name__ == "__main__":
    main()
