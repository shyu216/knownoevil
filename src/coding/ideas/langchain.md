---
title: LangChain 入门与项目构想
icon: link
---

# LangChain

## 简介

LangChain 是一个用于构建 **LLM 应用**的开源框架，核心思路是把 LLM 的各种能力（对话、检索、工具调用、记忆）标准化为可组合的模块，像搭积木一样构建复杂的 AI 工作流。

### 核心概念

**Model I/O**
- `ChatModel` / `LLM`：统一接口对接 OpenAI、Anthropic、Gemini、本地 Ollama 等
- `PromptTemplate`：结构化 Prompt 管理，支持变量注入和版本控制

**Chains**
- 把多个步骤串联成流水线，例如 `Prompt → LLM → OutputParser`
- `LangChain Expression Language (LCEL)`：用 `|` 管道符声明式组合链，惰性执行、原生支持流式输出和并行

**Memory**
- 为对话保存上下文（`ConversationBufferMemory`、滑动窗口、向量摘要等）
- 可持久化到 Redis / PostgreSQL

**Retrieval-Augmented Generation (RAG)**
- `DocumentLoader` → `TextSplitter` → `Embedding` → `VectorStore` → `Retriever`
- 内置支持 Chroma、Pinecone、FAISS、pgvector 等向量库

**Agents & Tools**
- Agent 让 LLM 自主决定调用哪个工具、何时停止
- 内置工具：Google Search、Python REPL、SQL、Wikipedia 等
- 支持 `ReAct`、`OpenAI Functions`、`Tool Calling` 等 Agent 策略

**LangSmith**
- 官方的可观测性平台：追踪每次 LLM 调用的输入输出、耗时、Token 消耗
- 支持 Prompt 版本管理、评测数据集、自动化回归测试

**LangGraph**
- LangChain 生态中用于构建**有状态、多角色**工作流的图框架
- 节点 = 函数，边 = 条件跳转，天然支持循环、分支、人工介入（Human-in-the-loop）
- 适合构建复杂 Agent、多 Agent 协作系统

---

### 与其他框架对比

| | LangChain | LlamaIndex | AutoGen | CrewAI |
|---|---|---|---|---|
| 核心定位 | 通用 LLM 应用框架 | RAG / 知识库 | 多 Agent 对话 | 角色扮演多 Agent |
| RAG 能力 | 强 | 最强 | 弱 | 弱 |
| Agent 编排 | LangGraph（强） | 较弱 | 强 | 强 |
| 学习曲线 | 中 | 中 | 低 | 低 |
| 生产可观测 | LangSmith（原生）| 需外接 | 需外接 | 需外接 |

---

## 项目设想：论文研读助手 + 知识图谱构建器

### 背景

做科研或技术调研时，面对几十上百篇论文/文档，核心痛点是：
1. 读不完，但摘要又太简略
2. 不同论文之间的引用关系、概念关联难以直观看到
3. "这个方法在哪篇论文里提到过？"——很难快速定位

用 LangChain 构建一个能**深度理解**文献、自动提炼知识结构、支持自然语言问答的系统。

---

### 架构

```
输入层
├── PDF / arXiv 链接 / Markdown 文档
└── 批量导入 or 单篇实时处理
        │
        ▼
[ 文档处理流水线 ]  ← LangChain DocumentLoader + TextSplitter
├── 解析 PDF 结构（标题、摘要、章节、参考文献）
├── 分块策略：按语义段落切分（非固定字符数）
└── 元数据提取：作者、年份、关键词、方法名
        │
        ▼
[ Embedding + 向量存储 ]  ← OpenAI Embeddings + pgvector
├── 每个 chunk 向量化后存入 PostgreSQL (pgvector)
├── 同时写入结构化元数据到关系表
└── 构建概念节点 → Neo4j 知识图谱
        │
        ▼
[ RAG 问答引擎 ]  ← LCEL Chain
├── 混合检索：向量相似度 + 关键词 BM25
├── Re-ranking：Cohere Rerank 精排 Top-K
└── LLM 综合多文档生成有引用来源的回答
        │
        ▼
[ LangGraph Agent - 主动研读模式 ]
├── 给定一个研究问题，自动规划阅读顺序
├── 每读一篇：提炼贡献、方法、局限性
├── 发现新引用论文时，自动加入待读队列
└── 最终生成结构化的 Literature Review 草稿
        │
        ▼
[ 输出层 ]
├── Web UI：论文关系图谱可视化（D3.js / Cytoscape）
├── 问答界面：带引用的 RAG 对话
└── 导出：Markdown / Obsidian 格式的笔记
```

---

### 有意思的技术点

**1. 分层摘要（Hierarchical Summarization）**
- Chunk 级摘要 → 章节摘要 → 全文摘要
- 问答时根据问题粒度选择对应层级，避免"迷失在细节里"

**2. 知识图谱 + 向量双索引**
- Neo4j 存概念关系（`方法A` → `改进了` → `方法B`）
- 向量库存语义内容
- 问"RLHF 和 DPO 的区别"时，图谱给结构，向量库给细节

**3. 反事实追问 Agent**
- 读完一篇论文后，Agent 自动生成挑战性问题（"作者为什么不用 X 方法？局限性是否被低估？"）
- 模拟 peer review 思维，比被动阅读更有效

**4. 增量更新**
- 新论文 arXiv 上线时，自动检测是否与已有知识库相关
- 相关则触发摄取流水线，更新图谱

---

### 技术栈

- **框架**：LangChain + LangGraph
- **LLM**：GPT-4o（在线）/ Qwen2.5（本地 Ollama，离线场景）
- **向量库**：pgvector（PostgreSQL 插件）
- **图数据库**：Neo4j（概念关系图谱）
- **Embedding**：OpenAI `text-embedding-3-small`
- **Re-rank**：Cohere Rerank API
- **PDF 解析**：`pymupdf4llm`（保留结构）
- **前端**：Streamlit（快速原型）/ Next.js（生产）
- **可观测**：LangSmith（追踪所有 LLM 调用）

---

### 延伸变体

- **代码库理解助手**：把论文换成 GitHub repo，同样逻辑，回答"这个函数在哪里被调用？整体架构是怎样的？"
- **法律文书分析**：合同/判决书的条款提取 + 跨文档矛盾检测
- **企业知识库**：内部文档、Confluence、Slack 历史 → 公司专属问答机器人

---
