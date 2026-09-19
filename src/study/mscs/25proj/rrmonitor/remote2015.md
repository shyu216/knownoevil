---
title: Remote Pulmonary Function Testing  using a Depth Sensor
icon: note-sticky
timeline: true
tag:
    - Breath Tracking
---

## How they compute the volume?

该方法的核心思想是：**不计算胸廓的绝对体积，而是计算一个“近似体积”的变化**。这个近似体积是由胸廓表面、一个预设的参考平面以及连接它们的侧向表面所包围的空间。通过追踪这个空间体积随时间的变化（`Vt`），就可以得到体积-时间曲线，从而进行肺功能分析。

该方法基于一个关键假设：**在PFT过程中，身体的整体移动是最小的，可以忽略不计**。

#### 1. 理论基础：散度定理（高斯定理）

这是整个方法的数学核心。散度定理的公式如下：

$$
\iiint_V (\nabla \cdot \mathbf{F})  dV = \oiint_S (\mathbf{F} \cdot \mathbf{n})  dS
$$

*   **`V`**: 一个封闭的固体区域（这里就是要计算的体积）。
*   **`S`**: 包围体积 `V` 的封闭曲面。
*   **`F`**: 一个连续可微的向量场。
*   **`n`**: 曲面 `S` 上向外的单位法向量。

论文巧妙地利用了这个定理将**体积分**转换成了更容易计算的**曲面积分**。

#### 2. 如何选择向量场 `F`？

目标是计算体积 $V = \iiint_V dV$。为了让散度定理的左边变成这个形式，需要令 $(\nabla \cdot \mathbf{F}) = 1$。满足这个条件的向量场有很多种选择，但论文选择了一个能极大简化计算的：

$$
\mathbf{F} = z\mathbf{\hat{k}}
$$

其中 $\mathbf{\hat{k}}$ 是 z 方向的单位向量。这个选择是**整个方法简化的关键**。可以验证，它的散度确实为1：$\nabla \cdot (z\mathbf{\hat{k}}) = 0 + 0 + \frac{\partial z}{\partial z} = 1$。

#### 3. 坐标系设置

为了进一步简化计算，论文对坐标系进行了设置：
1.  将**参考平面**放置在 **xy-plane** 上（即 z=0 平面）。
2.  胸廓表面的位移主要发生在 **z轴** 方向。

这个设置与选择的 $\mathbf{F} = z\mathbf{\hat{k}}$ 完美契合。

#### 4. 曲面积分的分解

整个封闭曲面 `S` 被分为三部分：
1.  **`S_ch`**: 胸廓表面（主要的活动部分）。
2.  **`S_r`**: 参考平面（z=0 的固定平面）。
3.  **`S_l`**: 连接胸廓和参考平面的侧向表面。

因此，总积分为：
$$
V_t = \oiint_S (\mathbf{F} \cdot \mathbf{n})  dS = \iint_{S_{ch}} (\mathbf{F} \cdot \mathbf{n}_{ch})  dS_{ch} + \iint_{S_{l}} (\mathbf{F} \cdot \mathbf{n}_{l})  dS_{l} + \iint_{S_{r}} (\mathbf{F} \cdot \mathbf{n}_{r})  dS_{r}
$$

由于巧妙的设置，**后两项积分的结果为零**：
*   **在侧向表面 `S_l` 上**：法向量 $\mathbf{n}_l$ 是水平的，而 $\mathbf{F} = z\mathbf{\hat{k}}$ 是垂直的。它们的点积 $\mathbf{F} \cdot \mathbf{n}_l = 0$，所以整个侧面积分为零。
*   **在参考平面 `S_r` 上**：法向量是向下的，即 $\mathbf{n}_r = -\mathbf{\hat{k}}$。同时，在参考平面上 `z = 0`，所以 $\mathbf{F} = 0 \cdot \mathbf{\hat{k}} = \mathbf{0}$。点积 $\mathbf{F} \cdot \mathbf{n}_r = 0$，所以参考平面的积分也为零。

**因此，复杂的体积计算最终简化为只需要计算胸廓表面 `S_ch` 上的积分：**
$$
V_t = \iint_{S_{ch}} (z\mathbf{\hat{k}} \cdot \mathbf{n}_{ch})  dS_{ch}
$$

#### 5. 离散化计算：从积分到求和

在实际应用中，胸廓表面是由深度图重建出的**三角网格**（通过三角化实现）。因此，连续的曲面积分可以转化为对所有三角形面片 `ST_i` 的积分之和：

$$
V_t = \sum_{i=1}^{N_t} \iint_{ST_i} (z\mathbf{\hat{k}} \cdot \mathbf{n}_{T_i})  dS_{T_i}
$$

其中 `N_t` 是三角形总数，`n_{T_i}` 是第 `i` 个三角形的法向量。

论文通过参数化表示，最终将每个三角形对体积的贡献推导为一个简洁的公式。对于一个顶点为 `p0, p1, p2` 的三角形，其贡献的体积为：

$$
V_{triangle} = \frac{1}{6} (z_0 + z_1 + z_2) \times 
\begin{vmatrix}
x_1 & y_1 & 1 \\
x_2 & y_2 & 1 \\
x_3 & y_3 & 1 \\
\end{vmatrix}
$$

**这个行列式的几何意义是：三角形面片在 xy-plane 上的投影面积的两倍。** 因此，整个体积就是所有三角形的平均高度（`(z0+z1+z2)/3`）乘以它们的投影面积（`|determinant|/2`）的求和。
