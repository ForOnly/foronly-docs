import type { PluginSimple } from "markdown-it";

/**
 * 自动将文本匹配为标题锚点链接
 */
const autoAnchorPlugin: PluginSimple = (md) => {
  const headings: Record<string, string> = {};

  // 收集标题
  const originalHeadingOpen = md.renderer.rules.heading_open;
  md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
    const titleToken = tokens[idx + 1];
    const text = titleToken.content;

    // 生成 slug（和 VitePress 保持一致）
    const slug = text.trim().toLowerCase().replace(/\s+/g, "-");

    headings[text] = `#${slug}`;

    return originalHeadingOpen
      ? originalHeadingOpen(tokens, idx, options, env, self)
      : self.renderToken(tokens, idx, options);
  };

  // 替换正文文本
  const originalText = md.renderer.rules.text;
  md.renderer.rules.text = (tokens, idx) => {
    let content = tokens[idx].content;

    Object.keys(headings).forEach((title) => {
      const regex = new RegExp(`\\b${title}\\b`, "g");
      content = content.replace(regex, `[${title}](${headings[title]})`);
    });

    return content;
  };
};

export default autoAnchorPlugin;
