---
title: "FoundationPose: Unified 6D Pose Estimation and Tracking of Novel Object"
icon: file
---

这篇论文是 NVIDIA 团队发表的 **FoundationPose**,主要内容如下:

## 核心贡献

**FoundationPose** 是一个统一的 6D 物体姿态估计与跟踪基础模型,能够处理**未见过的新物体**,支持两种设置:

- **Model-based(基于模型)**:提供带纹理的 3D CAD 模型
- **Model-free(无模型)**:只提供少量(约16张)参考图像

该方法无需针对新物体做微调即可直接使用,同时覆盖了姿态估计和姿态跟踪两大任务(共4种组合场景)。

## 主要技术模块

1. **LLM 辅助的合成数据生成**:利用 ChatGPT 为 Objaverse 3D 资产生成文本描述,再通过扩散模型(TexFusion)自动生成逼真纹理,避免了传统随机贴图产生的接缝伪影问题。

2. **神经物体建模(Neural Object Field)**:基于 SDF(有符号距离场)表示,用于在无 CAD 模型场景下实现快速、高质量的新视角 RGBD 渲染,弥合了 model-based 和 model-free 两种设置的差距。

3. **姿态假设生成与优化**:先在物体周围均匀采样初始姿态,再通过基于 Transformer 的网络进行迭代精细化(预测平移和旋转的更新量,并采用解耦表示)。

4. **姿态选择(层次化比较)**:用一个姿态排序网络对多个候选姿态打分,采用两级自注意力机制(先比较渲染图与观测图,再在所有候选姿态间进行全局比较),并用对比验证的三元组损失训练。

## 实验结果

- 在 LINEMOD、YCB-Video、T-LESS、Occluded-LINEMOD、YCBInEOAT 等多个数据集上,大幅超越了各任务的专门方法(如 FS6D、OnePose++、MegaPose 等)。
- 在 BOP 官方排行榜("6D localization of unseen objects")上排名第一。
- 运行速度较快:姿态估计约 1.3 秒/物体,跟踪模式下可达 ~32 Hz。

## 局限性

依赖外部 2D 检测(如 Mask R-CNN 或 CNOS),在检测失败时会成为瓶颈;在**无纹理 + 严重遮挡 + 边缘线索有限**同时出现时,姿态估计仍可能出错(论文附录图11给出了失败案例)。
