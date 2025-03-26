---
title: "DeepBreath: Breathing Exercise Assessment with a Depth Camera"
shortTitle: DeepBreath
icon: note-sticky
timeline: true
tag:
    - Computer Vision
---

## What is the application?

Home-based breathing exercises for chronic obstructive pulmonary disease (COPD) patients.

Breathing mode classification: chest and belly.

## What is the novelty?

- Transferred the SOTA RGB segmentation model to depth.
- Calibration-free lung volume measurement, no clothing, and no involuntary body motion.
- Real-time (12th I5 and 4060 Ti, 3fps) (update result every 3 seconds).

## How to achieve?

The proposed method consists of three modules:
1. depth image segmentation
2. motion artifacts compensation
3. multi-task learning (MTL)-based breathing assessment

## What is depth image segmentation?

It feed the RGB image into SAM and obtain a mask label as the ground truth. Then, the depth image is fed into their small depth segmentation network to obtain the segmentation result. Using MSE loss to train the depth segmentation network. Thus, it can use only depth images to obtain the segmentation result for application.

## What is motion artifacts compensation?

Observed that involuntary motion artifacts (MAs) are generally slower than breathing. The core idea is to track the distance measurement on each pixel and compensate the MA for that pixel by subtracting the running mean of the distance readings of this pixel.

Actively detect and ignore voluntary motion using hand-crafted thresholds.

## What is multi-task learning (MTL)-based breathing assessment?

DeepBreath considers breathing mode and lung volume to  be two correlated measurements. To achieve calibration-free lung volume estimation, we designed a novel UNet-based [51] regression model to achieve one-model-fit-all lung volume regression.

It is worth noting that the system will experience a cold start in the first 20 seconds after the system starts to run, as the models need to take 20-second depth images to give the predictions of the current state.