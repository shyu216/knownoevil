---
title: 数字人文
icon: paintbrush
---

## 已有方案

### 书法OCR平台
| 项目 | 说明 | 链接 |
|------|------|------|
| 台湾古籍OCR | 古籍文献识别 | https://ocr.ascdc.tw/guest.php |
| EMNLP 2024论文 | 古文NLP最新研究 | https://aclanthology.org/2025.emnlp-main.245.pdf |
| 文献学导航 | 数字人文资源汇总 | https://www.wenxianxue.cn/daohang/641.html |
| B站书法OCR教程 | 实操视频教程 | https://www.bilibili.com/video/BV1WQ4y1A7dE |

### 现有OCR能力现状
| 能力 | 支持程度 |
|------|----------|
| 印刷体识别 | ✅ 成熟 |
| 书法/草书/行书 | ❌ 几乎空白 |
| 隶书/篆书 | ❌ 几乎空白 |
| 古文碑帖/手稿 | ❌ 几乎空白 |

---

## 项目定位

**项目名称**：Ancient Chinese Calligraphy OCR & Style Analysis System

**中文名称**：中国古书法OCR与书写风格量化分析系统

**核心价值**：CV检测文字 + NLP理解古文 + 数据挖掘风格，四合一王炸项目

**适合人群**：有YOLO/CV/NLP基础，想进做市商/量化/AI公司

---

## 为什么这个方向适合你

| 你会的技能 | 项目对应需求 |
|------------|--------------|
| YOLO目标检测 | 书法文字定位 |
| 实时图像处理 | 低延迟推理 |
| GPU性能优化 | 模型部署加速 |
| Python/数据处理 | 数据pipeline |
| NLP古文思路 | 文字理解与韵律分析 |

---

## 项目级别

### Level 1：书法文字定位（入门）
- **输入**：书法/碑帖图片
- **输出**：每个字的bounding box
- **工具**：YOLOv8 / YOLOv11
- **代码量**：≈200行

### Level 2：书法字体OCR（中级）
- **结构**：YOLO检测 + CRNN识别
- **能力**：识别楷书、行书、部分草书
- **输出**：繁体/简体 + 拼音
- **代码量**：≈300行

### Level 3：完整系统（炸穿简历）
- YOLO检测碑帖/书法中每个字
- OCR识别文字
- 转简体、拼音、韵律
- 量化书法家风格指纹
- **代码量**：≈1100行

---

## 系统功能设计

### 输入
上传一张王羲之/颜真卿/苏轼的书法图片

### 输出
| 功能 | 说明 |
|------|------|
| 文字识别 | 每个字是什么 |
| 韵律分析 | 平仄、押韵 |
| 作者分类 | 这是谁的字体 |
| 风格量化 | 粗细、结构、章法、笔画密度 |

---

## 技术实现

### 一、文字检测（YOLO）
```python
from ultralytics import YOLO

model = YOLO('yolov8n.pt')
results = model('calligraphy.jpg')
```
- 数据集：开源书法字数据集
- 输出：每个字的bounding box

### 二、文字识别（CRNN）
- CNN提取特征 + RNN序列识别 + CTC解码
- 支持书法字体变体

### 三、古文处理
```python
from opencc import OpenCC
from pypinyin import lazy_pinyin, Style

cc = OpenCC('t2s')
text_simplified = cc.convert(text)
pinyin = lazy_pinyin(text_simplified)
```
- 繁简转换
- 拼音标注
- 韵律分析

### 四、风格量化
| 特征 | 说明 |
|------|------|
| 粗细 | 笔画宽度分布 |
| 结构 | 字形紧凑度 |
| 章法 | 整体布局 |
| 笔画密度 | 单位面积笔画数 |

---

## 为什么做市商/交易公司喜欢

| 项目展示的能力 | 交易公司需求 |
|----------------|--------------|
| 实时图像处理 | 低延迟系统 |
| 模型部署 | 生产环境工程 |
| 复杂数据处理 | 多源数据融合 |
| 多模型pipeline | 系统集成 |
| 性能优化 | 延迟敏感场景 |

---

## 职业定位

**不走**：trader、FPGA硬啃

**走**：AI + CV + 实时系统 + 低延迟部署

**目标公司**：交易公司、量化基金、科技公司

---

## 简历描述模板

> Built an end-to-end ancient Chinese calligraphy OCR system combining YOLO-based character detection, CRNN recognition, and NLP-powered classical text analysis. Achieved real-time inference with style quantification for calligrapher identification.
