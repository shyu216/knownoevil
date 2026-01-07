---
title: YOLO 的基本使用
icon: mug-hot
---

- [YOLO Documentation](https://docs.ultralytics.com)

---

## What does the instance segmentation model look like?

- **Input size:** Usually 640 × 640.

- **Detection output shape:**  
  `(1, 116, 8400)`  
  - Batch size: 1  
  - 116 = 4 (x, y, w, h) + 80 (class confidences) + 32 (mask weights)  
  - 8400: Number of anchor points (depends on model configuration)

- **Mask output shape:**  
  `(1, 32, 160, 160)`  
  - 32 masks, each of size 160 × 160  
  - Each mask represents an object or a mask prototype in the image

- **Post-processing:**  
  - Masks are upsampled to the input image size using **bilinear interpolation**  
  - A **sigmoid activation** is applied to produce the final mask values in the range [0, 1]

---

## What does the pose estimation model look like?

- **Keypoint names:**  
  `['Nose', 'Left Eye', 'Right Eye', 'Left Ear', 'Right Ear', 'Left Shoulder', 'Right Shoulder', 'Left Elbow', 'Right Elbow', 'Left Wrist', 'Right Wrist', 'Left Hip', 'Right Hip', 'Left Knee', 'Right Knee', 'Left Ankle', 'Right Ankle']`

- **Output shape:**  
  `(1, 56, 8400)`  
  - 56 = 4 (x, y, w, h) + 1 (confidence) + 17 × 3 (keypoints: x, y, confidence)  
  - 8400: Number of anchor points