import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "Coursework",
      icon: "graduation-cap",
      collapsible: true,
      children: [
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
    },
    {
      text: "Other",
      icon: "comment",
      prefix: "other/",
      link: "other/",
      children: "structure",
    },
  ],
});
