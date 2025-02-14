---
title: Cloud-Device Collaborative Learning via small and large lanauge models for mobile health
shortTitle: Mobile Health
order: 1
icon: lightbulb
category:
   - 25s1
---

With the growing adoption of wearable and mobile devices, the use of AI in mobile health is becoming increasingly relevant for a variety of healthcare applications. However, deploying AI models on these resource-limited client devices poses significant challenges, restricting their applicability. This is especially the case with the introduction of large language models (LLMs) and multimodal LLMs, which require substantial memory and therefore present additional deployment hurdles.


Furthermore, safeguarding the privacy of sensitive client information necessitates local data processing. A promising approach is to design a collaborative learning framework that processes sensitive data locally while utilizing the cloud's extensive resources. 


Additionally, client devices may only support limited modalities such as speech and images, while others might include additional sensor data like PPG and ECG. Thus, effectively harnessing comprehensive information through collaborative learning is also vital.


This project aims to develop a collaborative learning framework that enhances health inference and privacy and effectively leverages information across multiple modalities. By integrating both small and large language models on client devices and the cloud, this approach seeks to secure sensitive data and optimize the utilization of local and cloud resources for improved health outcomes.

Superivsor: [Ting Dang](https://tingdang90.github.io/), [Hong Jia](https://h-jia.github.io/)

# 文献阅读

## 1. LightLLM: A Versatile Large Language Model for Predictive Light Sensing

### 有哪些光传感任务？

indoor positioning, outdoor solar forecasting, and indoor solar estimation

### 怎么处理数据？

定位任务用graph neural network, forecasting任务用temporal convolutional network, estimation任务用cnn. LLM适合用说明性的knowledge graph和task-specific的prompt.

### 怎么设置实验?

找state-of-the-art, 针对任务找数据集, 消融实验, 可视化. LLM可以分析few-shot/zero-shot. 多找几个LLM. case study.

## 2. Multimodal Large Language Models in Human-Centered Health: Practical Insights

### 多模态的三个方案?

转化成文本, 用API, encoder+fine-tuning

## 3. LORA: LOW-RANK ADAPTATION OF LARGE LAN-GUAGE MODELS

### LoRA是什么?

在transformer的每一层中注入可训练的低秩矩阵, 用于捕捉任务特定的特征. 这些矩阵的参数量远小于原始模型参数, 保持预训练模型的参数不变, 避免全参数微调的高成本.

## 4. Human-centred artificial intelligence for mobile health sensing: challenges and opportunities

### 哪些传感器可以用于哪些领域?

accelerometers, electrocardiograms (ECGs), global
positioning systems (GPSs), gyroscopes and microphones monitor our location, sleep, steps, eating and working habits in the real world.

数据包括audio, mobility, motion, biosignal, RF signal(射频信号, 蓝牙和wifi常用).

mobile health包括physical activity, disease diagnosis and mental health disorders.

### 有哪些挑战?

AI的interpretability, adaptability, privacy, robustness. wearable程度, methodology和evaluation.

## 5. Efficient and Personalized Mobile Health Event Prediction via Small Language Models

### SLM怎么设置实验?

iphone+MobileAIBench. 没有baseline.