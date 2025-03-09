import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/knownoevil/",

  lang: "en-US",
  title: "Know No Evil",
  description: "A place to jot down the picked up",

  theme,

  // Enable it with pwa
  shouldPrefetch: false,
});
