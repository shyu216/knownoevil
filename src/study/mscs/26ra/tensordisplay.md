---
title: "Tensor Displays: Compressive Light Field Synthesis using Multilayer Displays with Directional Backlighting"
icon: note-sticky
---

http://cameraculture.media.mit.edu/research/#cbp=/cubeportfolio/tensor-display-glasses-free-3d-hdtv

一种有多层面板，时间调制，定向背光的电视机。

就像一个手电筒戴了三层墨镜。每一时刻形成一组单一路径光线组合（每个像素向着一个方向发出），非常快地刷新（一帧图片拆成m个时序帧），使得这些光线几乎同时被人眼捕捉，这可以离散地近似到实际的光场。

普通LCD层，透光率0~1，负责挡光；定向背光，亮度0~1，负责发光；两者在数学上等价，都可以作为张量的一个维度参与计算。

用加权非负张量分解NTF计算，可以把5x5图片的光场，转成m帧的视差图片。

每一层n=3+1都有一些时序帧m=12，同一时间，所有层显示同一序号的时序帧（残缺的实际光场的一部分，权重是小w）。光从背光产生，再穿过三层面板，形成瞬时光场。整套时序帧高速循环刷新，经由人眼视觉积分，叠加平均为完整的重建光场。

图四说时序帧越多，张量分解的拟合基元越丰富，光场重构精度越高，成像效果更清晰。



