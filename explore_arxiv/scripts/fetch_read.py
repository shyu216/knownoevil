#!/usr/bin/env python3
"""
fetch_read.py -- Deep-read arXiv papers for the tooth-PnP bottleneck study.

Strategy (cheap -> expensive):
  1. native arXiv HTML  (arxiv.org/html/{id})        -> clean LaTeXML, structured
  2. ar5iv HTML mirror   (ar5iv.labs.arxiv.org/html)  -> clean LaTeXML for most papers
  3. arXiv PDF           (arxiv.org/pdf/{id})         -> pypdf text (fallback)

For every paper we pull:
  - Title
  - Abstract  (slice between 'Abstract' and 'Introduction')
  - Discussion / Conclusion / Limitation sections (linear text slice)

Output:
  data/readings/{id}.md           per-paper full extracted text (cache)
  data/readings/{id}.{html|pdf}   raw download cache (so re-runs are free)

Usage:
  python scripts/fetch_read.py
"""
import os, re, sys, json, time, urllib.request, urllib.error
import pypdf

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MD = os.path.join(ROOT, "data", "md")
PDF = os.path.join(ROOT, "data", "pdf")
os.makedirs(MD, exist_ok=True)
os.makedirs(PDF, exist_ok=True)

UA = "exp_idea/1.0 (research reading bot; mailto:researcher@example.com)"

# ---- Verified focus set (IDs double-checked against arXiv title API) ----
# Grouped by the THREE levers we care about for the 40%->60% PnP problem.
FOCUS = [
    # === Lever B: matching that "understands" guide-frame similarity + more kptpairs ===
    ("match",   "2306.13643", "LightGlue"),
    ("match",   "2104.00680", "LoFTR"),
    ("match",   "2208.14201", "ASpanFormer"),
    ("match",   "2207.00328", "TopicFM"),
    ("match",   "1911.11763", "SuperGlue"),
    ("match",   "2402.08671", "SemiDense_vs_LG_eval"),
    ("match",   "2505.02161", "ConfGuidedAttn"),
    # === Lever A: detectors that maximize reliable keypoints (kptpair count) ===
    ("detect",  "2404.19174", "XFeat"),
    ("detect",  "1906.06195", "R2D2"),
    ("detect",  "2006.13566", "DISK"),
    ("detect",  "1712.07629", "SuperPoint"),
    # === Lever C: render-based (CG<->CV) pose -- high-ceiling alternative ===
    ("render",  "2212.06870", "MegaPose"),
    ("render",  "2312.08344", "FoundationPose"),
    ("render",  "2204.10776", "Gen6D"),
    ("render",  "2104.13526", "ZePHyR"),
    # === Lever A (robustness): highlight / illumination invariance ===
    ("highlight","2512.09583","UnReflectAnything"),
    ("highlight","1803.09448","REST_real2syn"),
    # === Near-planar / weak-texture (our tooth is near-planar) ===
    ("planar",  "2207.03539", "RWT_SLAM_weaktex"),
    ("planar",  "2305.17463", "PentagonMatch"),
]

def fetch(url, binary=False, timeout=60):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    data = urllib.request.urlopen(req, timeout=timeout).read()
    return data if binary else data.decode("utf-8", "replace")

def strip_tags(html):
    html = re.sub(r"(?is)<(script|style|head|nav|footer)[^>]*>.*?</\1>", " ", html)
    html = re.sub(r"(?is)<!--.*?-->", " ", html)
    html = re.sub(r"(?is)<[^>]+>", " ", html)
    html = html.replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">")
    html = html.replace("&#10;", " ").replace("&nbsp;", " ")
    html = re.sub(r"[ \t]+", " ", html)
    html = re.sub(r"\n\s*\n+", "\n", html)
    return html.strip()

def get_full_text(pid):
    """Return (text, source) trying HTML then ar5iv then PDF, with caching."""
    # cached raw
    for ext, isbin in [(".html", False), (".pdf", True)]:
        p = os.path.join(PDF, f"{pid}{ext}")
        if os.path.exists(p):
            if isbin:
                r = pypdf.PdfReader(p)
                return "\n".join((pg.extract_text() or "") for pg in r.pages), "pdf-cache"
            # cached HTML is stored RAW -> must strip tags before parsing
            return strip_tags(open(p, encoding="utf-8", errors="replace").read()), "html-cache"

    # 1) native html
    try:
        html = fetch(f"https://arxiv.org/html/{pid}")
        if len(html) > 80000 and "<section" in html:
            open(os.path.join(PDF, f"{pid}.html"), "w", encoding="utf-8").write(html)
            return strip_tags(html), "arxiv-html"
    except urllib.error.HTTPError:
        pass
    except Exception:
        pass

    # 2) ar5iv html
    try:
        html = fetch(f"https://ar5iv.labs.arxiv.org/html/{pid}")
        txt = strip_tags(html)
        # ar5iv shows a placeholder page when conversion failed (tiny body)
        if len(txt) > 60000:
            open(os.path.join(PDF, f"{pid}.html"), "w", encoding="utf-8").write(html)
            return txt, "ar5iv-html"
    except Exception:
        pass

    # 3) pdf
    try:
        pdf = fetch(f"https://arxiv.org/pdf/{pid}", binary=True)
        open(os.path.join(PDF, f"{pid}.pdf"), "wb").write(pdf)
        r = pypdf.PdfReader(os.path.join(PDF, f"{pid}.pdf"))
        return "\n".join((pg.extract_text() or "") for pg in r.pages), "pdf"
    except Exception as e:
        return "", f"FAILED:{type(e).__name__}"

HEAD_RE = re.compile(
    r"(?im)(?:^|\n)[ \t]*(?:\d+(?:\.\d+)*[.)]?[ \t]+)?"
    r"(Abstract|Introduction|Related Work|Background|Method|Methods|Approach|"
    r"Proposed Method|Experiments?|Experimental Results?|Results?|Discussion|Discussions|"
    r"Conclusion|Conclusions|Limitations?|Future Work|Concluding Remarks|"
    r"Appendix|Appendices|Acknowledg\w*|References?|Bibliography)\b")

def parse_sections(text):
    """Linearly split the document into (heading, body) by detecting section headers.
    Linear scan handles nested sections fine (subsection headers subdivide)."""
    matches = list(HEAD_RE.finditer(text))
    secs = []
    for i, m in enumerate(matches):
        name = m.group(1)
        start = m.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        body = text[start:end].strip()
        secs.append((name, body))
    return secs

DISC_NAMES = {"Discussion", "Discussions", "Conclusion", "Conclusions",
              "Limitations", "Limitation", "Future Work", "Concluding Remarks"}
SKIP_NAMES = {"References", "Bibliography", "Appendix", "Appendices",
              "Acknowledgments", "Acknowledgements"}

def extract_paper(pid, name):
    text, src = get_full_text(pid)
    if not text:
        return {"pid": pid, "name": name, "src": src, "title": "",
                "abstract": "(could not fetch)", "discuss": "(could not fetch)"}
    # title: first substantial line
    title = ""
    for line in text.splitlines():
        if len(line.strip()) > 15:
            title = line.strip(); break
    secs = parse_sections(text)
    # abstract = first Abstract section body
    abs_sec = ""
    for n, b in secs:
        if n.lower().startswith("abstract"):
            abs_sec = b; break
    # discussion = all conclusion/discussion/limitation/future sections concatenated
    disc_parts = []
    for n, b in secs:
        if n in DISC_NAMES and len(b) > 80:
            disc_parts.append(f"[{n}]\n{b}")
    disc_text = "\n\n".join(disc_parts)
    if not disc_text.strip():
        # fallback: any section name containing conclus/discuss
        for n, b in secs:
            if ("conclus" in n.lower() or "discuss" in n.lower()) and len(b) > 120:
                disc_text = f"[{n}]\n{b}"; break
    if not disc_text.strip():
        # fallback: last content section before references/appendix
        for n, b in reversed(secs):
            if n not in SKIP_NAMES and len(b) > 250:
                disc_text = f"[{n}]\n{b}"; break
    return {"pid": pid, "name": name, "src": src, "title": title,
            "abstract": abs_sec[:1600], "discuss": disc_text[:4200]}

def main():
    out = []
    for grp, pid, name in FOCUS:
        sys.stderr.write(f"reading {pid} ({name}) ... ")
        d = extract_paper(pid, name)
        sys.stderr.write(f"{d['src']}\n")
        out.append((grp, d))
        # per-paper raw dump
        with open(os.path.join(MD, f"{pid}.md"), "w", encoding="utf-8") as f:
            f.write(f"# {name}  [{pid}]\n\nsource: {d['src']}\ntitle: {d['title']}\n\n")
            f.write("## Abstract\n\n" + d["abstract"] + "\n\n")
            f.write("## Discussion / Conclusion\n\n" + d["discuss"] + "\n")
        time.sleep(0.3)
    # consolidated
    groups = {"match": "Lever B - Matching / guide-frame similarity",
              "detect": "Lever A - Detectors / kptpair count",
              "render": "Lever C - Render-based (CG<->CV) pose",
              "highlight": "Lever A - Highlight / illumination robustness",
              "planar": "Near-planar / weak-texture"}
    # summary json
    summ = [{"group": g, "pid": d["pid"], "name": d["name"], "src": d["src"],
             "title": d["title"][:120], "abs_len": len(d["abstract"]),
             "disc_len": len(d["discuss"])} for g, d in out]
    json.dump(summ, open(os.path.join(MD, "summary.json"), "w"), indent=1)
    print(f"done. {len(out)} papers.")

if __name__ == "__main__":
    main()
