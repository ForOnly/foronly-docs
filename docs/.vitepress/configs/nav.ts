import type { DefaultTheme } from "vitepress";

const nav: DefaultTheme.Config["nav"] = [
  { text: "首页", link: "/" },
  { text: "指南", link: "/guide/guide" },
  {
    text: "面试",
    items: [
      {
        text: "JAVA",
        items: [
          {
            text: "Java底层基础面经",
            link: "/interview/Java/Java底层基础面经",
          },
          { text: "Java线程池", link: "/interview/Java/Java线程池" },
          { text: "JUC经典面经", link: "/interview/Java/JUC经典面经" },
          { text: "JVM经典面经", link: "/interview/Java/JVM经典面经" },
        ],
      },
      {
        text: "MySQL",
        items: [{ text: "MySQL基础", link: "/interview/mysql/MySql基础" }],
      },
      {
        text: "Redis",
        items: [
          { text: "redis基础", link: "/interview/redis/redis基础" },
          { text: "redis业务场景", link: "/interview/redis/redis业务场景" },
        ],
      },
      {
        text: "SpringBoot",
        items: [
          {
            text: "springboot经典面经",
            link: "/interview/springboot/springboot经典面经",
          },
        ],
      },
      {
        text: "数据结构",
        items: [{ text: "树", link: "/interview/data_structure/tree" }],
      },
    ],
  },
  { text: "实战面经", link: "/real_interview/real_interview" },
  {
    text: "关于我",
    items: [
      { text: "Github", link: "https://github.com/ForOnly" },
      { text: "更新日志", link: "/changelog/changelog" },
    ],
  },
];

export default nav;
