---
title: PyTorch
icon: mug-hot
---

## What are the basic modules and how do they work?

- [转置卷积](https://zh.d2l.ai/chapter_computer-vision/transposed-conv.html)
- [池化](https://d2l-zh.djl.ai/chapter_convolutional-neural-networks/pooling.html)
- [填充和步幅](https://zh.d2l.ai/chapter_convolutional-neural-networks/padding-and-strides.html)

### How to update system path?

- remove something: `$env:PATH = ($env:PATH -split ';' | Where-Object {$_ -notmatch 'CUDA'}) -join ';'`
- update: `$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")`