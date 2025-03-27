import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://shyu216.github.io/knownoevil/",

  author: {
    name: "Dale",
    url: "https://github.com/shyu216",
  },

  favicon: "/favicon.ico",

  iconAssets: "fontawesome-with-brands",

  logo: "https://github.com/shyu216.png",

  repo: "shyu216/knownoevil",

  docsDir: "src",

  // navbar
  navbar,

  // sidebar
  sidebar,

  editLink: false,

  footer: "A place to jot down the picked up.",

  displayFooter: true,

  fullscreen: true,

  blog: {
    description: "Causing chaos, drooling, and being adorable."
  },

  // metaLocales: {
  //   editLink: "Edit this page on GitHub",
  // },

  plugins: {
    // Note: This is for testing ONLY!
    // You MUST generate and use your own comment service in production.
    comment: {
      provider: "Giscus",
      repo: "shyu216/knownoevil",
      repoId: "R_kgDOMdAfIg",
      category: "Announcements",
      categoryId: "DIC_kwDOMdAfIs4ChUxR",
    },

    components: {
      components: ["Badge", "VPCard"],
    },

    readingTime: false,

    blog: true,

    // All features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      codetabs: true,
      component: true,
      demo: true,
      figure: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      mark: true,
      plantuml: true,
      spoiler: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      tasklist: true,
      vPre: true,

      // install chart.js before enabling it
      // chart: true,

      // insert component easily

      // install echarts before enabling it
      // echarts: true,

      // install flowchart.ts before enabling it
      // flowchart: true,

      // gfm requires mathjax-full to provide tex support
      // gfm: true,

      // install katex before enabling it
      // katex: true,

      // install mathjax-full before enabling it
      mathjax: true,

      // install mermaid before enabling it
      // mermaid: true,

      // playground: {
      //   presets: ["ts", "vue"],
      // },

      // install reveal.js before enabling it
      // revealJs: {
      //   plugins: ["highlight", "math", "search", "notes", "zoom"],
      // },

      // install @vue/repl before enabling it
      // vuePlayground: true,

      // install sandpack-vue3 before enabling it
      // sandpack: true,
    },

    searchPro: true,

    // install @vuepress/plugin-pwa and uncomment these if you want a PWA
    pwa: {
      favicon: "./favicon.ico",
      cacheHTML: true,
      cacheImage: true,
      appendBase: true,
      apple: {
        icon: "/apple-touch-icon.png",
        statusBarColor: "black",
      },
      manifest: {
        icons: [
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "SIHONG's Blog",
            short_name: "SIHONG's Blog",
            url: "/",
          },
        ],
      },
    },
  },
});
