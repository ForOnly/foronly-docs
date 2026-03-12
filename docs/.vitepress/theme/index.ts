// .vitepress/theme/index.ts
import type { EnhanceAppContext } from "vitepress";
// import DefaultTheme from "vitepress/theme";
import DefaultTheme from "vitepress/theme-without-fonts";

import mediumZoom from "medium-zoom";
import "virtual:group-icons.css";
import { useRoute } from "vitepress";
import vitepressNprogress from "vitepress-plugin-nprogress";
import "vitepress-plugin-nprogress/lib/css/index.css";
import { nextTick, onMounted, watch } from "vue";
import components from "../components/index";
import "./index.scss";
export default {
  ...DefaultTheme,
  enhanceApp: (ctx: EnhanceAppContext) => {
    const { app } = ctx;
    Object.entries(components).forEach(([path, module]: any) => {
      const name = path.split("/").pop().replace(".vue", "");
      app.component(name, module.default);
    });
    vitepressNprogress(ctx);
  },
  setup() {
    const route = useRoute();
    const initZoom = () => {
      mediumZoom("[data-zoomable]", { background: "var(--vp-c-bg)" }); // 默认
      // mediumZoom(".main img", { background: "var(--vp-c-bg)" }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  },
};
