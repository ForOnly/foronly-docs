import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/foronly-docs/",
  title: "foronly-docs",
  description: "",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: "local",
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Docs", link: "/guide" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Guide",
        items: [{ text: "文档指南", link: "/guide" }],
      },
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
          { text: "Java底层基础面经", link: "/Java/Java底层基础面经" },
          { text: "JUC经典面经", link: "/Java/JUC经典面经" },
        ],
      },
      {
        text: "MySql",
        items: [{ text: "MySql基础", link: "/mysql/MySql基础" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
