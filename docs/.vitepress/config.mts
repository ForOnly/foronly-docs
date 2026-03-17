import Tailwind from "@tailwindcss/vite";
import { defineConfig } from "vitepress";
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from "vitepress-plugin-group-icons";
import { pagefindPlugin } from "vitepress-plugin-pagefind";
import nav from "./configs/nav";
import sidebar from "./configs/sidebar";
// import autoAnchorPlugin from "./utils/autoAnchorPlugin";
function chineseSearchOptimize(input: string) {
  const segmenter = new Intl.Segmenter("zh-CN", {
    granularity: "word",
  });

  const words: string[] = [];

  for (const { segment, isWordLike } of segmenter.segment(input)) {
    if (isWordLike) {
      words.push(segment);
    }
  }

  return words.join(" ");
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/foronly-docs/",
  title: "当雨落街头",
  head: [["link", { rel: "icon", href: "/foronly-docs/favicon.ico" }]],
  description: "",
  cleanUrls: true,
  lastUpdated: true,
  markdown: {
    config(md) {
      // md.use(autoAnchorPlugin);
      md.use(groupIconMdPlugin);
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
        let htmlResult = slf.renderToken(tokens, idx, options);
        if (tokens[idx].tag === "h1") htmlResult += `<ArticleMetadata />`;
        return htmlResult;
      };
    },
    lineNumbers: true,
    image: {
      lazyLoading: true,
    },
  },
  vite: {
    plugins: [
      Tailwind(),
      groupIconVitePlugin(),
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
    logo: "/logo/head_logo.png",
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },
    // search: {
    //   provider: "local",
    // },
    outline: {
      level: "deep",
      label: "目录",
    },
    nav,
    sidebar,
    socialLinks: [
      { icon: "github", link: "https://github.com/ForOnly/foronly-docs" },
    ],
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    footer: {
      message: "如有转载或 CV 的请标注本站原文地址",
      copyright: "Copyright © 2026 foronly",
    },
  },
});
