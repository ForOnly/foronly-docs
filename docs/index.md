---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "秋生落叶"
  text: ""
  tagline: "深挖 Java 底层原理，精通 MySQL 调优，掌握 JUC 高并发。构建属于你的技术知识体系。"

  actions:
    - theme: brand
      text: "🔥 马上开始突击"
      link: /interview/Java/Java底层基础面经
    - theme: alt
      text: "📚 浏览文档指南"
      link: /guide/guide
    - theme: alt
      text: "GitHub 仓库"
      link: https://github.com/ForOnly/foronly-docs

  image:
    src: /logo/head_logo.png # 请确保 docs/public/logo.png 存在，若无图可暂时注释掉
    alt: avatar

features:
  - title: 📖 文档指南
    details: 了解本站点的使用方法、内容更新日志以及贡献指南。
    link: /guide/guide
    linkText: 指南

  - title: ☕ Java 基础
    details: 涵盖 JVM 内存模型、类加载机制、集合框架源码分析，夯实地基。
    link: /interview/Java/Java底层基础面经
    linkText: Java 基础

  - title: 🚀 JUC 并发编程
    details: 深入线程池原理、锁机制 (AQS/CAS)、并发容器及实战场景。
    link: /interview/Java/JUC经典面经
    linkText: JUC 并发编程

  - title: 💾 MySQL 深度解析
    details: 索引优化、事务隔离级别、锁机制、日志系统 (Redo/Undo) 详解。
    link: /interview/mysql/MySql基础
    linkText: MySQL 深度解析

  - title: 🛠️ 更多内容开发中... 🎉
    details: '<small class="bottom-small">一个想躺平的小开发</small>'
    link: https://github.com/ForOnly
    linkText: 更多内容
---

<style>

/* 简单的图片浮动动画 */
.VPHero .image-container {
  display: block;
  margin: 0 auto;
  animation: float 5s ease-in-out infinite;

}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}
</style>
