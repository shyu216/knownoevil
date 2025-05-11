---
title: Video-Based Respiratory Rate Estimation for Infants in the NICU
icon: note-sticky
timeline: true
tag:
    - Signal Processing
---

## How they handle the data?

Short video segments with mild infant motion or those including caregiver shadow movement are classified as optimal. In contrast, videos with more significant movements, such as upper or lower limb movement (i.e., permissible motion artifacts), the presence of a parent or nurse’s hand that does not block the respiratory area, or mild crying that does not cause high motion artifacts, are considered suboptimal.

As our main goal is to develop an algorithm that closely matches human performance, our video annotation approach focuses on whether the artifacts permit accurate visual RR annotation by human annotators, rather than relying on strict pixel movement thresholds. This ensures that only videos where human observers can reliably count RR are included in the analysis, preserving the validity of the algorithm’s evaluation. However, for deployment, an automated method to quantify motion artifacts and define thresholds to identify when RR estimation may be inaccurate will be required, which could be implemented in the next iteration.

## How they use EVM?

They also use αB(x, t) = I(x, t) − Ĩ(x, t).

Barely mentioned, even without stating their passband frequencies.

## How their automatic ROI selection works?

1. Sliding window and calculating average intensity for each.
2. Perform wavelet-based denoising for each window in time domain.
3. Perform K-medoids clustering to classify the windows into 2 clusters.

## How they get RR?

Counting the peaks.