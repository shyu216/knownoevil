if(!self.define){let e,s={};const a=(a,r)=>(a=new URL(a+".js",r).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(r,i)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(s[d])return;let f={};const l=e=>a(e,d),b={module:{uri:d},exports:f,require:l};s[d]=Promise.all(r.map((e=>b[e]||l(e)))).then((e=>(i(...e),f)))}}define(["./workbox-1ab968a5"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"assets/404.html-DIudIrdb.js",revision:"18168b13d10a6ad348608562ae4c51ba"},{url:"assets/app-CN86oT9x.js",revision:"79c5e0dd23637d7d810792d4ef85ea31"},{url:"assets/COMP90014.html-CPmpNU7F.js",revision:"fe451e2008fe822520ed976bff1e1d7a"},{url:"assets/COMP90018.html-B3Nf1vTI.js",revision:"338f771b7819edf24ec99772d186c422"},{url:"assets/COMP90042.html-vc_c5NLo.js",revision:"af3e49b86754adde90ab6028a4b11f96"},{url:"assets/COMP90044.html-CaZQYmKc.js",revision:"a8395b360067ba9ae80e1db7d4e2437e"},{url:"assets/COMP90054.html-C-jB6TWP.js",revision:"7b4afded10edc86fb89c0bb037d10254"},{url:"assets/COMP90077.html-Bon77x76.js",revision:"ba9f61437c7cc0cdfd157609fd9822b7"},{url:"assets/COMP90084.html-D2o2k9EQ.js",revision:"10b10660606807550a8536fb3c74cfda"},{url:"assets/disable.html-BYbUj9zB.js",revision:"43b88a50343db095a720fdee88c45900"},{url:"assets/encrypt.html-Rgh5akV1.js",revision:"d396ee685e403329139f5561ab226540"},{url:"assets/ENGG2780.html-mOBdO396.js",revision:"7aab8a7f48c310712f2139ca443af553"},{url:"assets/ESTR1005.html-YKyLL3og.js",revision:"849e46a9d4d86da15ac79d053b352e05"},{url:"assets/ESTR1006.html-Ct_CPz85.js",revision:"74b9644bd473713c07fc0a30fb059380"},{url:"assets/ESTR2004.html-GguEyJhX.js",revision:"b3510f6a7f502fd29bdfe7080916235d"},{url:"assets/ESTR2018.html-CuI82EeW.js",revision:"493d7875f78975e76ba06841235af053"},{url:"assets/GEOM90008.html-D0mog7Tu.js",revision:"7065d27590afa07e82127c3f7fb8e2c2"},{url:"assets/giscus-D-fkNSKD.js",revision:"9215a76234a985e12f7abb9d670bd6d1"},{url:"assets/index-DTEEl-sV.js",revision:"46a193641571106d3b7b43f9bc2a2735"},{url:"assets/index.html-C0v4PZ1h.js",revision:"593bc2058cd7472e2079fd5d0c41e63e"},{url:"assets/index.html-CennBWVH.js",revision:"aa2c0916b784ccfb11befbc730250a8d"},{url:"assets/index.html-Ch_GbJBE.js",revision:"ca5174550d541d1a160d177aa1607c5e"},{url:"assets/index.html-lAyuNDBc.js",revision:"0e3362946d561b429b0ff5ca12ae1005"},{url:"assets/layout.html-CGo-KUp9.js",revision:"1d0e413899593722e36621caeedab289"},{url:"assets/markdown.html-h5zx9jze.js",revision:"4cfcd3727ee8afcd784f866a5328830c"},{url:"assets/MATH1510.html-Bj4XcjSz.js",revision:"94c0b0151b1f4933861aba33478aa436"},{url:"assets/page.html-C1SXjRt8.js",revision:"51fc0ad4b62d6261ee15aa75d01145c0"},{url:"assets/photoswipe.esm-GXRgw7eJ.js",revision:"9252721b01cd263ae52f9296614a7ddb"},{url:"assets/plugin-vue_export-helper-DlAUqK2U.js",revision:"25e3a5dcaf00fb2b1ba0c8ecea6d2560"},{url:"assets/SearchResult-BgrlcYB3.js",revision:"f460d59876af591df669126ef47297cb"},{url:"assets/style-CXDAygSB.css",revision:"bba102cd9f4d1d12cdcbd5ea4e969a16"},{url:"404.html",revision:"6f5985fffd9bf66d7422a828de0a4c6e"},{url:"bachelor/ENGG2780.html",revision:"386e492566e7908d6a0bf24b1192380b"},{url:"bachelor/ESTR1005.html",revision:"52e290766fbcbc39b0dbbe83a6d374c5"},{url:"bachelor/ESTR1006.html",revision:"c9bb8a33ff531a785d27183bf4d74fae"},{url:"bachelor/ESTR2004.html",revision:"716b7bb8cce4a250653455fcb59557b3"},{url:"bachelor/ESTR2018.html",revision:"f44539ec7ed13e0da455a5b122a7dd95"},{url:"bachelor/index.html",revision:"7127d9ee0fe41948ac8aca971876e3e1"},{url:"bachelor/MATH1510.html",revision:"f0462900cff0cc0d098812e7e1fbda52"},{url:"demo/disable.html",revision:"236880cee2aabd406009343a184ce625"},{url:"demo/encrypt.html",revision:"9f8b807fada53689cf1f4bf6d88773b4"},{url:"demo/index.html",revision:"3e6dba4fc3118687639aabd8ffc9da0e"},{url:"demo/layout.html",revision:"bcb3d5292af56f9e8b3afdeb063f3dbd"},{url:"demo/markdown.html",revision:"79c85edbff4f06fe118fd74fd4f4b035"},{url:"demo/page.html",revision:"869494a078f97cf3e3bc44536b8e69a9"},{url:"index.html",revision:"ac552e161143ed6f1047fa0944955b17"},{url:"master/COMP90014.html",revision:"31849b344c7795a4f6db802e5849e3e1"},{url:"master/COMP90018.html",revision:"28c66c29bc3f36e63b7ef25b40995617"},{url:"master/COMP90042.html",revision:"ca4e530528b425b5fda0e38fdf085210"},{url:"master/COMP90044.html",revision:"42b11177c29258b1f6c6af43d4c78f82"},{url:"master/COMP90054.html",revision:"b2fa9763d7ba26665df8c63c92f88262"},{url:"master/COMP90077.html",revision:"5c02c863d26c55aaf34042da9e85af3b"},{url:"master/COMP90084.html",revision:"abf51324692e69430320f17604bb6ab4"},{url:"master/GEOM90008.html",revision:"81290a740606972b89dcbb6ed6df1a41"},{url:"master/index.html",revision:"2a87e12b63282856dbc6ffebf4a15af7"},{url:"android-chrome-192x192.png",revision:"b64a0f3ef497b1fecb6b672a673ee132"},{url:"android-chrome-512x512.png",revision:"d141dc083bf70954bcf0f6ea9b81816a"},{url:"apple-touch-icon.png",revision:"1dc99a85f1aae74051fe0f8dde5bd7cf"},{url:"favicon-16x16.png",revision:"439f947776b8cc37196a68595db0f6ab"},{url:"favicon-32x32.png",revision:"f097a7953306a48b9d07e85809560094"}],{}),e.cleanupOutdatedCaches()}));
