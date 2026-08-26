---
title: A comprehensive review on advances in instance-level 6D object pose tracking
icon: file
---

2026，似乎ar眼镜的风又吹起来了。3D位姿追踪是它的一个很关键的部分呢。

图17是方法大横评。SRT3D才1ms一帧！

## 任务描述

输入一个3D模型，一个初始位姿，一段图片序列。

输出逐帧位姿。

变体：单目（monocular），双目（binocular），深度图（depth map），见过的（seen），没见过的（unseen），非刚体比如人

难点：头戴设备的抖动，遮挡，算力，实时性

## 数据集


1. **标注精度**：早期数据集（YCB-Video）依赖深度对齐标注，误差较大（不适合高精度场景，如AR应用）；BCOT 通过双目多视角联合优化，将标注误差控制在 **2mm 以内**，是目前最精确的真实数据集。

2. **相机与物体同时自由运动**：早期数据集（Choi、YCB-Video、OPT）只有相机运动，物体静止，缺乏物体绕平面外翻转等极端旋转；BCOT、Laval 6DOF 的交互场景则允许相机和物体同时自由移动，更贴近真实场景。

3. **无标记（marker-less）真实感**：OPT、Laval 6DOF 依赖棋盘格或反光标记点获取真值，可能引入视觉偏差；BCOT、YCB-Video 力图做到无标记。

4. **针对工业场景的复合挑战**：InOT6D（2024）专门针对**无纹理工业零件**，系统性地设计了五种变体：动态光照（DYN）、遮挡（OCC，又分已建模/未建模）、运动模糊（MOT）、颜色相似性干扰（COR），并且**不允许重初始化**，评测更贴近真实工业部署的严苛程度。

5. **动态操作场景**：YCBInEOAT 针对机器人抓取/操作场景，物体不再静止在桌面，而是被机械臂动态操纵（单臂抓取、手内操作、双臂交接），填补了"物体动态运动"这一空白。


## 题解

- **关键点法**
  靠检测匹配关键点算姿态，假设物体得有纹理，同一个点在不同帧里能被反复认出来。
  - *Stable Real-Time 3D Tracking Using Online and Offline Information*, 2004

- **边缘法**
  靠轮廓的强梯度边缘做匹配，假设正确边缘就在候选集里，且离得最近、响应最大。
  - *RAPID – A Video Rate Object Tracker*, 1990

- **直接法**
  直接拿像素灰度对齐，假设同一表面点在连续帧里灰度不变，光照一变就容易崩。
  - *Robust 3D Tracking with Descriptor Fields*, 2014

- **随机森林法**
  用森林学几何/深度差异到姿态扰动的映射，假设这层映射可学，多采样几个视角就能记下来。
  - *Multi-Forest Tracker: A Chameleon in Tracking*, 2014

- **滤波法**
  把跟踪当状态估计问题做，假设当前状态只依赖上一状态，运动要么随机游走要么匀速。
  - *Probabilistic Object Tracking Using a Range Camera*, 2013

- **区域法（SRT3D → ICG → ICG+ → Chen et al. → FSCGE）**
  不比对每个像素，沿轮廓采样出对应线做概率判断，假设前景背景能靠颜色统计分开，轮廓就是分割最优的那条线。这一脉里 ICG+ 加了深度和纹理关键点，速度精度都能打；Chen et al. 一帧只要6.6毫秒；FSCGE 专攻工业无纹理物体。
  - *PWP3D: Real-Time Segmentation and Tracking of 3D Objects*, 2012
  - *SRT3D: A Sparse Region-Based 3D Object Tracking Approach for the Real World*, 2022
  - *Iterative Corresponding Geometry: Fusing Region and Depth for Highly Efficient 3D Tracking of Textureless Objects*, 2022
  - *Fusing Visual Appearance and Geometry for Multi-Modality 6DoF Object Tracking*, 2023
  - *A Multi-Feature Fusion-Based Pose Tracking Method for Industrial Object with Visual Ambiguities*, 2024
  - *Robust 6DoF Pose Tracking Considering Contour and Interior Correspondence Uncertainty for AR Assembly Guidance*, 2025

- **FoundationPose**
  给CAD模型就能零样本处理没见过的物体，假设渲染图和观测图的差异就编码了姿态变化，靠域随机化把仿真和真实的差距抹平。
  - *FoundationPose: Unified 6D Pose Estimation and Tracking of Novel Objects*, 2024

- **DeepAC**
  用轻量网络预测边界概率图代替手工颜色直方图，假设学习器扛遮挡、优化器保精度，两边拼起来取长补短。
  - *Deep Active Contours for Real-Time 6-DoF Object Tracking*, 2023

- 加了uv材质图
  - Uni6D: A Unified CNN Framework without Projection Breakdown for 6D Pose Estimation


