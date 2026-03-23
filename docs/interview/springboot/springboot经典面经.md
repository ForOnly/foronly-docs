---
title: SpringBoot经典面经
date: 2026-03-12
description: SpringBoot经典面经
outline: deep
layout: doc
---

# SpringBoot经典面经

## SpringMVC工作流程详解？

```mermaid
%%{init: {
  'flowchart': {
    'nodeSpacing': 50,
    'rankSpacing': 150
  }
}}%%
flowchart TD
    %% 样式定义
    classDef client fill:#e1f5fe,stroke:#333
    classDef core fill:#fff3e0,stroke:#333
    classDef component fill:#f1f8e9,stroke:#333
    classDef db fill:#fdecea,stroke:#333

    %% 节点定义
    A["Client<br/>(浏览器/调用方)"]:::client
    B["DispatcherServlet<br/>(前端控制器)"]:::core
    C["HandlerMapping<br/>(处理器映射器)"]:::component
    D["HandlerAdapter<br/>(处理器适配器)"]:::component
    E["Controller<br/>(处理器)"]:::component
    F["Service / DAO"]:::component
    G["DB"]:::db
    I["ViewResolver<br/>(视图解析器)"]:::component
    J["View<br/>(视图)"]:::component

    %% 请求流程
    A -->|"1. HTTP请求"| B
    B -->|"2. 查找Handler"| C
    C -->|"3. 返回Handler"| B
    B -->|"4. 调用HandlerAdapter"| D
    D -->|"5. 执行Controller"| E
    E -->|"6. 业务处理"| F
    F -->|"7. 数据访问"| G
    G -->|"8. 返回数据"| F
    F -->|"9. 返回结果"| E
    E -->|"10. 返回ModelAndView"| D
    D -->|"11. 返回ModelAndView"| B
    B -->|"12. 解析视图"| I
    I -->|"13. 返回View"| B
    B -->|"14. 渲染视图"| J
    J -->|"15. 响应结果"| A

```

完整工作流程：

```text
请求 → DispatcherServlet
    → HandlerMapping（找Controller）
    → HandlerAdapter（执行方法）
    → 参数绑定
    → Controller执行
    → 返回值处理
    → 视图解析 / JSON转换
    → 响应客户端
```

SpringMVC 的核心是基于前端控制器 `DispatcherServlet` 的请求分发机制。

当请求进入后，首先由 DispatcherServlet 接收，然后通过 `HandlerMapping` 根据 URL 查找到对应的 `Controller` 方法，同时获取拦截器链。

接着通过 `HandlerAdapter` 调用具体的 Controller 方法。在调用之前，会通过参数解析器完成请求参数到方法参数的绑定。

方法执行完成后，会通过返回值处理器对结果进行处理。如果是视图类型，则通过 `ViewResolver` 解析出具体视图并渲染；如果是 JSON，则通过 HttpMessageConverter 直接写回响应。

在整个过程中，还可以通过 HandlerInterceptor 在方法执行前后进行扩展处理。

整体流程体现了 SpringMVC 的核心设计思想：前端控制器模式 + 适配器模式 + 责任链模式。

## SpringBoot自动装配的原理和流程？

整体流程总结：

1. 启动 SpringBoot
2. 解析 `@SpringBootApplication`
3. 触发 `@EnableAutoConfiguration`
4. 执行 `AutoConfigurationImportSelector`
5. 加载所有自动配置类（SPI）
6. 根据 `@Conditional` 过滤
7. 将符合条件的 Bean 注册到容器

```mermaid
%%{init: {
  'flowchart': {
    'nodeSpacing': 10,
    'rankSpacing': 20
  }
}}%%
flowchart TB

    %% 样式定义：区分不同类型节点，提升视觉层次
    classDef start fill:#e1f5fe,stroke:#0288d1,stroke-width:2px,rounded:10
    classDef anno fill:#fff3e0,stroke:#f57c00,stroke-width:2px,rounded:10
    classDef step fill:#f1f8e9,stroke:#43a047,stroke-width:2px,rounded:10
    classDef branch fill:#fce4ec,stroke:#e91e63,stroke-width:2px,rounded:10
    classDef endnode fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px,rounded:10
    linkStyle default stroke:#666,stroke-width:1.2px,color:#333

    %% 节点定义（完全保留原内容）
    A[启动 Spring Boot 应用]:::start
    B["@SpringBootApplication"]:::anno
    C["@EnableAutoConfiguration"]:::anno
    D[导入 AutoConfigurationImportSelector]:::step
    E[读取自动配置类列表]:::step
    G[spring.factories]:::step
    H[AutoConfiguration.imports]:::step
    I[加载所有 AutoConfiguration 类]:::step
    J[遍历自动配置类]:::step
    K{"@Conditional <br/>（条件判断）"}:::branch
    L[注册 Bean 到容器]:::step
    M[跳过]:::step
    N[完成自动配置]:::endnode

    %% 流程连线（保留原逻辑，优化标注样式）
    A --> B
    B --> C
    C --> D
    D --> E
    E -->|SpringBoot 2.x 版本| G
    E -->|SpringBoot 3.x 版本| H
    G --> I
    H --> I
    I --> J
    J --> K
    K -->|条件满足| L
    K -->|条件不满足| M
    L --> N
```

SpringBoot 的自动装配核心是基于 `@EnableAutoConfiguration` 实现的。
启动时，通过 `@Import` 导入 `AutoConfigurationImportSelector`，它会从 `spring.factories（SpringBoot 2.x）`或者 `AutoConfiguration.imports（SpringBoot 3.x）`中加载所有自动配置类。

加载之后，并不是全部生效，而是通过 `@Conditional` 条件注解进行筛选，比如根据类路径、Bean 是否存在、配置项等条件，决定是否装配。

最终符合条件的自动配置类会向 Spring 容器中注册 Bean，从而实现“开箱即用”。

同时，SpringBoot 遵循“约定大于配置”，并且通过 `@ConditionalOnMissingBean` 保证用户自定义配置优先生效，从而实现可扩展和可覆盖。

总体来说，SpringBoot 自动装配的本质就是：SPI + 条件装配 + Bean 注册机制。
