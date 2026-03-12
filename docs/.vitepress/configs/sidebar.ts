import type { DefaultTheme } from "vitepress";

const sidebar: DefaultTheme.Config["sidebar"] = {
  "/guide/": [
    {
      text: "Guide",
      items: [{ text: "文档指南", link: "/guide/guide" }],
    },
  ],

  "/interview/": [
    // {
    //   text: "Examples",
    //   items: [
    //     { text: "Markdown Examples", link: "/markdown-examples" },
    //     { text: "Runtime API Examples", link: "/api-examples" },
    //   ],
    // },
    {
      text: "Java",
      items: [
        { text: "Java底层基础面经", link: "/interview/Java/Java底层基础面经" },
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
  ],
};

export default sidebar;
