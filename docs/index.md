---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "ForOnly Java 宝典"
  text: "不仅仅是面试题"
  tagline: "深挖 Java 底层原理，精通 MySQL 调优，掌握 JUC 高并发。构建属于你的技术知识体系。"

  actions:
    - theme: brand
      text: "🔥 马上开始突击"
      link: /Java/Java底层基础面经
    - theme: alt
      text: "📚 浏览文档指南"
      link: /guide
    - theme: alt
      text: "GitHub 仓库"
      link: https://github.com/ForOnly/foronly-docs

  image:
    src: /logo.jpg # 请确保 docs/public/logo.png 存在，若无图可暂时注释掉
    alt: Java Logo

features:
  - title: 📖 文档使用指南
    details: 了解本站点的使用方法、内容更新日志以及贡献指南。
    link: /guide

  - title: ☕ Java 核心底层
    details: 涵盖 JVM 内存模型、类加载机制、集合框架源码分析，夯实地基。
    link: /Java/Java底层基础面经

  - title: 🚀 JUC 并发编程
    details: 深入线程池原理、锁机制 (AQS/CAS)、并发容器及实战场景。
    link: /Java/JUC经典面经

  - title: 💾 MySQL 深度解析
    details: 索引优化、事务隔离级别、锁机制、日志系统 (Redo/Undo) 详解。
    link: /mysql/MySql基础

  - title: 🛠️ 更多内容开发中...
    details: Redis、Spring Boot、微服务架构、分布式系统设计正在赶来的路上。
---

<style>
:root {
  /* 调整 Hero 标题的渐变色，配合 Java 主题通常用 橙/红/紫 或 蓝/青 */
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #FF4B2B 30%, #FF416C);
}

/* 简单的图片浮动动画 */
.VPHero .image-src {
  animation: float 5s ease-in-out infinite;
  max-height: 220px;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}
</style>
