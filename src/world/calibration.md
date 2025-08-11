---
title: Calibration
icon: camera
---


## Homography

单应性变换，两个平面之间的映射。

## Rigid Body Transformation

刚体：在三维空间中保持形状和体积不变的物体，可以进行平移和旋转。

刚体变换：描述刚体在三维空间中的位置和姿态变化，包括旋转和平移。从一个坐标系到另一个坐标系的映射关系。

# 标定与配准基础概念与流程

---

## 基础概念

1. **相机内参矩阵（Camera Intrinsic Matrix, $M_i$）**
   - 用于将三维相机坐标 $P(x, y, z)$ 转换为二维像素坐标 $P(u, v)$。
   - 公式：
     $$
     \begin{bmatrix}
     u \\
     v \\
     1
     \end{bmatrix}
     = M_i \cdot
     \begin{bmatrix}
     x \\
     y \\
     z
     \end{bmatrix}
     $$

2. **相机外参矩阵（Camera Extrinsic Matrix, $M_e$）**
   - 用于将三维世界坐标 $P(X, Y, Z)$ 转换为相机坐标 $P(x, y, z)$。
   - 公式：
     $$
     \begin{bmatrix}
     x \\
     y \\
     z
     \end{bmatrix}
     = M_e \cdot
     \begin{bmatrix}
     X \\
     Y \\
     Z
     \end{bmatrix}
     $$

3. **反向坐标映射**
   - 可以通过求逆矩阵，将像素坐标还原为相机坐标，或将相机坐标还原为世界坐标。

---

## 标定与配准流程

### 已知信息
- Meta Quest 3：内参矩阵 $M_{m,i}$，外参矩阵 $M_{m,e}$
- RealSense：内参矩阵 $M_{r,i}$（外参 $M_{r,e}$ 不用）

### 目标
- 统一所有相机到Meta世界坐标系。
- 关键问题：如何将RealSense图像像素转换为Meta世界坐标下的三维位置。

### 主要步骤

1. **读取棋盘格图像对**
   - 检查两台相机的图像帧是否同步，若不同步则等间隔抽取相同数量的图像对。

2. **提取棋盘格角点像素坐标**
   - 用OpenCV函数分别提取每对图像的角点像素坐标 $P_m(u, v)$ 和 $P_r(u, v)$。
   - 只保留角点数量一致的图像对。

3. **像素坐标转三维相机坐标**
   - 用各自相机的内参矩阵将像素坐标转换为三维相机坐标：
     $$
     P_m(x, y, z) = M_{m,i}^{-1} \cdot P_m(u, v, d)
     $$
     $$
     P_r(x, y, z) = M_{r,i}^{-1} \cdot P_r(u, v, d)
     $$
   - 其中 $d$ 为深度（可由PnP或深度相机获得）。

4. **刚体变换矩阵T的估计（SVD）**
   - 用SVD算法，从大量点对中估计RealSense到Meta相机坐标之间的刚体变换矩阵 $T$。
   - 公式：
     $$
     P_m(x, y, z) = T \cdot P_r(x, y, z)
     $$

5. **最终映射公式**
   - 将RealSense像素映射到Meta世界坐标：
     $$
     P_m(u, v, d) = T \cdot M_{r,i}^{-1} \cdot P_r(u, v, d)
     $$
     $$
     P_{meta,world}(X, Y, Z) = M_{m,e} \cdot P_m(u, v, d)
     $$


---

## 如果使用远大于真实深度的常数d会发生什么？

所有像素点会被拉伸到远处的一个大平面上

## 如果使用远小于真实深度的常数d会发生什么？

所有像素点会被压缩到近处的一个小平面上




## 一个例子

### Inputs
- `src_img`: Source image $I_{src} \in \mathbb{R}^{H_{src}\times W_{src}}$
- `src_K`: Source camera intrinsic matrix  
  $$K_{src} = \begin{bmatrix} f_x^{src} & 0 & c_x^{src} \\ 0 & f_y^{src} & c_y^{src} \\ 0 & 0 & 1 \end{bmatrix}$$
- `dst_K`: Destination camera intrinsic matrix  
  $$K_{dst} = \begin{bmatrix} f_x^{dst} & 0 & c_x^{dst} \\ 0 & f_y^{dst} & c_y^{dst} \\ 0 & 0 & 1 \end{bmatrix}$$
- `T`: Homogeneous transformation matrix from source to destination camera  
  $$T = \begin{bmatrix} R & t \\ 0 & 1 \end{bmatrix} \in SE(3)$$
  其中$SE(3)$表示三维空间中的刚体变换群，包含所有三维旋转和平移的组合。
- `out_shape`: Output dimensions $(h, w)$
- `depth`: Assumed depth value $d$ (default=500)

### Algorithm Steps

1. **Generate Destination Pixel Grid**:
   $$
   \begin{align*}
   u &= [0,1,...,w-1] \\
   v &= [0,1,...,h-1] \\
   (u_{flat}, v_{flat}) &= \text{meshgrid}(u, v)
   \end{align*}
   $$

2. **Destination Pixels → Camera Coordinates**:
   $$
   \begin{align*}
   x &= \frac{(u_{flat} - c_x^{dst}) \cdot d}{f_x^{dst}} \\
   y &= \frac{(v_{flat} - c_y^{dst}) \cdot d}{f_y^{dst}} \\
   \mathbf{p}_{dst} &= [x, y, d]^T \quad (\text{3D points}) \\
   \mathbf{p}_{dst}^h &= [x, y, d, 1]^T \quad (\text{Homogeneous coords})
   \end{align*}
   $$

3. **Transform to Source Camera Frame**:
   $$
   \begin{align*}
   T^{-1} &= \begin{bmatrix} R^T & -R^T t \\ 0 & 1 \end{bmatrix} \\
   \mathbf{p}_{src}^h &= T^{-1} \cdot \mathbf{p}_{dst}^h \\
   \mathbf{p}_{src} &= [X_{src}, Y_{src}, Z_{src}]^T = \text{first 3 components of } \mathbf{p}_{src}^h
   \end{align*}
   $$

4. **Source Camera Coordinates → Pixels**:
   $$
   \begin{align*}
   u_{src} &= \text{round}\left(f_x^{src} \frac{X_{src}}{Z_{src}} + c_x^{src}\right) \\
   v_{src} &= \text{round}\left(f_y^{src} \frac{Y_{src}}{Z_{src}} + c_y^{src}\right)
   \end{align*}
   $$

5. **Image Sampling with Boundary Check**:
   $$
   \begin{align*}
   \text{mask} &= (0 \leq u_{src} < W_{src}) \land (0 \leq v_{src} < H_{src}) \\
   I_{dst}(v,u) &= \begin{cases} 
   I_{src}(v_{src}, u_{src}) & \text{if mask is True} \\
   0 & \text{otherwise}
   \end{cases}
   \end{align*}
   $$

### Output
- Returns warped image $I_{dst} \in \mathbb{R}^{h\times w}$
