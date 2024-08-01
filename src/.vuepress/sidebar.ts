import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "CUHK",
      icon: "book",
      prefix: "bachelor/",
      link: "bachelor/",
      children: "structure",
    },
    {
      text: "UniMelb",
      icon: "book",
      prefix: "master/",
      link: "master/",
      children: "structure",
    },
  ],
});
