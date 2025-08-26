---
title: Guided Image Filtering
icon: note-sticky
timeline: true
tag:
    - Computer Graphics
---

# What is the idea?

假设输入图是引导图的线性变换，但是输入图需要滤波。如果输入和引导是同一图，效果等于局部均值滤波（box filter）。

Depth Maps Restoration for Human Using RealSense: 如果RGBD相机的D图有洞洞，可以用RGB的depth prediction引导填充。

Followed with horrible mathematical derivation.

<PDF src="https://people.csail.mit.edu/kaiming/publications/eccv10guidedfilter.pdf" />