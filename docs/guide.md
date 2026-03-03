# 📘 文档编写规范指南（VitePress 版）

## 一、目标

本规范用于统一文档风格，提升：

- 可读性
- 一致性
- 可维护性
- 搜索友好度
- 专业度

适用于本项目所有 Markdown 文档。

## 二、文档结构规范

### 1️⃣ 文件命名规范

- 使用 **小写字母**
- 单词使用 `-` 连接
- 禁止使用中文文件名
- 禁止使用空格

✅ 示例：

```text
Bashdatabase-index-optimization.mdgetting-started.mdapi-authentication.md
```

### 2️⃣ 目录结构建议

```text
docs/
 ├── guide/          # 入门与基础说明
 ├── backend/        # 后端相关
 ├── frontend/       # 前端相关
 ├── database/       # 数据库相关
 ├── devops/         # 运维部署
 └── appendix/       # 附录
```

结构原则：

- 按领域分类
- 控制目录深度 <= 3 层
- 保持模块边界清晰

## 三、标题规范

### 1️⃣ 必须唯一 H1

每个文档必须且只能有一个一级标题：

```Markdown
# MySQL 索引优化指南

# MySQL 索引优化指南
```

禁止：

```Markdown
# 标题1# 标题2 ❌

# 标题1# 标题2 ❌
```

### 2️⃣ 标题层级清晰

```Markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题（尽量少用）
```

规范：

- 不跳级（不能从 H2 直接到 H4）
- 每个小节控制在 3~8 个段落以内

## 四、正文编写规范

### 1️⃣ 段落控制

- 每段不超过 5 行
- 长段落必须拆分
- 多用列表结构表达

❌ 错误写法：

一整段十几行的大段文字

✅ 推荐写法：

- 核心点 1
- 核心点 2
- 核心点 3

### 2️⃣ 技术术语规范

- 英文技术名词保持原文
- 首次出现可加中文解释

示例：

使用 B+Tree（B+ 树）作为索引结构。

### 3️⃣ 强调方式

使用 Markdown 原生语法：

```Markdown
**重要***斜体*`代码`
```

避免滥用：

- ❌ 不要大量加粗
- ❌ 不要使用 HTML 强制样式

## 五、代码块规范

### 1️⃣ 必须声明语言

`Markdown`

```python
def query_user(user_id: int) -&gt; dict:
    """ 根据用户 ID 查询用户信息 :param user_id: 用户 ID :return: 用户信息字典 """
    return database.get(user_id)
```

```

SELECT \* FROM user;
```

### 2️⃣ 代码规范要求

- 变量命名清晰
- 必须添加必要注释
- 示例必须可运行
- 不要出现伪代码式敷衍示例

## 六、示例结构模板

推荐文档标准结构：

```Markdown
# 标题## 一、背景问题来源 + 适用场景
## 二、原理说明核心机制讲解
## 三、示例代码完整示例
## 四、常见问题FAQ
## 五、总结要点归纳

```

## 七、VitePress 专用规范

### 1️⃣ Frontmatter 规范

```YAML
---
title:
MySQL 索引优化description: 深入理解 MySQL 索引结构与回表机制
outline: deep
---

```

要求：

- 每篇文档必须有 title
- description 用于 SEO
- 长文档必须开启 outline

### 2️⃣ 自定义容器使用规范

VitePress 支持：

```Markdown
::: tip这是提示
:::::: warning这是警告
:::::: danger这是危险说明:::
```

使用规则：

- tip → 建议
- warning → 易错点
- danger → 高风险操作

禁止滥用。

## 八、图表与示意规范

- 优先使用 Mermaid
- 禁止上传低分辨率截图
- 禁止使用带水印图片

示例：

`Markdown`
mermaidgraph TD A[客户端] --&gt; B[服务器]`
Markdown`mermaidgraph TD A[客户端] --&gt; B[服务器]```

````

## 九、提交规范

### 1️⃣ Commit Message 规范

```代码docs: 新增 MySQL 索引回表说明docs: 修复 API 认证章节错误docs: 优化 Redis 部分结构
代码docs: 新增 MySQL 索引回表说明docs: 修复 API 认证章节错误docs: 优化 Redis 部分结构
```

格式：

```
代码docs: 描述
```

### 2️⃣ PR 要求

- 说明修改目的
- 提供预览截图（如有 UI 改动）
- 禁止提交未完成文档

## 十、文档质量自检清单

提交前请检查：

- 是否只有一个 H1
- 是否存在错别字
- 是否有未声明语言的代码块
- 是否存在超长段落
- 是否添加 Frontmatter
- 是否逻辑清晰

## 十一、风格原则

文档应当：

- 清晰 &gt; 炫技
- 结构化 &gt; 长篇大论
- 示例驱动 &gt; 空泛理论
- 一致性 &gt; 个性化写法

## 十二、推荐字体与展示优化建议（可选）

如果你追求更好的阅读体验，可以在 VitePress 中：

- 英文字体：Inter
- 中文字体：思源黑体
- 等宽字体：JetBrains Mono
- 开启代码块行号
- 控制行宽 <= 80ch
````
