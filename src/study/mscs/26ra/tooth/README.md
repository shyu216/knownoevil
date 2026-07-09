---
title: Tooth — AR Dental Overlay on HoloLens 2
icon: tooth
index: false
timeline: false
article: false
collapsible: false
category:
  - UniMelb
---

A side research project in 2026: overlay a 3D dental model onto the patient's real teeth **inside HoloLens 2**, driven by PC-side pose estimation. The core idea — the PC does 2D kpts matching and PnP solving to recover the tooth pose, streams a single 4×4 matrix to the HoloLens over TCP, and Unity draws the mesh on top of the live view. Cheap, single-projector-style AR, no extra markers stuck on the patient.

It spins off the "26 the Research" line but deserves its own drawer because it piles up a lot of dirty math, calibration logs, and ablation tables. Following are the notes: the registration method, the full coordinate-transform chain (the part that actually hurts), the Unity app itself, and a pile of experiments tuning scales, guide views, and the centerEye→PV offset.

<Catalog hideHeading/>
