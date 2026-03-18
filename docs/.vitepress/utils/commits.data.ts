// .vitepress/theme/commits.data.ts

import { TimelineData, GitHubCommitItem } from "../types/types";

// ================= 类型定义 =================

/**
 * 解析 commit message（语义化提交）
 */
function parseCommitMessage(message: string): {
  tag: string;
  title: string;
} {
  const match = message.match(/^(\w+)(?:\(.+\))?:\s*(.*)$/);

  return {
    tag: match ? match[1].toUpperCase() : "COMMIT",
    title: match ? match[2] : message,
  };
}

/**
 * 格式化日期 yyyy-MM-dd
 */
function formatDate(dateStr: string): string {
  return new Date(dateStr).toISOString().split("T")[0];
}

// ================= 主逻辑 =================

export default {
  async load(): Promise<TimelineData[]> {
    const owner = "ForOnly";
    const repo = "foronly-docs";
    const url = `https://api.github.com/repos/${owner}/${repo}/commits?per_page=100`;

    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "VitePress-Timeline-App",
        },
      });

      if (!response.ok) {
        throw new Error(`GitHub API 请求失败: ${response.status}`);
      }

      const commits: unknown = await response.json();

      if (!Array.isArray(commits)) {
        console.warn("GitHub API 返回异常:", commits);
        return [];
      }

      return (commits as GitHubCommitItem[]).map((item) => {
        const { tag, title } = parseCommitMessage(item.commit.message);
        const shortSha = item.sha.slice(0, 7);

        return {
          time: formatDate(item.commit.author.date),
          tag,
          title,
          content: `SHA: <a href="${item.html_url}" target="_blank"><code>${shortSha}</code></a>`,
          link: item.html_url,
        };
      });
    } catch (error) {
      console.error("获取 GitHub Commits 失败:", error);
      return [];
    }
  },
};
