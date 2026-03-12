---
title: 计算史学项目构想
icon: scroll
---

## 已有方案

### 开源数据集
| 项目 | 说明 | 链接 |
|------|------|------|
| chinese-poetry | 唐诗、宋词、论语、史记等古籍JSON数据 | https://github.com/shyu216/chinese-poetry |
| chinese-gushiwen | 古诗文网数据 | https://github.com/shyu216/chinese-gushiwen |

### 古诗软件
| 项目 | 说明 | 链接 |
|------|------|------|
| QuanTangshi | 一个小app | https://github.com/stoneson/QuanTangshi |
| ccpoems | 另一个小app | https://github.com/shyu216/ccpoems |

### 工具
| 项目 | 用途 | 链接 |
|------|------|------|
| HanLP | 中文NLP | https://github.com/hankcs/HanLP |
| OpenCC | 繁简转换 | https://github.com/BYVoid/OpenCC |
| pypinyin | 拼音/韵律 | https://github.com/mozillazg/python-pinyin |
| JioNLP | 中文NLP工具包 | https://github.com/dongrixinyu/JioNLP |
| gensim | Word2Vec/主题模型 | https://github.com/RaRe-Technologies/gensim |
| 识典古籍 | 四库全书在线 | https://www.shidianguji.com |

### 学术资源
- [图书馆情报学期刊论文](https://tsyqb.gslib.com.cn/CN/10.11968/tsyqb.1003-6938.2023003)
- [VisTrails可视化教程](https://www.vistrails.org/index.php/Video_Tutorial)
- 全历史/全知识APP - 历史时空数据参考

### 现有AI古文项目现状
- **90%**：AI写诗、古文翻译、ChatGPT式问答
- **10%**：简单词云
- **极少**：大规模清洗、时空可视化、风格量化、文学规律挖掘

---

## 项目定位

**项目名称**：中国古代文学时空图谱：基于200万古籍文本的大数据挖掘

**English Title**: Chinese Ancient Literature Atlas: Data Mining over 2M Classical Texts

**核心价值**：用数据科学方法挖掘古文中的隐藏规律，发现史书未记载的秘密

---

## 创新方向（蓝海）

### 1. 情绪指纹：诗人一生的心理曲线
- 每首诗情感打分（积极/消极/激昂/悲凉）
- 按时间画人生情绪曲线
- 对比：被贬前后情绪变化、晚年vs青年用词差异
- **领域**：计算史学 + 心理史学

### 2. 文学社交网络：谁和谁真的熟
- 互相提及频率
- 用词风格互相影响程度
- 文坛中心节点识别
- **方法**：社交网络分析(SNA)

### 3. 气候—战争—文学跨维度关联
- 气候变冷 → 饥荒 → 战乱 → 诗词情绪暴跌
- 丰收年份 → 诗词开朗词变多
- 战争地区vs非战争地区用词差异
- **方法**：多源数据融合

### 4. 风格抄袭与模仿检测
- 词向量相似度
- 句法结构相似度
- 韵律模式
- 主题分布
- **领域**：计算文体学(Stylometry)

---

## 技术实现

### 一、数据获取与清洗
```python
from opencc import OpenCC

cc = OpenCC('t2s')
text_simplified = cc.convert('繁體中文文本')
```
- 爬取、清洗、去重、结构化
- 繁体→简体、乱码处理、分段、标点

### 二、拼音与韵律分析
```python
from pypinyin import lazy_pinyin, Style

pinyin = lazy_pinyin('床前明月光')
tone = lazy_pinyin('床前明月光', style=Style.TONE3)
```
- 每句诗的平仄格式
- 韵脚是否相同
- 整首诗的韵律规律

### 三、文本向量化与主题模型
```python
from gensim.models import Word2Vec

model = Word2Vec(sentences, vector_size=128, window=5, min_count=3)
```
- TF-IDF / Word2Vec / LDA主题模型
- 叠加韵律特征：声调、平仄、韵脚、句长、双声、叠韵
- **独创点**：文字向量 + 韵律向量 = 超强诗句表示

### 四、时空可视化
- 按诗人出生地、游历地
- 按朝代时间线
- 颜色：情感值 | 大小：创作数量
- **工具**：Plotly / Dash / Pyecharts

### 五、量化风格分析
- 平均句长、韵律频率、意象密度
- 情感极性、用词复杂度
- KMeans聚类：文风相近者
- 分类模型：判断作者
- 异常检测：疑似伪作

---

## 可产出成果

| 成果 | 说明 |
|------|------|
| 古诗韵律演化图 | 唐→宋→元韵脚使用变化 |
| 诗人韵律指纹 | 偏好韵部、平仄习惯、句长节奏 |
| 古音与方言关联 | 判断南北方作者 |
| 格律机器鉴定 | 绝句/律诗/古诗判断、失黏失对检测 |

---

## 简历描述模板

> Developed a quantitative history system to reconstruct poets' emotional life cycles, literary influence networks, and the correlation between literature, climate, and wars. Discovered hidden patterns unrecorded in traditional history books.

---

## 技能展示

- Python数据处理（Pandas, NumPy）
- 数据清洗、结构化
- NLP、文本挖掘
- 可视化、Dashboard
- 聚类、分类、时序模型
- 复杂数据转化为洞见
