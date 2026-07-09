---
title: 坐标变换链（Coordinate-Transform Chain）
icon: diagram-project
tag:
  - HoloLens
  - PnP
  - Pose
  - Unity
---

最让人头疼的部分。牙齿网格（mesh）存在于*某个*坐标系；HoloLens 2（微软混合现实头显 / Microsoft MR headset）的 PV 相机与 Unity（实时 3D 引擎）又各自处于*另外*的坐标系。把"网格→Unity 世界"的 4×4 矩阵算对，是整个项目的关键——只要一个符号翻错，牙齿就会飘到患者脑后。

> **参考代码：** `exp_script/03_full_pipeline.py` → `compute_mesh_world_unity()` (L246) · `exp_script/helper_ai.py` → `compute_mesh_world_unity()` (L360)

有两种等价的推导方式。第一种是 `compute_mesh_world_unity` 使用的函数级视角（网格世界：OpenCV 毫米制 → Unity 世界：左手系米制）。第二种是 `synthetic_pnp_tracking` 的逐帧严谨视角（HL2 世界 → Unity）。两者最终都落到同一个 TCP（传输控制协议 / Transmission Control Protocol）数据包上。

> **参考代码：** `exp_script/03_full_pipeline.py` → `compute_mesh_world_unity()` (L246) · `python/synthetic_pnp_tracking.py` → `mesh_pose_in_unity_world()` (L105)

---

## 符号约定（Symbol Convention）

| 符号 | 含义 |
|--------|---------|
| $\mathbf{X}_w\in\mathbb{R}^3$ | 网格世界坐标（OpenCV，毫米） |
| $\mathbf{x}\in\mathbb{R}^2$ | 图像像素坐标（HL2 PV 相机） |
| $\mathbf{K}\in\mathbb{R}^{3\times3}$ | 针孔内参（intrinsics） |
| $R\in SO(3),\ \mathbf{t}\in\mathbb{R}^3$ | PnP（透视n点法 / Perspective-n-Point）输出，**相机外参（extrinsics）**（世界→相机） |
| $T_{wc}\in SE(3)$ | 网格世界中的相机位姿（相机→世界） |
| $T_{CE\to PV}$ | HoloLens 2 centerEye（主相机位姿 / center eye pose）→ PV 相机偏移（毫米，齐次） |
| $T_{cam}^{Unity}$ | Unity 世界中 centerEye 相机位姿（米） |
| $\mathbf{F}=\mathrm{diag}(1,-1,1)$ | OpenCV↔Unity 翻转（Y 轴反向） |
| $S=\mathrm{diag}(1,1,-1,1)$ | HL2SS（HoloLens 2 传感器数据流 / sensor streaming）↔Unity 手性（chirality）翻转（Z 轴反向） |

下文用到的坐标系：`W_H` HL2 世界，`C` PV 相机，`R` HL2 设备节点（rig node），`S` 沙盒（sandbox，= Unity 牙齿模型坐标系），`W_U` Unity 世界。

---

## A. PnP 输出 `T_wc` —— 严格定义

来自 `T_wc_from_pnp` / `rvec_tvec_to_T_wc`：

```python
R, _ = cv2.Rodrigues(rvec)     # OpenCV: p_cam = R · P_world + t
C = -R.T @ t                    # 相机光心在世界系中的坐标
T[:3, :3] = R.T                 # 旋转转置
T[:3, 3] = C                    # 平移 = 相机中心
```

OpenCV `solvePnP` 返回 $(R,\mathbf{t})$，满足 $p_{cam}=R\,p_{sandbox}+\mathbf{t}$（沙盒→相机）。该封装构建了**世界→相机**矩阵：

$$
p_{sandbox}=T_{wc}\cdot p_{cam}\quad\checkmark\ \text{因为 }R^\top(R\,p_s+\mathbf{t})-R^\top\mathbf{t}=p_s
$$

因此 **`T_wc` = 相机→沙盒**（沙盒相对相机）。相机原点在世界系中：$\mathbf{C}=-R^\top\mathbf{t}$。

> **参考代码：** `exp_script/03_full_pipeline.py` → `rvec_tvec_to_T_wc()` (L453) · `final/process/localization_testing/synthetic_pnp_core.py` → `T_wc_from_pnp()` (L276)

---

## B. 函数级链路 —— `compute_mesh_world_unity`

目标：跨越三个坐标系——**网格世界（OpenCV 毫米制）→ Unity PV 相机 → Unity 世界（左手系米制）**。

### 步骤 1 —— HoloLens 2 相机偏移

Unity 发送的是 **centerEye（主相机位姿，即 MainCamera）** 位姿，但 PnP 用的是 **PV 相机（彩色摄像头 / Photo/Video camera）**。把 centerEye 偏移至 PV：

$$
T_{PV}^{Unity}=T_{CE}^{Unity}\cdot T_{CE\to PV}
$$

$T_{CE\to PV}$ 由 `T_CE_TO_PV.npy` 热加载（hot-load）；默认值为：

> **参考代码：** `exp_script/03_full_pipeline.py` → `reload_T_CE_TO_PV()` (L101) · `exp_script/helper_ai.py` → `load_T_CE_TO_PV()` (L300)

$$
T_{CE\to PV}=\begin{pmatrix}I_{3\times3}&\begin{pmatrix}-1.0\\+21.016\\+63.116\end{pmatrix}\\\mathbf{0}^\top&1\end{pmatrix}\quad\text{(mm)}
$$

```python
pv_cam_world = cam_world_unity @ T_CE_TO_PV
```

### 步骤 2 —— 网格世界 → 相机（OpenCV）

对 $T_{wc}$ 求逆：

$$
T_{cw}=T_{wc}^{-1}=\begin{pmatrix}R_{cw}&\mathbf{t}_{cw}\\\mathbf{0}^\top&1\end{pmatrix},\quad R_{cw}=R_{wc}^\top,\ \mathbf{t}_{cw}=-R_{cw}\,\mathbf{C}
$$

```python
T_cw[:3, :3] = R.T
T_cw[:3, 3] = -R.T @ t
```

仍为毫米制，OpenCV 右手系（Z 轴向前）。

> **参考代码：** `exp_script/03_full_pipeline.py` → `invert_T()` (L241) · `exp_script/helper_ai.py` → `invert_T()` (L319)

### 步骤 3 —— OpenCV → Unity 翻转（Y 轴）

OpenCV（右手系）与 Unity（左手系）在 Y 轴上不一致。用 $\mathbf{F}=\mathrm{diag}(1,-1,1)$ 翻转：

> **参考代码：** `exp_script/03_full_pipeline.py` → `compute_mesh_world_unity()` (L254, $F$ 翻转) · `exp_script/helper_ai.py` → `compute_mesh_world_unity()` (L369)

$$
R_{cw}^{Unity}=\mathbf{F}\,R_{cw}^{OpenCV}\,\mathbf{F},\qquad \mathbf{t}_{cw}^{Unity}=\mathbf{F}\,\mathbf{t}_{cw}^{OpenCV}\times10^{-3}
$$

```python
F = np.diag([1.0, -1.0, 1.0])
R_cw_unity = F @ R_cw @ F
t_cw_unity_m = (F @ t_cw_mm) * MM_TO_M
```

### 步骤 4 —— 组合出 Unity 世界中的网格位姿

$$
T_{mesh}^{Unity\_world}=T_{PV}^{Unity}\cdot T_{cw}^{Unity}
$$

```python
result = pv_cam_world @ T_cw_unity
```

### 步骤 5 —— 网格自旋转修正

乘上一个固定的旋转，修正网格的局部朝向：

$$
T_{mesh\_world}^{final}=T_{mesh}^{Unity\_world}\cdot T_{rot},\quad T_{rot}=\begin{pmatrix}-1&0&0&0\\0&-1&0&0\\0&0&1&0\\0&0&0&1\end{pmatrix}
$$

即绕 Z 轴旋转 $180^{\circ}$（$R_{rot}=\mathrm{diag}(-1,-1,1)$），修正网格 X/Y 的初始符号。

> **参考代码：** `exp_script/03_full_pipeline.py` → `compute_mesh_world_unity()` (L261, `T_rot`) · `exp_script/helper_ai.py` → `compute_mesh_world_unity()` (L377)

```python
T_rot[:3, :3] = np.array([[-1, 0, 0], [0, -1, 0], [0, 0, 1]])
return result @ T_rot
```

---

## C. 逐帧链路 —— `synthetic_pnp_tracking`

严谨版本，写于阅读实际代码之后。两种模式共用同一主干。

> **参考代码：** `python/synthetic_pnp_tracking.py` → `mesh_pose_in_unity_world()` (L105)

### C.1 合成 PnP 模式（Synthetic PnP mode）

已知输入：PV 图像 $I$（BGR），$K_{pv}$，`T_H_device`（HL2SS SLAM（同步定位与地图构建 / Simultaneous Localization and Mapping），平移量存于**第 4 行**而非第 4 列），以及预渲染的参考集合 $\{T^{ref}_{mesh\_k}\}$（含特征与三维点）。

1. **XFeat + LightGlue** 对每个参考 $k$ → $\{p_{2d,i},P_{3d,i}\}_k$。
2. **PnP + RANSAC** → $[R_{cam\_sandbox_k}|\mathbf{t}_{cam\_sandbox_k}]$，取 $k^*=\arg\max_k(\text{inliers}_k)$。这就是 §A 中的 `T_wc = T_S_C`（沙盒相对相机）。
3. **相机在 HL2 世界中**：标准化 `device_pose`（行→列），可选在 Y 上加 Unity 视高（eye-height）偏移，然后
   $$
   T_H\_C=T_{std}\cdot E,\quad E=\text{camera\_to\_rignode}(\text{extrinsics})
   $$
   即 $p_H=T_H\_R\cdot p_R$，$p_R=E\cdot p_{cam}$ ⇒ $p_H=T_H\_C\cdot p_{cam}$。
4. **网格在 HL2 世界中**：
   $$
   p_S=T_{wc}\cdot p_{cam}\ \Rightarrow\ p_{cam}=T_{wc}^{-1}\cdot p_S,\qquad p_H=T_H\_C\cdot T_{wc}^{-1}\cdot p_S
   $$
   $$
   \Rightarrow\ T_{H\_S}=T_H\_C\cdot T_{wc}^{-1}
   $$
   这正是 `mesh_pose_in_unity_world`：`hl2ss_world_to_unity(T_cam @ inv(T_wc))`。

> **参考代码：** `python/synthetic_pnp_tracking.py` → `mesh_pose_in_unity_world()` (L105) · `python/vendor/hl2ss/viewer/hl2ss_3dcv.py` → `camera_to_rignode()` (L46) + `reference_to_world()` (L50) + `pv_fix_calibration()` (L223)

### C.2 ArUco 模式（交叉验证）

同一主干，仅第一环不同：

$$
T_{cam\_marker}=\text{ArUco\_PnP}(I,K_{pv},L),\quad E=\text{camera\_to\_rignode}(\text{extrinsics}),\quad T_H\_rig=\text{reference\_to\_world}(T_H\_device)
$$

$$
T_{H\_marker}=T_H\_rig\cdot E\cdot T_{cam\_marker}
$$

（NumPy 列向量约定：`T_cam @ E @ reference_to_world(device_pose)`。）

### C.3 HL2SS → Unity 手性翻转

HL2SS 为左手系（+Z 向前），Unity 为右手系。对 Z 翻转两次（共轭 / conjugate）以保持旋转为合法的 $SO(3)$：

> **参考代码：** `python/pose_convert.py` → `hl2ss_world_to_unity()` (L10, $S=\mathrm{diag}(1,1,-1)$)

$$
S=\mathrm{diag}(1,1,-1,1),\qquad T_{Unity}=S\cdot T_H\cdot S^{-1}
$$

$$
R_{Unity}=S\,R_H\,S,\qquad \mathbf{t}_{Unity}=S\,\mathbf{t}_H
$$

```python
def hl2ss_world_to_unity(T):
    T[:3, :3] = S @ T[:3, :3] @ S
    T[:3, 3]  = S @ T[:3, 3]
    return T
```

### C.4 可选的回归修正（regression fix）

$$
T_{final}=T_{fix}\cdot T_{Unity}
$$

`T_fix` 是由对齐样本拟合出的刚性变换（`alignment_regression.py`），在 `apply_regression=True` 时应用。

---

## D. 数据打包（TCP → Unity）

来自 `pose_convert.py`：

> **参考代码：** `python/pose_convert.py` → `pack_pose()` (L19, `<I16f` = 68 B) · `exp_script/03_full_pipeline.py` → `pack_pose_response()` (L543) + `unpack_tooth_pose()` (L535) · `exp_script/03_web_gui.py` → `pack_pose_resp()` (L725)

```
packet = struct.pack("<I16f", valid_flag, T_final.flatten(order="F"))
  byte 0–3  : valid_flag (uint32, 1=有效, 0=无效)
  byte 4–67 : 16 × float32 (列主序 4×4)
  total     : 68 bytes
```

Unity 将其解析回 4×4 矩阵，并直接赋给牙齿 `GameObject.transform.localToWorldMatrix`。

---

## 全链路一览（Full Chain at a Glance）

$$
\boxed{
T_{Unity\_mesh}=S\cdot\big(T_H\_C\cdot T_{wc}^{-1}\big)\cdot S
}
$$

其中

$$
T_H\_C=T_H\_R\cdot E
=T_{std}(\text{device\_pose})\cdot\text{camera\_to\_rignode}\big(\text{pv\_fix\_calibration}(K_{pv})\big)
$$

$$
T_{wc}=T_{wc\_from\_pnp}(rvec^*,tvec^*)=T_S\_C,\qquad T_{wc}^{-1}=T_C\_S,\qquad S=\mathrm{diag}(1,1,-1,1)
$$

最终到 Unity：`T_final = T_fix · T_Unity_mesh`（若开启回归）否则 `T_Unity_mesh`。

> **参考代码：** `exp_script/03_full_pipeline.py` → `compute_mesh_world_unity()` (L246) + `pack_pose_response()` (L543) · `exp_script/03_web_gui.py` → `compute_mesh_world_unity()` (L295) + `pack_pose_resp()` (L725)

数据流视角（每步的类型变化）：

| 步骤 | 输入 | 输出 | 单位 / 坐标系 |
|------|-------|--------|--------------|
| PnP | $N\times(3\mathrm{D}+2\mathrm{D})$ 对应点 | $R_{wc\to cam},\mathbf{t}$ | 毫米 / OpenCV 右手系 |
| `rvec_tvec_to_T_wc` | $\boldsymbol{\rho},\mathbf{t}$ | $T_{wc}\in SE(3)$ | 毫米 / OpenCV 右手系 |
| `invert_T` | $T_{wc}$ | $T_{cw}$ | 毫米 / OpenCV 右手系 |
| 翻转 Y | $R_{cw},\mathbf{t}_{cw}$ | $R_{cw}^U,\mathbf{t}_{cw}^U$ | 米 / Unity 左手系 |
| 眼偏移 | $T_{CE}^U$ | $T_{PV}^U$ | 米 / Unity 左手系 |
| 组合 | $T_{PV}^U\cdot T_{cw}^U$ | $T_{mesh}^U$ | 米 / Unity 左手系 |
| 自旋转 | $T_{mesh}^U\cdot T_{rot}$ | **`mesh_world`** | 米 / Unity 左手系 |

链路可视化：

```
p_mesh (沙盒)
   │  T_wc⁻¹ (= T_C_S, PnP 逆)
   ▼
p_cam (PV 相机)
   │  E (= camera_to_rignode, 相机外参)
   ▼
p_Rig (HL2 设备节点)
   │  T_std (= reference_to_world(device_pose), HL2 SLAM)
   ▼
p_H (HL2 世界)
   │  S (= diag(1,1,-1,1), 手性翻转)
   ▼
p_U (Unity 世界)
   │  T_fix (可选回归)
   ▼
p_U_final (Unity 世界, 已修正)
   │  打包进 68 字节 TCP
   ▼
Unity 牙齿 Transform
```
