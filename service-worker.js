if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,r)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(s[d])return;let c={};const t=e=>a(e,d),l={module:{uri:d},exports:c,require:t};s[d]=Promise.all(i.map((e=>l[e]||t(e)))).then((e=>(r(...e),c)))}}define(["./workbox-1ab968a5"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"assets/404.html-D0-PBh0D.js",revision:"6f48493e179ac6f34ac6630b3b9ac83b"},{url:"assets/app-nh6SY-kT.js",revision:"32b7b5fa190d78e8c154885f9156d37c"},{url:"assets/COMP90014.html-CgF-fQDD.js",revision:"eb3e07791753d7043fb470a64bcc220f"},{url:"assets/COMP90018.html-BnMcxxLD.js",revision:"679bea342dd05b8a50f82729e8d8499c"},{url:"assets/COMP90042.html-IQrDhbRa.js",revision:"eddd8c1a4bd0c2d18275e79693f0dd5e"},{url:"assets/COMP90044.html-DLLImxA3.js",revision:"48eb528ad91d64930f6f4331769ce0b8"},{url:"assets/COMP90054.html-JiS59yUu.js",revision:"af28bf6e23b1fc187ac78518edc0449a"},{url:"assets/COMP90077.html-BBXRB18A.js",revision:"3316a9c318fd91a24902fccb021561d3"},{url:"assets/COMP90084.html-Z_sq9LFQ.js",revision:"88258454083209d40f853b4a5c455677"},{url:"assets/ENGG2780.html-B8jjTdVY.js",revision:"65efacb95feadceb0e0270f7fb7a5772"},{url:"assets/ESTR1005.html-D1PrLJjX.js",revision:"568fd64d61eaae6b90fa421f14be4002"},{url:"assets/ESTR1006.html-BZRpeEBB.js",revision:"140e2fac27b45257388b5efc5df1c45e"},{url:"assets/ESTR2004.html-C19qu3J1.js",revision:"c4d49b850e946bdb440364a501b020ae"},{url:"assets/ESTR2018.html-BgAkopn7.js",revision:"20247fb8032741d8ffb3c3fb4c10935f"},{url:"assets/evm.html-CzeOHnAo.js",revision:"daac8ee32d84151def38fec7c162a9c5"},{url:"assets/GEOM90008.html-uWKg8YJa.js",revision:"e703c569f61ccb29224ecd728dc9f126"},{url:"assets/giscus-D-fkNSKD.js",revision:"9215a76234a985e12f7abb9d670bd6d1"},{url:"assets/hackathon.html-bdLxHEJn.js",revision:"a20cecceeec4a1b844d3a9072e3945ef"},{url:"assets/index-DTEEl-sV.js",revision:"46a193641571106d3b7b43f9bc2a2735"},{url:"assets/index.html-6wlJLmGW.js",revision:"4e3a9a105a869badfe79441129d0a5bd"},{url:"assets/index.html-7oJp7-0C.js",revision:"9c8cdbac1e4ee5cf3f0647ab4075e7c9"},{url:"assets/index.html-9ezNF26V.js",revision:"36e5841bfca87ab215f1bea858e8d9a5"},{url:"assets/index.html-B1fUgIDQ.js",revision:"e34a36a6ba34193c6c27719d920f6999"},{url:"assets/index.html-B1vRHMIB.js",revision:"d58ec6e146116f441e52b19db4bdc095"},{url:"assets/index.html-B2Zs-rx1.js",revision:"17c55a650f7f1ab9e415aeecf4b52263"},{url:"assets/index.html-BBHKe7Is.js",revision:"f3fe1ce6832adc191a5647e967cc5cab"},{url:"assets/index.html-BM1d42pt.js",revision:"e4ace4a02b75ef11a296dbe2d9583c9e"},{url:"assets/index.html-BqTCHF20.js",revision:"655d3c18671c68be8413ba7507309c34"},{url:"assets/index.html-BqV-gzHf.js",revision:"8ed0b97bf4b2744c9b9e646ba5d52dd0"},{url:"assets/index.html-BXZHGTEO.js",revision:"532e3b2979822fb69dd381026172c56f"},{url:"assets/index.html-C4vuozhg.js",revision:"47f63764138db215d223a043f1221489"},{url:"assets/index.html-CandqQU5.js",revision:"0180fddec4a70b4b25838e6dcae3a6fc"},{url:"assets/index.html-Cauh-i7m.js",revision:"fd97c401238842852c3bc34c98b0075a"},{url:"assets/index.html-CI1rJMKb.js",revision:"2c38bdbfdcde4399699f858ea78f2241"},{url:"assets/index.html-CPyvOoZb.js",revision:"07f6ca830fc5f31bf435937c58419f52"},{url:"assets/index.html-CQ-NFbFq.js",revision:"406ee8f644107de43d7f27497dad3b0e"},{url:"assets/index.html-CquSrnMj.js",revision:"c97d0e9f031ff33d4fdfa126aaf3f52f"},{url:"assets/index.html-CQzfkrBN.js",revision:"3fcbe74e7dbb045ca8acf0b7b34e4f8b"},{url:"assets/index.html-Ct9hAzln.js",revision:"94908b6b456488d74ac0061788070d69"},{url:"assets/index.html-CVhw93RI.js",revision:"7ec4dfddf2fdba06b39a1de3279c65ca"},{url:"assets/index.html-Cy7FuWKM.js",revision:"3a4ebcb48d7682a487496e33cf124782"},{url:"assets/index.html-DD2fwT7K.js",revision:"79569d9bc50ebb2502b7f582060127b5"},{url:"assets/index.html-DdhEYeV2.js",revision:"133276123003e07d53b4fbbd1874a919"},{url:"assets/index.html-DElIgQGm.js",revision:"81259cdf6326090dc7d1480a74636d74"},{url:"assets/index.html-DfybA2os.js",revision:"d2d3986498528a16153a5b221edbb43b"},{url:"assets/index.html-DHuE4hW8.js",revision:"c37036e8efb440f6def92c53c23f0fe1"},{url:"assets/index.html-DKS3Doqh.js",revision:"3887c16076469c77b3c80de5a26d4e86"},{url:"assets/index.html-DMuAGapc.js",revision:"829f8883fab05dabefe30c07a335b625"},{url:"assets/index.html-DnkVWk_P.js",revision:"79c81450eb7baf5fea15c588c4a46e23"},{url:"assets/index.html-DoBvHURW.js",revision:"01a34306fe94e151a379b731b66e3bd7"},{url:"assets/index.html-DPpFXr_j.js",revision:"2cefa9a206781d1f0d1045e065b2600f"},{url:"assets/index.html-DrMhXL4j.js",revision:"2d4c5c6a8d64a2d3704d6e5afce6daff"},{url:"assets/index.html-DT43ZVYc.js",revision:"48cec295c592bf287aa01d3e437725ff"},{url:"assets/index.html-DZvtVeqL.js",revision:"1155d317efb663e768343c1bc2463f5c"},{url:"assets/index.html-eUI-ArYQ.js",revision:"112b30eaa273c1f55e638b1ebd4e1e98"},{url:"assets/index.html-F1PyO0zw.js",revision:"95217d72549153370b8f88ec9b049674"},{url:"assets/index.html-LlyJ-RRW.js",revision:"95c916181d0af4554bbbede54cbe5152"},{url:"assets/index.html-oNClX1na.js",revision:"9d6aabedc903a795df8635c64156b066"},{url:"assets/index.html-UcWNQCbs.js",revision:"47726cfab9423e6b1eab8ec4169788d1"},{url:"assets/index.html-v_xH0rrl.js",revision:"d1cf813777afa38d25c308e1d59613c3"},{url:"assets/index.html-x3TaFjkS.js",revision:"73873e45d0df3a49715275cfa0c0d47f"},{url:"assets/MATH1510.html-BOra9KEC.js",revision:"121d0ff2377803ae4994eb83c371bc35"},{url:"assets/photoswipe.esm-GXRgw7eJ.js",revision:"9252721b01cd263ae52f9296614a7ddb"},{url:"assets/plugin-vue_export-helper-DlAUqK2U.js",revision:"25e3a5dcaf00fb2b1ba0c8ecea6d2560"},{url:"assets/quantum_recources.html-cJu-W2Df.js",revision:"47b48f4ebf5a47ff1eb4af63f69d0024"},{url:"assets/quantum.html-D78mX649.js",revision:"0df6161aa1679b2c0459abd65d0a10a1"},{url:"assets/SearchResult-D-BhqurH.js",revision:"d1ee2bb4a9639e34a140ec6ab3c7fb0e"},{url:"assets/style-CoPSD5xb.css",revision:"81dc247ec228504dd4b758749037411e"},{url:"assets/t-bc.html-CcukBCmi.js",revision:"bc0ad789e1ae2b414307404e8a9d3d82"},{url:"assets/t-bt.html-CZ4x_-g2.js",revision:"b38e7f89c928400288c0e5f5fbd1af17"},{url:"assets/t-mc.html-CfPkXx6K.js",revision:"7d70a4a38256c0c5ae5af331b03f2fcb"},{url:"assets/t-mh.html-B6QWToGd.js",revision:"c5b3d3b5cd0fa2a8ee01bddfe7f26e77"},{url:"assets/t-mr.html-YVHJllDg.js",revision:"cb0a4c13dde50ae50923d3026f939ed2"},{url:"assets/t-to.html-DosjMdBu.js",revision:"7e6e2f71be5bcc2305a841d37ca104a0"},{url:"404.html",revision:"8d4236b2e615a73682de9a8875756071"},{url:"article/index.html",revision:"089c45261a5a9de21ef7efc6017bbe45"},{url:"bachelor/ENGG2780.html",revision:"55edca95b6743f431a38056bfb0c6c8d"},{url:"bachelor/ESTR1005.html",revision:"8c7f9487d92519228f0a7a730c48f936"},{url:"bachelor/ESTR1006.html",revision:"73ea8ff8442df237762e85fb1ed2f66c"},{url:"bachelor/ESTR2004.html",revision:"c6ca44943d79968066185bcff34490e3"},{url:"bachelor/ESTR2018.html",revision:"d32274d1992f1a34a5aed13a3887b0e4"},{url:"bachelor/index.html",revision:"038b64f9a2ab3ae17cdfa483d4437345"},{url:"bachelor/MATH1510.html",revision:"62cdb74862e0a3605679682ce0b7c6c3"},{url:"category/24s1/index.html",revision:"28f5a2bd74b2a2f0c2c4cc4935227af7"},{url:"category/24s2/index.html",revision:"a4b092490d17149c3292bfc7db4b040e"},{url:"category/25s1/index.html",revision:"97232015f38fd389fc4f8781d80cfdec"},{url:"category/cuhk/index.html",revision:"07aa09a219cec6bb80a0a1223f91e3a3"},{url:"category/hackathon/index.html",revision:"4873185fcac886171f28f769b6754f14"},{url:"category/index.html",revision:"ece8de9e0732bfa7728b2c58ef7788f9"},{url:"category/unimelb/index.html",revision:"4d967b384eee5385f9f5326ac37f47b4"},{url:"index.html",revision:"c656c5048b17a5380ba6ea38a3543b60"},{url:"master/COMP90014.html",revision:"e53c654c45361cc9335e859efaa6ffa7"},{url:"master/COMP90018.html",revision:"f385a15bcb864eae7e740b9a5ade8ff6"},{url:"master/COMP90042.html",revision:"81c68b6a5426528873de618ac82ac205"},{url:"master/COMP90044.html",revision:"58b05f59f20b3524d235bf56edc5406e"},{url:"master/COMP90054.html",revision:"0eb70ab5495e28a9d4773548a52eee18"},{url:"master/COMP90077.html",revision:"ee5a85fa78874be34cf59201ae11fe53"},{url:"master/COMP90084.html",revision:"aa79607aab77daef2509227a09eab7da"},{url:"master/COMP90084/index.html",revision:"4f0bbf4148a2f31d59a738fef2473d27"},{url:"master/COMP90084/quantum_recources.html",revision:"be6e0a497d37eecec66ed8d67d8b9a4b"},{url:"master/COMP90084/quantum.html",revision:"8bd4f08a5e7bc1ea6b73240b474be6d9"},{url:"master/GEOM90008.html",revision:"ad7cc468625d2172e74f8ed64bd58d14"},{url:"master/index.html",revision:"c638461287274d264bdf05879a11a5f3"},{url:"master/paper/evm.html",revision:"9981af340d208128058f328f0161b748"},{url:"master/paper/index.html",revision:"a80556ab22d85a9409a12bf9cc764fe7"},{url:"master/topics/index.html",revision:"0d4fe60dd11d4c1e5b124b43a099a8c9"},{url:"master/topics/t-bc.html",revision:"64213f3b9d04acf316342583836a2a6f"},{url:"master/topics/t-bt.html",revision:"6cdafd2f7f43e3772f63def3bc8efee2"},{url:"master/topics/t-mc.html",revision:"985752473a73713a95ed8bb5b964d082"},{url:"master/topics/t-mh.html",revision:"2763b823b1872c7cc5da07a6b2472185"},{url:"master/topics/t-mr.html",revision:"6c4c6da28d12b4e7fe63958829e56a36"},{url:"master/topics/t-to.html",revision:"8ba643b5de1976b7c354297ef82af888"},{url:"other/hackathon.html",revision:"cbb41861d9f5be8dee13c462755dca29"},{url:"other/index.html",revision:"9c2a591b25862e92b002a82fb1821729"},{url:"star/index.html",revision:"388e4761b3def56d6d7b8a0d6af27694"},{url:"tag/algorithm/index.html",revision:"d654d1e90a8f6dc2dce93ce4caa58644"},{url:"tag/artificial-intelligence/index.html",revision:"8b628d2978e4caf2922fa19751bd7f78"},{url:"tag/bioinformatics/index.html",revision:"ce20eb770ee957975a0390171cb47144"},{url:"tag/complex-numbers/index.html",revision:"0eae327f66e9c3fae4eb6cf30931a0c4"},{url:"tag/computer-vision/index.html",revision:"31b0c3f95668015483a4fcdd39f7edb1"},{url:"tag/data-structures/index.html",revision:"ff862d817a8a03fe117d6612556c2828"},{url:"tag/database/index.html",revision:"b4a88c902878aaca4e49263bf0ae3a5b"},{url:"tag/deep-learning/index.html",revision:"fd6502c90bf2e0f4f526259849179fbc"},{url:"tag/event/index.html",revision:"6a3410f22eb0bd678a1ab1ab605dfc67"},{url:"tag/game-theory/index.html",revision:"40cfe7bcdf80df9e12d5fdcc43805145"},{url:"tag/graph-theory/index.html",revision:"71fcae9925f2229b6b16f676a35a2e3a"},{url:"tag/image-processing/index.html",revision:"37a3664c7ec8d1da3823edc14acbebe9"},{url:"tag/index.html",revision:"c3eec00556ed0bbfc0a310d8a8244179"},{url:"tag/linear-algebra/index.html",revision:"719ea7301133ccb07902c57871deebeb"},{url:"tag/machine-learning/index.html",revision:"16a62d2b013cddb0cc770072edbb9e59"},{url:"tag/mathematics/index.html",revision:"03abcc9be68c05452feb107abc5ad0c2"},{url:"tag/mobile/index.html",revision:"f33571b60e37c0c0354ad1bb93e3f4a8"},{url:"tag/motion-magnification/index.html",revision:"ba85b9dbfe9d789e8fbdb07fa6f3ca58"},{url:"tag/natural-language-processing/index.html",revision:"6ba90e30b732008df3453742b327278c"},{url:"tag/planning/index.html",revision:"4a826f5e5eea0df02bf966f8805e41f7"},{url:"tag/principles/index.html",revision:"afb36fa05f3a988be96d8c5d467bbee3"},{url:"tag/programming/index.html",revision:"524849108acf87fb24456816e0409b57"},{url:"tag/quantum-computing/index.html",revision:"1b0f0ba7215f3af79cc54a55bdb82189"},{url:"tag/reinforcement-learning/index.html",revision:"4daf103d2223fb953c9a89719ce04ddd"},{url:"tag/research/index.html",revision:"4d50bc5a4ff9feb9ab0e88559238ccc2"},{url:"timeline/index.html",revision:"e408dc1976b6c1ee3d19639f2171d050"},{url:"android-chrome-192x192.png",revision:"fafda387d2096d05f91c2a61a97aae8d"},{url:"android-chrome-512x512.png",revision:"6adcbc0093138fe376486f88f7b9576a"},{url:"apple-touch-icon.png",revision:"d925f286f134e89b1ca7aebd0608aa83"},{url:"cuhk.jpg",revision:"1a7abd1a834e2831bd10b44f1ede27ae"},{url:"favicon-16x16.png",revision:"efa1ab057e0ae97b6cbf7edc05700bce"},{url:"favicon-32x32.png",revision:"13faa7d01d5cb4eb07a97372a2186c91"}],{}),e.cleanupOutdatedCaches()}));
