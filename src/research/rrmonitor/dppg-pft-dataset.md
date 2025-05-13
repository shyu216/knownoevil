---
title: Soleimani's Dataset
icon: database
timeline: true
tag:
    - Dataset
    - Breath Tracking
---

## 简介

dPPG PFT 数据集由布里斯托大学计算机科学系视觉信息实验室发布，包含 35 名受试者在进行用力肺活量（FVC）和缓慢肺活量（SVC）肺功能测试时的体表深度信息。数据集共计 300 个 PFT 序列，并包含每个序列的肺量计（spirometer）数据作为验证基准。

- 适用于：深度视觉、呼吸监测、医学信号处理等研究
- 采集方式：双 Kinect 深度相机（前后各一），同步采集
- 公开时间：2018 年 2 月
- 主要联系人：[Vahid Soleimani](https://github.com/BristolVisualPFT)
- 数据集主页：[A Dataset for Depth-Based Whole Body Photoplethysmography in Remote Pulmonary Function Testing](https://data.bris.ac.uk/data/dataset/1tqzx39mzkw832msuvy3obktqi)

## 数据集结构

dPPG_dataset/
├── subject_01/
│   ├── 1/
│   │   ├── calibration_params/
│   │   ├── data_bKinect/
│   │   ├── data_fKinect/
│   │   ├── intraKinect_synchronisation/
│   │   ├── results/
│   │   └── spirometer/
│   ├── 2/
│   └── ...
├── subject_02/
│   ├── 10/
│   └── ...
├── ...
├── subject_PFT_index.txt
├── subjects_meta.txt
├── Data_Acquisition_guidance.pdf
└── blank_consent_form.pdf

### 每个 PFT 序列包含：
- **calibration_params/**：Kinect 标定参数（焦距、主点、旋转/平移矩阵）
- **data_bKinect/**、**data_fKinect/**：后/前 Kinect 深度帧（PNG）、骨骼数据、元数据
- **intraKinect_synchronisation/**：同步信息
- **results/**：三篇论文的实验结果（详见下文）
- **spirometer/**：肺量计测量数据（体积-时间、流量-时间、PFT 指标）

## 评价指标

- **NL2**：归一化 L2 误差
- **FRD**：Fréchet 距离
- **DTW**：动态时间规整距离
- **R²**：决定系数

## 论文与引用

如在研究中使用本数据集，请引用：

> V. Soleimani, M. Mirmehdi, D. Damen, M. Camplani, S. Hannuna, C. Sharp, J. Dodd. 
> "Depth-based Whole Body Photoplethysmography in Remote Pulmonary Function Testing". 
> IEEE Transactions on Biomedical Engineering (TBME). [论文链接](http://ieeexplore.ieee.org/document/8186188/)

### 相关论文
- [1] TBME: Depth-based Whole Body Photoplethysmography in Remote Pulmonary Function Testing
- [2] ICIP 2018: Markerless Active Trunk Shape Modelling for Motion Tolerant Remote Respiratory Assessment
- [3] ICPR 2018: Respiratory Motion Artifact Correction in Vision-based Lung Function Assessment
- [4] 3DV 2016: 3D Data Acquisition and Registration using Two Opposing Kinects ([源码](https://github.com/BristolVisualPFT/3D_Data_Acquisition_Registration_Using_Kinects))


## 如何从前后 Kinect PNG 深度帧恢复 3D 点云

1. **读取深度帧**：
   - 使用如 OpenCV、PIL 等库读取 PNG 格式的深度图像。
   - 每个像素值代表该点的深度（单位通常为毫米）。

2. **像素坐标转相机坐标**：
   - 利用相机内参（焦距 Fx, Fy，主点 Px, Py）将像素 (u, v) 和深度 d 转换为相机坐标 (X, Y, Z)：
     ```
     X = (u - Px) * d / Fx
     Y = (v - Py) * d / Fy
     Z = d
     ```

3. **后 Kinect 点云配准到前 Kinect**：
   - 使用 calibration_params 文件中的旋转矩阵 R 和平移向量 T，将后 Kinect 点云变换到前 Kinect 坐标系：
     ```
     [Xf, Yf, Zf]^T = R * [Xb, Yb, Zb]^T + T
     ```
   - 其中 [Xb, Yb, Zb] 为后 Kinect 点云坐标，[Xf, Yf, Zf] 为配准后的坐标。

4. **合并点云**：
   - 将前后 Kinect 的点云合并，获得完整的 3D 体表点云。

> 详细实现可参考 [官方开源代码](https://github.com/BristolVisualPFT/3D_Data_Acquisition_Registration_Using_Kinects)
