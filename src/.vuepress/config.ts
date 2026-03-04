import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/knownoevil/",

  lang: "zh-CN",
  title: "SIHONG's Blog",
  description: "A place to jot down the picked up",

  head: [
    ["meta", { name: "msvalidate.01", content: "309C299B0A39578A647981D3072AE64F" }]
  ],

  theme,

  // 和 PWA 一起启用
  shouldPrefetch: false,
});