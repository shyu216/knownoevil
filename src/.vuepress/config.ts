import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/knownoevil/",

  lang: "en-US",
  title: "Know No Evil",
  description: "Somewhere to recap what you've learned",

  theme,

  // Enable it with pwa
  shouldPrefetch: false,
});
