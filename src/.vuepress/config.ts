import { defineUserConfig } from "vuepress";
import { searchPlugin } from '@vuepress/plugin-search'

import theme from "./theme.js";

export default defineUserConfig({
  base: "/knownoevil/",

  lang: "en-US",
  title: "SIHONG's Blog",
  description: "A place to jot down the picked up",

  theme,

  // 和 PWA 一起启用
  shouldPrefetch: false,
});