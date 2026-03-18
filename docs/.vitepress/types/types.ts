// 单条 Commit 数据（对外使用）
export interface TimelineData {
  time: string;
  tag: string;
  title: string;
  content: string;
  link?: string;
}

// GitHub API 返回结构（只定义用到的字段）
export interface GitHubCommitItem {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
}
