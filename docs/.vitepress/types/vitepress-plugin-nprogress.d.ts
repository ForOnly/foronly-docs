declare module "vitepress-plugin-nprogress" {
  import type { EnhanceAppContext } from "vitepress";

  /**
   * 初始化 VitePress 路由进度条
   * @param ctx VitePress 应用上下文
   */
  export default function vitepressNprogress(ctx: EnhanceAppContext): void;
}
