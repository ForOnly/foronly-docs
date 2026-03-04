import { defineConfig } from "vitepress";
import { pagefindPlugin } from "vitepress-plugin-pagefind";

function chineseSearchOptimize(input: string) {
  const segmenter = new Intl.Segmenter("zh-CN", { granularity: "word" });
  const result: string[] = [];
  for (const it of segmenter.segment(input)) {
    if (it.isWordLike) {
      result.push(it.segment);
    }
  }
  return result.join(" ");
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/foronly-docs/",
  title: "foronly-docs",
  description: "",
  lastUpdated: true,
  vite: {
    plugins: [
      pagefindPlugin({
        btnPlaceholder: "搜索",
        placeholder: "搜索文档",
        emptyText: "空空如也",
        heading: "共: {{searchResult}} 条结果",
        customSearchQuery: chineseSearchOptimize,
      }),
    ],
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: "local",
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Docs", link: "/guide" },
      // { text: "Examples", link: "/markdown-examples" },
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
          { text: "Java线程池", link: "/Java/Java线程池" },
          { text: "JUC经典面经", link: "/Java/JUC经典面经" },
          { text: "JVM经典面经", link: "/Java/JVM经典面经" },
        ],
      },
      {
        text: "MySql",
        items: [{ text: "MySql基础", link: "/mysql/MySql基础" }],
      },
      {
        text: "Redis",
        items: [
          { text: "redis基础", link: "/redis/redis基础" },
          { text: "redis业务场景", link: "/redis/redis业务场景" },
        ],
      },
      {
        text: "SpringBoot",
        items: [
          {
            text: "springboot经典面经",
            link: "/springboot/springboot经典面经",
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/ForOnly/foronly-docs" },
    ],
  },
});
