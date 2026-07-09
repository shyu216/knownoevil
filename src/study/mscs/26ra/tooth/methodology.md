---
title: 图像到网格配准方法（Image-to-Mesh Registration）
icon: camera
tag:
  - XFeat
  - LightGlue
  - PnP
  - HoloLens
---

一种单帧**图像到网格配准（image-to-mesh registration）**方法：将一张真实采集图像 $I$ 与预渲染的参考视图库匹配，恢复三维场景坐标系下的相机位姿 $T_{wc}$，再把目标网格（mesh）$\mathcal{M}$ 重新投影（re-project）回原始图像做视觉合理性检查。

> **参考代码：** `exp_script/03_full_pipeline.py` → `main()` (L755) · `exp_script/helper_ai.py` → `strategy_allview_allscale()` (L1126)

整个流程为：(1) 采样参考视图 + 预提取特征；(2) 基于 XFeat（轻量特征提取网络 / accelerated features）+ LightGlue（轻量级图匹配器 / lightweight matcher）的跨视图稀疏匹配；(3) 由深度图构建 2D–3D 对应点，并用 PoseLib（位姿求解库 / pose-solver library）做鲁棒 PnP（透视n点法 / Perspective-n-Point）求解；(4) 对候选视图打分并选取最佳位姿；(5) 对网格做光线投射（ray-cast）并合成叠加到图像上。

> **参考代码：** `exp_script/03_full_pipeline.py` → `main()` loop (L866–L1143) · `exp_script/helper_ai.py` → `match_one_view()` (L1041)

---

## 1. 概述（Overview）

给定一张真实图像 $I$ 与预渲染的参考集合 $\mathcal{V}=\{v_1,\dots,v_N\}$，每个视图 $v_i$ 附带其 RGB 图 $I_i^{ref}$、以三维坐标场形式表达的稠密深度 $X_i\in\mathbb{R}^{H\times W\times 3}$（场景坐标系下）、有效性掩码（mask）$M_i\in\{0,1\}^{H\times W}$、内参（intrinsics）$K_i$ 与外参（extrinsics）$T^{wc}_i$。

该方法返回一个相机→世界位姿 $T_{wc}^{*}$，使得把 $\mathcal{M}$ 重新投影后与 $I$ 中真实的牙齿对齐。

> **参考代码：** `exp_script/03_full_pipeline.py` → `solve_pnp()` (L431) + `rvec_tvec_to_T_wc()` (L453) + `render_mesh()` (L472) · `exp_script/helper_ai.py` → `solve_pnp()` (L992) + `render_mesh()` (L1691)

---

## 2. 参考视图库（Reference View Library）

### 2.1 视图子采样（最大–最小离散度）

为控制计算量，对相机中心集合 $\{p_i\}_{i=1}^{N}\subset\mathbb{R}^3$（取自每个视图的 `cam_pos`）做贪心最大–最小子采样，使选出的 $K\ll N$ 个视图在球面上尽量分散：

$$
i_1=\arg\max_i\|p_i-\bar p\|_2,\qquad \bar p=\frac1N\sum_{i=1}^{N}p_i
$$

然后迭代：

$$
i_{k+1}=\arg\max_{j\notin\mathcal{S}_k}\;\min_{s\in\mathcal{S}_k}\|p_j-p_s\|_2,\qquad \mathcal{S}_k=\{i_1,\dots,i_k\}
$$

直到 $|\mathcal{S}|=K_{\max}$（此处 $K_{\max}=36$）。

> **参考代码：** `exp_script/03_full_pipeline.py` → `load_guide_views()` (L331, subsample L342–L351) · `exp_script/helper_ai.py` → `_select_diverse_views()` (L784)

### 2.2 坐标系修正（Coordinate-system fix）

由于成像约定不一致，对每个参考视图施加 $180^{\circ}$ 滚转（roll）校正：对图像与深度场做空间翻转，并修正主点（principal point）：

> **参考代码：** `exp_script/exp_full_pipeline.py` → `_rotate_bundle_180()` (L207) · `demo_script/01_gen_guide_view.py` (save-time `cv2.flip(bgr,0)`, L5)

$$
c_x'=(W-1)-c_x,\qquad c_y'=(H-1)-c_y
$$

以及旋转部分：

$$
R'=R\cdot\mathrm{diag}(-1,-1,1)
$$

---

## 3. 特征提取与跨视图匹配（Feature Extraction & Cross-view Matching）

### 3.1 XFeat 提取

在参考集合与输入图像 $I$ 上提取稀疏关键点（keypoint）$\mathbf{u}_i$、置信度 $\mathbf{s}_i$ 与描述子（descriptor）$\mathbf{d}_i$：

$$
\{\mathbf{u}_i,\mathbf{s}_i,\mathbf{d}_i\}=\mathrm{XFeat}(I_i;\,\mathrm{top\_k}=K_f)
$$

$\mathbf{u}_i\in\mathbb{R}^{n\times 2}$ 关键点像素坐标，$\mathbf{s}_i$ 置信度，$\mathbf{d}_i$ 描述子。$K_f$ 为每张图像的最大特征数（此处 3000）。

> **参考代码：** `exp_script/helper_ai.py` → `extract_target()` (L884) + `init_xfeat()` (L672) · `exp_script/03_full_pipeline.py` → `xfeat.detectAndCompute` (L927)

### 3.2 LightGlue 匹配

对当前帧特征 $\{\mathbf{u}^{cur},\mathbf{d}^{cur}\}$ 与每个参考 $\{\mathbf{u}^{ref}_k,\mathbf{d}^{ref}_k\}$ 做可学习注意力匹配：

$$
(\mathbf{p}^{ref}_k,\mathbf{p}^{cur}_k,\bar c_k)=\mathrm{LightGlue}\big(\{\mathbf{u}^{ref}_k,\mathbf{d}^{ref}_k\},\{\mathbf{u}^{cur},\mathbf{d}^{cur}\};\,\tau_{conf}\big)
$$

只保留置信度高于 $\tau_{conf}$（此处 0.1）的互匹配（mutual match）。$\bar c_k$ 为平均匹配置信度，$n_k=|\mathbf{p}^{ref}_k|$ 为互匹配数量。

> **参考代码：** `exp_script/helper_ai.py` → `match_one_view()` (L1041, `xfeat.match_lighterglue_batch`) · `exp_script/03_full_pipeline.py` → `match_lighterglue_batch` (L948)

---

## 4. 2D–3D 对应与鲁棒 PnP（Correspondence & Robust PnP）

### 4.1 深度反投影采样（Depth back-projection sampling）

对匹配点 $\mathbf{p}^{ref}_{k,j}=(u,v)$ 在参考 $k$ 的深度场 $X_k$ 中最近邻采样三维场景坐标：

$$
\mathbf{X}_{k,j}=X_k\big(\mathrm{round}(v),\,\mathrm{round}(u)\big),\quad\text{valid iff }M_k(v,u)=1\ \wedge\ \mathbf{X}_{k,j}\text{ finite}
$$

保留有效点 → 对应点集合 $\{(\mathbf{X}_{k,j},\mathbf{p}^{cur}_{k,j})\}_{j=1}^{n_k'}$。

> **参考代码：** `exp_script/03_full_pipeline.py` → `sample_xyz()` (L423) · `exp_script/helper_ai.py` → `sample_xyz()` (L982)

### 4.2 LO-RANSAC PnP

PoseLib 求解使内点（inlier）重投影（reprojection）误差最小的相机位姿 $(R,\mathbf{t})$：

$$
(R^*,\mathbf{t}^*)=\arg\min_{R,\mathbf{t}}\sum_{j\in\mathcal{I}}\rho\Big(\big\|\pi(K,R,\mathbf{t},\mathbf{X}_{k,j})-\mathbf{p}^{cur}_{k,j}\big\|_2\Big)
$$

其中针孔投影：

$$
\pi(K,R,\mathbf{t},\mathbf{X})=K\cdot\frac{(R\mathbf{X}+\mathbf{t})_{1:2}}{(R\mathbf{X}+\mathbf{t})_3}
$$

$\rho(\cdot)$ 为 LO-RANSAC（带局部优化的 RANSAC / Locally Optimized RANSAC）鲁棒核。内点阈值 = 重投影误差 $\le\tau_{px}$（此处 4.0 px）。要求 $|\mathcal{I}|\ge n_{min}$（此处 6）。

> **参考代码：** `exp_script/03_full_pipeline.py` → `solve_pnp()` (L431) + `rvec_tvec_to_T_wc()` (L453) · `exp_script/helper_ai.py` → `solve_pnp()` (L992)

求解得到的位姿是世界→相机变换：

$$
T_{cw}=\begin{bmatrix}R^*&\mathbf{t}^*\\\mathbf{0}^\top&1\end{bmatrix}
$$

取逆得到相机→世界（用于网格渲染）：

$$
T_{wc}=T_{cw}^{-1}=\begin{bmatrix}{R^*}^\top&-{R^*}^\top\mathbf{t}^*\\\mathbf{0}^\top&1\end{bmatrix}
$$

---

## 5. 候选打分与最佳位姿（Candidate Scoring & Best Pose）

由于存在大量参考视图，帧必须对所有候选做匹配–求解，再由统一打分选出最佳。内点率：

$$
r_k=\frac{|\mathcal{I}_k|}{n_k'}
$$

中位重投影误差 $\tilde e_k=\mathrm{median}_{j\in\mathcal{I}_k}e_{k,j}$。综合得分：

$$
S_k=|\mathcal{I}_k|\cdot\Big(1-\min\!\Big(\frac{\tilde e_k}{10},\,1\Big)\Big)\cdot r_k\cdot\ln(1+n_k)
$$

它同时惩罚低内点数量、低内点率与高重投影误差，并通过 $\ln(1+n_k)$ 奖励匹配数足够的视图。最终位姿为得分最高的视图：

$$
k^*=\arg\max_k S_k,\qquad T_{wc}^*=T_{wc}^{(k^*)}
$$

若 $\max_k S_k=0$（没有任何视图满足最小内点规则），则该帧被判定为定位失败。

> **参考代码：** `exp_script/helper_ai.py` → `match_one_view()` score (L1096: `pnp_score = n_in/(1+median_reproj)`) · `exp_script/03_full_pipeline.py` (L980)。注意：实际发布代码使用的是这个更简单的打分，而非上面设计的 $S_k$ 公式。

---

## 6. 网格渲染与合成（Mesh Rendering & Compositing）

### 6.1 内参缩放对齐（Intrinsics scale alignment）

采集分辨率、参考渲染分辨率与原始传感器标定分辨率可能都不同，因此逐步对 $K$ 做缩放：

$$
K_{dst}=S(w_{dst}/w_{src},\,h_{dst}/h_{src})\cdot K_{src}
$$

仅缩放焦距（focal length）与主点：$f_x'=f_x\cdot w_{dst}/w_{src}$，等等。

> **参考代码：** `exp_script/03_full_pipeline.py` → `scale_K()` (L129) · `exp_script/helper_ai.py` → `scale_K()` (L679)

### 6.2 光线投射渲染（Ray-cast rendering）

以位姿 $T_{wc}^*$ 与对齐后的 $K_{img}$，世界→相机外参为：

$$
E=T_{wc}^{*-1}=\begin{bmatrix}R^\top&-R^\top\mathbf{c}\\\mathbf{0}^\top&1\end{bmatrix},\qquad \mathbf{c}=T_{wc}^*[:3,3]
$$

对每个像素 $(u,v)$ 投射针孔光线，与网格 $\mathcal{M}$ 求交，取命中的三角形索引 $f$ 与重心坐标权重 $(w_0,w_1,w_2)$。按顶点色重心插值上色：

$$
c(u,v)=w_0\,c_{f,0}+w_1\,c_{f,1}+w_2\,c_{f,2},\qquad w_0+w_1+w_2=1
$$

未命中标记为无效 → 掩码 $V$。

> **参考代码：** `exp_script/03_full_pipeline.py` → `render_mesh()` (L472) · `exp_script/helper_ai.py` → `render_mesh()` (L1691)

### 6.3 半透明叠加（Semi-transparent overlay）

为软化掩码边缘锯齿，将 $V$ 膨胀为 $V_d$，并对过渡带降权：

$$
\alpha(u,v)=
\begin{cases}
\alpha_0, & V(u,v)=1\\[2pt]
\tfrac12\alpha_0, & V_d(u,v)=1,\ V(u,v)=0\\[2pt]
0, & \text{otherwise}
\end{cases}
$$

最终合成：

$$
I_{out}(u,v)=\big(1-\alpha(u,v)\big)\,I(u,v)+\alpha(u,v)\,c(u,v)
$$

$\alpha_0$ 为基础不透明度（此处 0.7）。

> **参考代码：** `exp_script/03_full_pipeline.py` → `overlay_mesh()` (L496) · `exp_script/helper_ai.py` → `overlay_mesh()` (L1752)

---

## 7. 实现要点（Implementation Summary）

> **参考代码：** `exp_script/03_full_pipeline.py` config (L54–L62: `TOP_K, MAX_VIEWS, MIN_CONF, RANSAC_PX, MIN_INLIERS, OVERLAY_ALPHA`) · `exp_script/helper_ai.py` (L638–L649)

| 阶段 | 超参数 | 取值 |
|---|---|---|
| 视图子采样 | 最大参考视图数 $K_{\max}$ | 36 |
| 特征提取 | 每图最大特征数 $K_f$ | 3000 |
| 匹配 | LightGlue 最小置信度 $\tau_{conf}$ | 0.1 |
| PnP | RANSAC 重投影阈值 $\tau_{px}$ | 4.0 px |
| PnP | 最小内点数 $n_{min}$ | 6 |
| 叠加 | 基础不透明度 $\alpha_0$ | 0.7 |
