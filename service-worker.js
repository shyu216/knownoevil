if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,r)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(s[d])return;let c={};const t=e=>a(e,d),l={module:{uri:d},exports:c,require:t};s[d]=Promise.all(i.map((e=>l[e]||t(e)))).then((e=>(r(...e),c)))}}define(["./workbox-1ab968a5"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"assets/404.html-CBNgd4e4.js",revision:"953d1b5ee98ddfcd29d9ee1c90411d1f"},{url:"assets/app-pk8RGC_3.js",revision:"84a3a2e0d5cef15a3b2851ed7188fb7b"},{url:"assets/COMP90014.html-DqAelQgW.js",revision:"689619199f8baa599f254f659b43e8b3"},{url:"assets/COMP90018.html-C2M68KjM.js",revision:"151ab0dbc788c856f21ca0935cb8c1bf"},{url:"assets/COMP90042.html-BDqWnH81.js",revision:"d8a6b0bb44510d7a91587dfea71680e9"},{url:"assets/COMP90044.html-naDFUV9k.js",revision:"cabfd73e025a8583f1b3fbdd57abbdd1"},{url:"assets/COMP90054.html-3nRPWD0x.js",revision:"62fae008b570ec79e602edaea9d11c48"},{url:"assets/COMP90077.html-CwSNYbBA.js",revision:"25c2fed569e1c745b10f286eae5a81f9"},{url:"assets/COMP90084.html-BXFq1K1d.js",revision:"16f68580285e4bbd355ddcdc13e4db0a"},{url:"assets/ENGG2780.html-DC5Iocao.js",revision:"20d74dfb12f19c0deabda383ef09ff74"},{url:"assets/ESTR1005.html-4O9reOdC.js",revision:"7488353893579eb7cdafb867fde71526"},{url:"assets/ESTR1006.html-OJnvzbFp.js",revision:"10355f4b04021735c215743c6d3e0a85"},{url:"assets/ESTR2004.html-BLI4QKMD.js",revision:"d784c31614b7038b944ec18860ae9a4b"},{url:"assets/ESTR2018.html-CqjJFOWr.js",revision:"7014a5bdf170f053032a107ce0bfc9bd"},{url:"assets/evm.html-Ckv4leCO.js",revision:"2eb4179e1d66cebc0c14823ea9d8b0e7"},{url:"assets/GEOM90008.html-BtSSGl35.js",revision:"51fcd80defb088d70cf6295bc378e20f"},{url:"assets/giscus-D-fkNSKD.js",revision:"9215a76234a985e12f7abb9d670bd6d1"},{url:"assets/hackathon.html-D8iYPRcb.js",revision:"9eaa8cf200f60422a360894020437509"},{url:"assets/index-DTEEl-sV.js",revision:"46a193641571106d3b7b43f9bc2a2735"},{url:"assets/index.html-_gN-cyNH.js",revision:"b1fb0614ffd3d4d8746fd25937ceba77"},{url:"assets/index.html-5tJjmae4.js",revision:"160ebb2320db303d7835f6406eb3fd19"},{url:"assets/index.html-7lT66DcA.js",revision:"c4c6b399b47fa697e29001139ea7262d"},{url:"assets/index.html-AbGAUwhc.js",revision:"8c775344dc42ba0826a39d78bd2e2ba6"},{url:"assets/index.html-B_6DDf-s.js",revision:"9d0f422e23d64307ef1728357a4bbc4e"},{url:"assets/index.html-B_x9saUR.js",revision:"7575a3f804e52eb3792c09f7814c0275"},{url:"assets/index.html-B8QkgruA.js",revision:"4f862bffd77fb66632dd567e617511da"},{url:"assets/index.html-BBc70NRC.js",revision:"d18d3611460a083948cb1ac1892f28a9"},{url:"assets/index.html-BCn5rP5j.js",revision:"5a74ad9eaca8bb153a67bd6389972efe"},{url:"assets/index.html-BGDM_FXs.js",revision:"357c37ccda6f6c579b2d6609e049d0b1"},{url:"assets/index.html-Bh5I7OEi.js",revision:"fe5f3e09a0a344ec0cb584746b1605a8"},{url:"assets/index.html-BkjXNHcS.js",revision:"d4c38fc1d128c9d0d7823506bc6910cd"},{url:"assets/index.html-BP7cESgE.js",revision:"f4473608d5adf700ddc83e11024bda4f"},{url:"assets/index.html-BSM2SQAU.js",revision:"5ba7674177ad25180fa6ea41c5a8d9a8"},{url:"assets/index.html-BzNlwbMJ.js",revision:"b6efd9da40b287e4b1ffd5b2784d3362"},{url:"assets/index.html-C4HJRU1F.js",revision:"f214e02f7a62b49da607b77141e0633b"},{url:"assets/index.html-C7Y1Ph5H.js",revision:"f68a931830623851f3ea0bbeeb4bc1b2"},{url:"assets/index.html-CAySVz-5.js",revision:"285bc50040eec309210d620d81098d72"},{url:"assets/index.html-Ce_b4q52.js",revision:"b11ae5f2a60464495a6f2960e1d01a71"},{url:"assets/index.html-CiO9VkXg.js",revision:"19220147c94d5615c0cf69a97eff1d89"},{url:"assets/index.html-CIZNZQ1q.js",revision:"b2f85eb8a02a7f72946bc35a0fde00fa"},{url:"assets/index.html-CnIO13Em.js",revision:"37c68d5f9f7032ef5f10c0921ff1c740"},{url:"assets/index.html-CQvTUifP.js",revision:"843f0a82ec2eba3ce12552f734ac5d95"},{url:"assets/index.html-CrJA4Jfw.js",revision:"33968c1c14d9c3c781e310c2bc12e1ba"},{url:"assets/index.html-CZuVGePi.js",revision:"60aec5c52a5fa0b49aa511933aa76140"},{url:"assets/index.html-D2h_pZBz.js",revision:"2651546cd2f7f1f81b0cc29881ed71e8"},{url:"assets/index.html-DDxdSQOl.js",revision:"6700d8c0f909c5f87004f393cd3f6768"},{url:"assets/index.html-DE8yIe4U.js",revision:"db2e7063e761e927c55322338ed27918"},{url:"assets/index.html-DRDMrlFn.js",revision:"5256e5a1202ec98ea5764030b15f964c"},{url:"assets/index.html-DSBiZZIp.js",revision:"de899a5c33f807c677fd92f5d606e88f"},{url:"assets/index.html-DXPaIp2o.js",revision:"11ead133717090dfc7657ea7cc60f199"},{url:"assets/index.html-DzOlbxwQ.js",revision:"c8e63ec3472bf9b9c519fa50aef98241"},{url:"assets/index.html-fHw5LwJp.js",revision:"3fc5510ce016dcc7d6fd3f41f2f5c5bb"},{url:"assets/index.html-FYsiJCUq.js",revision:"59112b6b12250fb7331100cab1f76975"},{url:"assets/index.html-H920LTM_.js",revision:"bb090f75b5be5405cdc18ef20e4de343"},{url:"assets/index.html-IDFh4DsB.js",revision:"5fcb06cf57c6a06b325ff768d5f11be2"},{url:"assets/index.html-Nftb1Nn6.js",revision:"283381fc98c2a9220519bb04cafacd93"},{url:"assets/index.html-p05oLC2a.js",revision:"e7470631616c247a2df52210969ea67f"},{url:"assets/index.html-P4bQU_dt.js",revision:"a89b65ddb032713bdab7767580e005e5"},{url:"assets/index.html-pmYRL9_-.js",revision:"1277507edd7d3096e9a86800ae9a31a7"},{url:"assets/index.html-QRRepOVK.js",revision:"99a24c8e61aa350aff76e27d2010966b"},{url:"assets/index.html-Rw92NoY8.js",revision:"b82a8dacb52443eb9753f7557aed6eb3"},{url:"assets/index.html-ST8D5Xbr.js",revision:"d74471c3f7ac1028af912a9d95f1349d"},{url:"assets/index.html-SxDxvBLT.js",revision:"31b409645aad0ce3b912856f26a3aca2"},{url:"assets/MATH1510.html-BDCmXWIb.js",revision:"fb2b4a16b8ea54fa6ace49f868aa327f"},{url:"assets/photoswipe.esm-GXRgw7eJ.js",revision:"9252721b01cd263ae52f9296614a7ddb"},{url:"assets/plugin-vue_export-helper-DlAUqK2U.js",revision:"25e3a5dcaf00fb2b1ba0c8ecea6d2560"},{url:"assets/qtcreator.html-CDCvHHzq.js",revision:"aa41d924af80e58509bf4950fd31136a"},{url:"assets/quantum_recources.html-xKve4YFP.js",revision:"7c5f56c7141af4c1e0e3aa7c601a694e"},{url:"assets/quantum.html-B3Nay9Ko.js",revision:"b8727bb2056f0c68599dde98e2668842"},{url:"assets/realsense.html-BkflPGe3.js",revision:"ce5ce889cb07b029a624e47860f61f44"},{url:"assets/SearchResult-DzlxGS8z.js",revision:"0d6bdf562df285b92ed865880946a856"},{url:"assets/style-YUSegNBu.css",revision:"32ed4ec6990b2f69824b2bee50ced100"},{url:"assets/t-bc.html-CTkcQ9zV.js",revision:"0d895c77836b6b955896279134bc952d"},{url:"assets/t-bt.html-DW-qnsc4.js",revision:"ca2486494a05aeabfa0d4611ed1ab0c7"},{url:"assets/t-mc.html-SQEc5nUH.js",revision:"3349dce653ea42284a5cb0b21abfbaea"},{url:"assets/t-mh.html-D5u81--m.js",revision:"9eb1c20067960f479c48223c8a2bb70b"},{url:"assets/t-mr.html-CSuG3f3O.js",revision:"eba98abb7f9cda548dc424285c3afe26"},{url:"assets/t-to.html-D8gffyib.js",revision:"2e4558c07b1e45782e53130c078533d8"},{url:"404.html",revision:"51d388988b010b1bc08bbf38ce083885"},{url:"article/index.html",revision:"c3e5d92cfde67ed95c52a73663965379"},{url:"bachelor/ENGG2780.html",revision:"6392a3c5ada0f0bccdf2c61f3feccf9b"},{url:"bachelor/ESTR1005.html",revision:"8858d121cb8fe10c451edbecb7b0ccb8"},{url:"bachelor/ESTR1006.html",revision:"a5153613b5d98a22a351bd488545b6f1"},{url:"bachelor/ESTR2004.html",revision:"99c1d49bd190db0d9288179a051d1827"},{url:"bachelor/ESTR2018.html",revision:"bdc085dae584f87fa6f4b36ff5516cd6"},{url:"bachelor/index.html",revision:"b546aa64cf46b0c96635c300e00d3904"},{url:"bachelor/MATH1510.html",revision:"6b0229bc6daa1beeccfde32af527c8a2"},{url:"category/24s1/index.html",revision:"d5f9c903f4c4b8eb5cbe5e079109dc11"},{url:"category/24s2/index.html",revision:"3654700c45f22cf1a3f4c655c366b533"},{url:"category/25s1/index.html",revision:"d621d94418dcb33eeefd81b1b34db9de"},{url:"category/cuhk/index.html",revision:"e67db60a019e20420c4f51d5cf862678"},{url:"category/hackathon/index.html",revision:"7804771b40c7ff7f6becb6af4d666159"},{url:"category/index.html",revision:"0992930c6d48e3e616c326432be22d98"},{url:"category/unimelb/index.html",revision:"af992a3ec3711447af173e1cf3ecb625"},{url:"index.html",revision:"6fc90b01258f85719ea19228d9d6b4f4"},{url:"master/COMP90014.html",revision:"e7c0786eb76517f0be047f92247b7d56"},{url:"master/COMP90018.html",revision:"87a99947fdd5253b86a89fa4bff0e0c5"},{url:"master/COMP90042.html",revision:"6befda54f7c4ec8e01f1401408d578d2"},{url:"master/COMP90044.html",revision:"9105177834254f519c614bd0e147d73f"},{url:"master/COMP90054.html",revision:"eaf363c7e7674313d83b9160c004714f"},{url:"master/COMP90077.html",revision:"6b57d94d63994d400625911cc3379827"},{url:"master/COMP90084.html",revision:"d6140616cb9383f11294bc9ef442f2fb"},{url:"master/COMP90084/index.html",revision:"90260abd2fe4a7db4ebf0acbb4d9766b"},{url:"master/COMP90084/quantum_recources.html",revision:"7f18f6337573f194321b4ea7d4fca85f"},{url:"master/COMP90084/quantum.html",revision:"ab6a7c85c6d74f725e0c17803fe40047"},{url:"master/GEOM90008.html",revision:"7458e619b5711464ffe27adaaa96dcf7"},{url:"master/index.html",revision:"b200988f861bd5d1d715e93a3ebe3547"},{url:"master/research/candidate_topics/index.html",revision:"2fcb1bf9d7978d36c1f31078a7a01151"},{url:"master/research/candidate_topics/t-bc.html",revision:"9b8bd45cbcbd6f52b3d2707e61d19fdc"},{url:"master/research/candidate_topics/t-bt.html",revision:"0539a0fcf30b31463bfc77f403a09b57"},{url:"master/research/candidate_topics/t-mc.html",revision:"f41498b8b792f70ba31ca9f7d1963788"},{url:"master/research/candidate_topics/t-mh.html",revision:"38cc8d679a86c49be521cf1d6810fb27"},{url:"master/research/candidate_topics/t-mr.html",revision:"a56753771f7736130b77c19fd53766c2"},{url:"master/research/candidate_topics/t-to.html",revision:"cc945865e5467e8c1334d50a3fca4b18"},{url:"master/research/index.html",revision:"c0d72a47a5ca223270051a1d9e57371c"},{url:"master/research/literature_review/evm.html",revision:"46e73568be55092dd8754558aa409362"},{url:"master/research/literature_review/index.html",revision:"d95f41682f863ae8abaf1432e3425457"},{url:"master/research/troubleshooting/index.html",revision:"24541d05dd9d722206f9f1ef39ddc6b2"},{url:"master/research/troubleshooting/qtcreator.html",revision:"acf9fae2b5eb5c6f4b94bcc96cc5b979"},{url:"master/research/troubleshooting/realsense.html",revision:"beacddb6a7ffde6c022b5ea69f3e63fe"},{url:"other/hackathon.html",revision:"ac5f55a404b0583ff4e0bc585c6b5d28"},{url:"other/index.html",revision:"9c6726c0eb5ccffa8fe78243a302c935"},{url:"star/index.html",revision:"389159e71829a3533f44f308c562e3ac"},{url:"tag/algorithm/index.html",revision:"c38e060a81f3958352c850f0f2d8668d"},{url:"tag/artificial-intelligence/index.html",revision:"a321446a4d4019627bf76de756059725"},{url:"tag/bioinformatics/index.html",revision:"fd3f867da30d3375b38a6945c7efc16e"},{url:"tag/complex-numbers/index.html",revision:"7f9cf35d8686628737766a72ff280ba7"},{url:"tag/computer-vision/index.html",revision:"2930f15201421a8940400da1da9c3e6b"},{url:"tag/data-structures/index.html",revision:"8bcff3af30e6ef51728a2b56cf9f0e20"},{url:"tag/database/index.html",revision:"5b262710be481805de4d29e1c14b34d5"},{url:"tag/deep-learning/index.html",revision:"268106047c69163328e9537b073caf89"},{url:"tag/event/index.html",revision:"91562267ccaf63c2d270ab96e335243e"},{url:"tag/game-theory/index.html",revision:"793f64a039bcadf0c9d80cb4a57d4cf2"},{url:"tag/graph-theory/index.html",revision:"a6029744ec3bef6174a295b301a58f33"},{url:"tag/image-processing/index.html",revision:"6428ced8063bbad112958512625d803e"},{url:"tag/index.html",revision:"2366810073d2ac522086d1eeeb645375"},{url:"tag/linear-algebra/index.html",revision:"189f7a8adac7a9b5f273af31871eb94d"},{url:"tag/machine-learning/index.html",revision:"a294d2b4a5c01f333cb795fe451f58c5"},{url:"tag/mathematics/index.html",revision:"b39433f194893bacfc1715dde52ae78b"},{url:"tag/mobile/index.html",revision:"e6396d27e3f7826b8a1e200f8a50de1f"},{url:"tag/motion-magnification/index.html",revision:"b4407de748d1e88b6fb9109b756cd516"},{url:"tag/natural-language-processing/index.html",revision:"46f6eb5e3fcb4b27ce2db11a19511880"},{url:"tag/planning/index.html",revision:"efe3a797b1aae42ea7470fabba10c76a"},{url:"tag/principles/index.html",revision:"efd35999e13221d653d2a700a69fbaba"},{url:"tag/programming/index.html",revision:"8c8e0664c575f693e36085591564182b"},{url:"tag/quantum-computing/index.html",revision:"19cdf128e21e60f63053eb5d13688a53"},{url:"tag/reinforcement-learning/index.html",revision:"51a64bd440f935b27988deebfa56b03c"},{url:"tag/research/index.html",revision:"cee3539fe5ece8ed1a7dd617646c335a"},{url:"timeline/index.html",revision:"1037d7088e9022ea97fdccc02db817e4"},{url:"android-chrome-192x192.png",revision:"d6147dc2b458fd536bde6548601b57fc"},{url:"android-chrome-512x512.png",revision:"e4cd529ff12faf1728e6b336c63721c3"},{url:"apple-touch-icon.png",revision:"d8de2c2e98238ed1f278c3edd9384ce1"},{url:"cuhk.jpg",revision:"1a7abd1a834e2831bd10b44f1ede27ae"},{url:"EVMFilterdemo.png",revision:"450e1ca2cb5fbf054f106ba2bbcef2ff"},{url:"EVMFTdemo.png",revision:"99d4ef966425dd9edc313c16e630416a"},{url:"favicon-16x16.png",revision:"f2303c1ee73aab67553520f575c7ef9a"},{url:"favicon-32x32.png",revision:"59092f79cae70a9ebd2908b9b1cee070"}],{}),e.cleanupOutdatedCaches()}));
