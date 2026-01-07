---
title: 关于标定（calibration）的一些基本信息
icon: camera
---

任务：把两个不同品牌（所以不同外参，不同内参）的相机里面像素互相对应起来，使得可以在一个视频流跑yolo，把结果显示到另一个摄像头。


Homography 单应性变换，两个平面之间的映射。

Rigid Body Transformation 刚体：在三维空间中保持形状和体积不变的物体，可以进行平移和旋转。

刚体变换：描述刚体在三维空间中的位置和姿态变化，包括旋转和平移。从一个坐标系到另一个坐标系的映射关系。


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


### 具体步骤

1. **准备标定板参数和相机内参**
   - 设置棋盘格的内角点数量和实际物理尺寸（如 $9 \times 6$，$35\,\mathrm{mm}$）。
   - 配置 RealSense 和 Quest3 相机的内参矩阵、畸变参数、图像缩放比例和图片文件夹路径。

2. **检测棋盘格角点**
   - 对每张图片，使用 OpenCV 检测棋盘格角点。
   - 可选：对 Quest3 图像进行 gamma 矫正。
   - 若检测成功，亚像素级优化角点坐标，并调整内参以适应缩放。

3. **计算每帧的相机位姿**
   - 对每对有效的棋盘格角点，使用 `cv2.solvePnP` 结合内参和畸变参数，估算相机的旋转向量 $\mathbf{r}$ 和位移向量 $\mathbf{t}$。
   - 旋转向量 $\mathbf{r}$ 可用 Rodrigues 公式转为旋转矩阵 $R$。

4. **将棋盘格世界坐标点转换到相机坐标系**
   - 对每个三维世界点 $\mathbf{P}_\text{world}$，用旋转和平移变换到相机坐标系：
     $$
     \mathbf{P}_\text{cam} = R \cdot \mathbf{P}_\text{world} + \mathbf{t}
     $$

5. **收集所有有效帧的点对**
   - 对于每对同步的 RealSense 和 Quest3 图像，提取并配对所有角点的三维相机坐标。

6. **用 SVD 估计刚体变换矩阵**
   - 设 RealSense 点为 $\mathbf{P}_r$，Quest3 点为 $\mathbf{P}_q$，用 SVD 算法求解刚体变换 $T$（旋转 $R$、平移 $\mathbf{t}$）：
     $$
     \mathbf{P}_q = R \cdot \mathbf{P}_r + \mathbf{t}
     $$
   - 具体步骤：
     - 计算两组点的质心 $\bar{\mathbf{P}}_r, \bar{\mathbf{P}}_q$
     - 去中心化：$\mathbf{X}_r = \mathbf{P}_r - \bar{\mathbf{P}}_r$, $\mathbf{X}_q = \mathbf{P}_q - \bar{\mathbf{P}}_q$
     - 计算协方差矩阵 $H = \mathbf{X}_r^\top \mathbf{X}_q$
     - SVD 分解 $H = U S V^\top$
     - 旋转矩阵 $R = V U^\top$
     - 平移向量 $\mathbf{t} = \bar{\mathbf{P}}_q - R \bar{\mathbf{P}}_r$
     - 刚体变换矩阵 $T$ 为：
       $$
       T = \begin{bmatrix} R & \mathbf{t} \\ 0 & 1 \end{bmatrix}
       $$

7. **验证变换精度**
   - 将 RealSense 的点用变换矩阵映射到 Quest3 坐标系，计算与实际 Quest3 点的误差：
     $$
     \text{error}_i = \left\| T \cdot \begin{bmatrix} \mathbf{P}_{r,i} \\ 1 \end{bmatrix} - \begin{bmatrix} \mathbf{P}_{q,i} \\ 1 \end{bmatrix} \right\|
     $$
   - 统计平均误差、标准差、最大/最小误差。

8. **保存结果**
   - 将变换矩阵、旋转矩阵、平移向量、误差统计等保存为 npz 和 json 文件，便于后续使用。

9. **像素坐标转换演示**
   - 给定 RealSense 像素坐标 $(u_r, v_r)$ 和深度 $d$，先转为相机坐标：
     $$
     x_r = \frac{(u_r - c_{x,r}) \cdot d}{f_{x,r}}
     $$
     $$
     y_r = \frac{(v_r - c_{y,r}) \cdot d}{f_{y,r}}
     $$
     $$
     \mathbf{P}_r = \begin{bmatrix} x_r \\ y_r \\ d \\ 1 \end{bmatrix}
     $$
   - 用变换矩阵 $T$ 映射到 Quest3 相机坐标：
     $$
     \mathbf{P}_q = T \cdot \mathbf{P}_r
     $$
   - 再投影回 Quest3 像素坐标：
     $$
     u_q = f_{x,q} \frac{X_q}{Z_q} + c_{x,q}
     $$
     $$
     v_q = f_{y,q} \frac{Y_q}{Z_q} + c_{y,q}
     $$

---



## 使用方法

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


## 一些问题


### 如果使用远大于真实深度的常数d会发生什么？

所有像素点会被拉伸到远处的一个大平面上

### 如果使用远小于真实深度的常数d会发生什么？

所有像素点会被压缩到近处的一个小平面上


### 为什么演示时需要深度 $d$，录棋盘时不要？

这是因为两种场景的已知条件不同：

1. 录棋盘时（标定/配准）
你已经知道棋盘格每个角点在世界坐标系下的三维位置（$X, Y, Z$），
通过 cv2.solvePnP 等方法，直接用这些已知的三维点和像素点来反推出相机的外参（位姿），不需要假设深度 $d$，因为三维点的深度是已知的。
2. 像素坐标转换演示时
你只有一个像素点 $(u, v)$，并不知道它在三维空间中的真实深度 $d$。
要把像素点还原为三维相机坐标，必须假设或给定一个深度 $d$，否则无法唯一确定该点在三维空间中的位置（因为一条像素射线有无数个点）。
这时 $d$ 是你人为指定的一个值（比如 $500$ mm），只是为了演示整个变换流程。


