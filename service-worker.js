if(!self.define){let e,s={};const a=(a,r)=>(a=new URL(a+".js",r).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(r,i)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(s[d])return;let c={};const b=e=>a(e,d),f={module:{uri:d},exports:c,require:b};s[d]=Promise.all(r.map((e=>f[e]||b(e)))).then((e=>(i(...e),c)))}}define(["./workbox-1ab968a5"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"assets/404.html-DWmcexOq.js",revision:"d1ca31c91ab1087334d00bd0e87eff66"},{url:"assets/app-lQi_F7J1.js",revision:"f4890f50b6c03773d0663cbe028788c5"},{url:"assets/COMP90014.html-CmEqnNmU.js",revision:"ac063636933ae564151a89b9ed691f41"},{url:"assets/COMP90018.html-C0Sla5qo.js",revision:"1c23933e2d87bc1eaa90728fc00c5c84"},{url:"assets/COMP90042.html-CtT4vhxq.js",revision:"d8959cd39b5ffb7ea9582f11642c0c61"},{url:"assets/COMP90044.html-BpgOxQQr.js",revision:"f1ac325968493787d809c14cc094b698"},{url:"assets/COMP90054.html-2JDGrUZb.js",revision:"06f48b003596067bb083d1cdc40c3a82"},{url:"assets/COMP90077.html-N4EpU_je.js",revision:"9664fd583f1097bda37b3e7e61835d22"},{url:"assets/COMP90084.html-CbPaMvru.js",revision:"02369b4a565874ddce9869c451f253af"},{url:"assets/CSCI3180.html-DKO4oclG.js",revision:"4192ab9ec169bfea05f4df27a2676833"},{url:"assets/disable.html-BC7a388t.js",revision:"d54c715dfa34338623963ee7fa0f60e7"},{url:"assets/encrypt.html-CDyZ3zbQ.js",revision:"1f9bd55167e2228c94c4495d75aa00e2"},{url:"assets/ESTR1005.html-CttudSyf.js",revision:"41043df929b7964c68328e5796499f31"},{url:"assets/GEOM90008.html-BNk6APTD.js",revision:"d06b8a3704202fb79aa5a0811614989b"},{url:"assets/giscus-D-fkNSKD.js",revision:"9215a76234a985e12f7abb9d670bd6d1"},{url:"assets/image/advanced.svg",revision:"2934a573b64033bebb71f067ebc8d082"},{url:"assets/image/blog.svg",revision:"5686f361aca8bcf73522de225d09016d"},{url:"assets/image/box.svg",revision:"5f732c9705e288e8fb8ae6d2e5ce906a"},{url:"assets/image/features.svg",revision:"2eb292180d361e4af3f4bf411ef06062"},{url:"assets/image/github-dark.svg",revision:"8dcc6b5262f3b6138b1566b357ba89a9"},{url:"assets/image/github-light.svg",revision:"a0b00583d93c2f7084ad151ee0849934"},{url:"assets/image/layout.svg",revision:"db603c70eb017066ff30923ca5a2cd4a"},{url:"assets/image/markdown.svg",revision:"1a8b4476dae8f52cdd873d2b00fa27fb"},{url:"assets/index-DTEEl-sV.js",revision:"46a193641571106d3b7b43f9bc2a2735"},{url:"assets/index.html-B2Rfo1H7.js",revision:"25b3044b9c11aee31fbeb858c509905a"},{url:"assets/index.html-BgfP3JxF.js",revision:"be08db61dda798df30b7e94f9fb51bf5"},{url:"assets/index.html-BYdbylsa.js",revision:"4e131fdfaf67962973431ecaa0fb0cfa"},{url:"assets/index.html-ChP6DC0c.js",revision:"8c487477efda3473b667a03222a15477"},{url:"assets/layout.html-Cg9Igovh.js",revision:"6857ba33975d358d65e97c3d6c4b149f"},{url:"assets/markdown.html-DGq-DrDr.js",revision:"dc71ad821c7961c08565e5dd4e458e30"},{url:"assets/MATH1510.html-Bc3d-8D7.js",revision:"1ed13e2f010c83f6a74883075886fb10"},{url:"assets/page.html-Bt-4HVG9.js",revision:"30ffce7cae069a47bdb14d10fbcad345"},{url:"assets/photoswipe.esm-GXRgw7eJ.js",revision:"9252721b01cd263ae52f9296614a7ddb"},{url:"assets/plugin-vue_export-helper-DlAUqK2U.js",revision:"25e3a5dcaf00fb2b1ba0c8ecea6d2560"},{url:"assets/SearchResult-Ddra-qSo.js",revision:"f724feb5192fab90d32030a74a9724e0"},{url:"assets/style-pZS02Xde.css",revision:"5471e75fcd1fce65eb85dbddf286620c"},{url:"404.html",revision:"94bab952ee549e13c49a25d8fd4d27c5"},{url:"bachelor/CSCI3180.html",revision:"39e065ad134d3303778d7a946c9f0c40"},{url:"bachelor/ESTR1005.html",revision:"acf6be92981d7fbfb0d1f2814cea88db"},{url:"bachelor/index.html",revision:"a0d2592cb09e1eeb11e2961ad0c26696"},{url:"bachelor/MATH1510.html",revision:"8460853738faa6ae3f1346b972a1b3cf"},{url:"demo/disable.html",revision:"9936a6582a0a8745c19d5119f6ee203d"},{url:"demo/encrypt.html",revision:"8e4e2afee41cb57c0bf6f0bb9537d3af"},{url:"demo/index.html",revision:"8bfb6fdf02e5dfee78b2e2502f1837a9"},{url:"demo/layout.html",revision:"d18cc61ce4fbeda55bdd99321bd96d3a"},{url:"demo/markdown.html",revision:"7c7d316b2465a89236f64e4ca3b2a65f"},{url:"demo/page.html",revision:"a8e672668cadacfc4d7bad6c6cf3daa3"},{url:"index.html",revision:"b9de2f8bc00749ad82b245b7d402fb4d"},{url:"master/COMP90014.html",revision:"c916b436b18b711ef6ecf86929c6e027"},{url:"master/COMP90018.html",revision:"65ba0814da6d444c2a5eeffbf0782d5b"},{url:"master/COMP90042.html",revision:"c593ee05cdb409bf7b3ff268f114c6bb"},{url:"master/COMP90044.html",revision:"ace5c668c0f9a1028a623cf49fcafdd7"},{url:"master/COMP90054.html",revision:"f7a6f7f0a1bae274652d5449163c4c80"},{url:"master/COMP90077.html",revision:"c6c7c101de5e270f0b914f1a3423ccfc"},{url:"master/COMP90084.html",revision:"7f4f378741029187a771813947fc4bed"},{url:"master/GEOM90008.html",revision:"cb2b2b628d663766c182329a6a67e978"},{url:"master/index.html",revision:"65e7d89b477a276d44b00f4751726124"},{url:"assets/icon/guide-maskable.png",revision:"99cc77cf2bc792acd6b847b5e3e151e9"}],{}),e.cleanupOutdatedCaches()}));
