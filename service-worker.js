if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,r)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(s[d])return;let c={};const t=e=>a(e,d),b={module:{uri:d},exports:c,require:t};s[d]=Promise.all(i.map((e=>b[e]||t(e)))).then((e=>(r(...e),c)))}}define(["./workbox-1ab968a5"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"assets/404.html-HQqIw1PQ.js",revision:"3fd38a660ea780a304bc8710e2cf9cfb"},{url:"assets/app-DTsh1Wlb.js",revision:"94d96ec87477bf01f0773e77a154f88c"},{url:"assets/COMP90014.html-BtR3xr2e.js",revision:"c946a3c83bf7f0268fdb0d66df9c1063"},{url:"assets/COMP90018.html-BzwvR5gc.js",revision:"a6e5c8d5c3b72bbe7918787600f607f1"},{url:"assets/COMP90042.html-B9P4EKTW.js",revision:"7317e7837a2018dc4b885ed5879d8a19"},{url:"assets/COMP90044.html-_4K1JWK2.js",revision:"aa6ce09f2efbaad07937fb800b1d4772"},{url:"assets/COMP90054.html-Gs9lfujD.js",revision:"2a1339a9ff331240284dfceee72f53df"},{url:"assets/COMP90077.html-Bsz4dSwE.js",revision:"2570227937ddaf62e402d9efaf0b3de9"},{url:"assets/COMP90084.html-DENrgzy2.js",revision:"9cba6bf7719100b015f6082b53359325"},{url:"assets/ENGG2780.html-Cj8lLNYf.js",revision:"aad5f1c1bb53a3c3a7723a716db4f0c2"},{url:"assets/ESTR1005.html-BIMUV0Mr.js",revision:"7613b3395f839a07b2c71a52c4f96e57"},{url:"assets/ESTR1006.html-Ds5z-afl.js",revision:"e79fe60418345b16a50cd28c4d4101af"},{url:"assets/ESTR2004.html-eCL5osCE.js",revision:"7dbb0290324d51cac9b084700100f3c1"},{url:"assets/ESTR2018.html-E0KJ_MzW.js",revision:"6a8059bb5b5111fccf22b425a22194c8"},{url:"assets/evm.html-Bzf9VpAP.js",revision:"5910a5d0539778120f0886c3e09950e5"},{url:"assets/GEOM90008.html-BAbrGdmm.js",revision:"3805077fd10bacd39c43319c6858976e"},{url:"assets/giscus-D-fkNSKD.js",revision:"9215a76234a985e12f7abb9d670bd6d1"},{url:"assets/hackathon.html-Z3cQr-aW.js",revision:"8d3c99344613ccebe49a50aa80a4070c"},{url:"assets/index-DTEEl-sV.js",revision:"46a193641571106d3b7b43f9bc2a2735"},{url:"assets/index.html-34joXPOl.js",revision:"032b4de718f5fcd3cd85aac067c8f05e"},{url:"assets/index.html-B1LNecpX.js",revision:"33a2c9b5f278e49da77eace0cea0740b"},{url:"assets/index.html-B2KcnwRx.js",revision:"799051fd2bb95131771b18754ebeee8d"},{url:"assets/index.html-B7860kIK.js",revision:"949c9fe98e8b6a581218d61530e60ee7"},{url:"assets/index.html-BazrhDod.js",revision:"4a8d9e9a5440f2ac552753d9798015dd"},{url:"assets/index.html-BfMLOd00.js",revision:"4974c33debc5b93c8d63d813517edc84"},{url:"assets/index.html-BLs-6xdt.js",revision:"ba95f38ab31ba1f88aa9c0e2ebd69a8c"},{url:"assets/index.html-BlVh5b4W.js",revision:"b5e0fa0234c4c3ff795256205408a0c6"},{url:"assets/index.html-BONceXTL.js",revision:"d570925e3bf7c5bf3a6d6be3dabe3848"},{url:"assets/index.html-BrCo9opQ.js",revision:"3673622bd008c76cb2b43163b9e9875d"},{url:"assets/index.html-BsbAHTj3.js",revision:"75e40c192fc8cbc505f41b764ebd4e83"},{url:"assets/index.html-BsUsGB6f.js",revision:"db75e5d6ff5620fcf74178e44e3e7b1e"},{url:"assets/index.html-BVJ7NNZh.js",revision:"0b6cd55557cc04ca65dc825f144df7da"},{url:"assets/index.html-Bx2986Ve.js",revision:"b747c25e2533e42c9023feb2c8f94133"},{url:"assets/index.html-C4uHBLWq.js",revision:"40373d3888b97d851fafade50d035245"},{url:"assets/index.html-Cc7s_zkH.js",revision:"1c267fd3069fe757019af92e5cb1f2b7"},{url:"assets/index.html-Ce4RXbvo.js",revision:"dc41dd91df60f4dc45c0ac227cdd997b"},{url:"assets/index.html-CG3YGeR0.js",revision:"2b045ac0c46712b749a946ae226488ba"},{url:"assets/index.html-CHh8xXq-.js",revision:"6b41884c7000f4d8f6a32744aa3e6c21"},{url:"assets/index.html-CNNpSDvb.js",revision:"e6b3071e0febdf0a9149c7e65b43ffe3"},{url:"assets/index.html-CqPcNEAb.js",revision:"816b13149a84a0b6b283367081f19e01"},{url:"assets/index.html-CR8bkBjL.js",revision:"1582bf22f3d11466255e80246dcf3035"},{url:"assets/index.html-CuPKE7NG.js",revision:"705ecf99de30a4c97a3434efe5e297f9"},{url:"assets/index.html-D00a0VCi.js",revision:"412aebf36efe0f6a36622e3e2584cae2"},{url:"assets/index.html-D6RMOOBW.js",revision:"8d1a7f93b0694cd88316dbb78b0e402b"},{url:"assets/index.html-D991sU7T.js",revision:"3863ed63633ab8bb2bf403a54b70aa5e"},{url:"assets/index.html-DAAQUAyD.js",revision:"ad2777d733af540e7ea70370128fb093"},{url:"assets/index.html-DfZNT_3-.js",revision:"2c5e31df9c5106af12f16fe007a7f52a"},{url:"assets/index.html-DuECh6Mk.js",revision:"5be4018c99cd3f66b1ed077ca57b5a0b"},{url:"assets/index.html-Dyv75u2T.js",revision:"0c015783b8e7d65cd81c8075f2e208ec"},{url:"assets/index.html-DzLHcJfY.js",revision:"cad2242cafc005dfe2157a39ef95d199"},{url:"assets/index.html-FrTOAZJv.js",revision:"9fdd8b15f237df6eda67174462e60489"},{url:"assets/index.html-HXq4K97K.js",revision:"abf9af87e1d02f31d4772ca70c3b50b6"},{url:"assets/index.html-KYxOSso5.js",revision:"a9e12944e90abda20784fb9e826f7508"},{url:"assets/index.html-M_jhPHuL.js",revision:"a0643bf0a92ffb0f752033f93522ae5e"},{url:"assets/index.html-N9la3AG7.js",revision:"7dde5c333eae7d12668e6ccc996711e7"},{url:"assets/index.html-Nb9wpgE1.js",revision:"78f0556dc95428ba1b65cdceb508d96a"},{url:"assets/index.html-OsKSSppc.js",revision:"52c5a51889410efc0ef563d5279d500e"},{url:"assets/index.html-sRtpTaKo.js",revision:"c82e24cdb3ace4141823baf0aa46b214"},{url:"assets/index.html-T8e3l-kF.js",revision:"c5f6fb935a1b6ed22785842d8ff0bb55"},{url:"assets/index.html-TaPIvgPI.js",revision:"c126a586659eb7134cf158509b6f2d53"},{url:"assets/index.html-W8W65QR0.js",revision:"36f5972da24394c5fbf024f87e6af803"},{url:"assets/MATH1510.html-DdonRW2j.js",revision:"9cc89322503bb03b8931a8cac45c08dc"},{url:"assets/photoswipe.esm-GXRgw7eJ.js",revision:"9252721b01cd263ae52f9296614a7ddb"},{url:"assets/plugin-vue_export-helper-DlAUqK2U.js",revision:"25e3a5dcaf00fb2b1ba0c8ecea6d2560"},{url:"assets/quantum_recources.html-BrRWzEpH.js",revision:"693be71e790b0319030ab887ac430bea"},{url:"assets/quantum.html-Cg4U_aBU.js",revision:"a65b7fb536c0e7a4a02a66fbbe189f2b"},{url:"assets/SearchResult-BE72mUrx.js",revision:"5c1229c33b3bcc6a28a31929349f954e"},{url:"assets/style-CoPSD5xb.css",revision:"81dc247ec228504dd4b758749037411e"},{url:"assets/t-bc.html-lOhyPd42.js",revision:"45c5805a5c7109b2dc2d79f43cadc3bc"},{url:"assets/t-bt.html-DB98Fwxz.js",revision:"9871761ef6e1674d444bfb231ce0cf9a"},{url:"assets/t-mc.html-Bd-Wlb10.js",revision:"f557de94e19ee2f28480173e3f39e632"},{url:"assets/t-mh.html-XAUlnOAp.js",revision:"92d1c1325709e06a4ebb1a5d82b0c619"},{url:"assets/t-mr.html-DL37V-bK.js",revision:"e9e87bf8a50af1568bb039e63e28cef4"},{url:"assets/t-to.html-bL1J5Hbr.js",revision:"121a446e9b58b6e86b250601905f7efb"},{url:"404.html",revision:"cf4bce971e4953e2707bd2ec83229f28"},{url:"article/index.html",revision:"b669795e0d2fcd3e7a4048f29c875a14"},{url:"bachelor/ENGG2780.html",revision:"430d7525a3b44b4a6f900864cfd6bb4f"},{url:"bachelor/ESTR1005.html",revision:"0855a0a8bd2c08390311a534ebb45b2a"},{url:"bachelor/ESTR1006.html",revision:"1e14f80348e24a5b8bb2b84c0218f713"},{url:"bachelor/ESTR2004.html",revision:"d6a0403189aecd7df16d1add059d9a7d"},{url:"bachelor/ESTR2018.html",revision:"c90669c6afe16ccb6004615a3060bf32"},{url:"bachelor/index.html",revision:"e4189ccb75e7fda689093ed619be33f6"},{url:"bachelor/MATH1510.html",revision:"2f79a352b0a1e343a3426cd3f12622e3"},{url:"category/24s1/index.html",revision:"3527eda396d63b0bf344b73681e58fde"},{url:"category/24s2/index.html",revision:"9c885f8264f2ce1c0efa21a9b15e7bac"},{url:"category/25s1/index.html",revision:"b7d97daee2d9416abf5cfa5050feb7d2"},{url:"category/cuhk/index.html",revision:"6148e48d89ed1208afadf85dc97ff36b"},{url:"category/hackathon/index.html",revision:"6adc80cc09adbd0ce488b2bc6bcae6ff"},{url:"category/index.html",revision:"4bdd36f236ab0e3a1fffd4de20b7f3ef"},{url:"category/unimelb/index.html",revision:"926b524d0d27397f5d29e1d6fb761cb1"},{url:"index.html",revision:"8b93b56a00aa582ed98f0ede40a16e38"},{url:"master/COMP90014.html",revision:"8727b664dd5df09e239b67c4d8f0971c"},{url:"master/COMP90018.html",revision:"1801424621f69182431799e2b68e578f"},{url:"master/COMP90042.html",revision:"11d80120f4a91db0e543f95781d843d7"},{url:"master/COMP90044.html",revision:"01e23fb8e591b37a20821bfb86e4f67c"},{url:"master/COMP90054.html",revision:"0eec496fa64c154b77b2c365d56ca39d"},{url:"master/COMP90077.html",revision:"a496a25e5aa4cd422bfa39f86ec4a3a1"},{url:"master/COMP90084.html",revision:"fcd886400eae494fb6747ca9b52d0817"},{url:"master/COMP90084/index.html",revision:"b9c0eaaebc5b14945ea088e33130ef0e"},{url:"master/COMP90084/quantum_recources.html",revision:"776ecab8c325c586acd6291999d146b6"},{url:"master/COMP90084/quantum.html",revision:"8390fafd4a71c887ee2181256b4078b2"},{url:"master/GEOM90008.html",revision:"8bd6f31bae6e1fb6d0557dbd723f3129"},{url:"master/index.html",revision:"4030e7323e0e7da600ec9bd34c6b99d3"},{url:"master/paper/evm.html",revision:"31915810b73482729c18f5428e5d0d02"},{url:"master/paper/index.html",revision:"18e3f51984649c661063037e504c5bff"},{url:"master/topics/index.html",revision:"b513012065d2e0a7bda0614b8bdcb349"},{url:"master/topics/t-bc.html",revision:"0b218f9377add352ac642fa6f066de44"},{url:"master/topics/t-bt.html",revision:"33edef063fa2829a0bbf4b129870bd90"},{url:"master/topics/t-mc.html",revision:"b6382f0ac73f7071be58f430cd693b2b"},{url:"master/topics/t-mh.html",revision:"9186cef16ab3f37a11727a62aade87fe"},{url:"master/topics/t-mr.html",revision:"1d7a15a5a29fcb3a88ba210f2e9eea94"},{url:"master/topics/t-to.html",revision:"c8258d4085b3246c4525f09ca0cdc6e3"},{url:"other/hackathon.html",revision:"55521361a7ed3685333989fe304b9148"},{url:"other/index.html",revision:"969f5bedefb227d18e5b9ae64427e0b0"},{url:"star/index.html",revision:"31ba23f9e84064464c544fec64c44ae1"},{url:"tag/algorithm/index.html",revision:"bdccb0061b74adc7e3410b1be6d1c5d5"},{url:"tag/artificial-intelligence/index.html",revision:"1ab4c6089f19a31b92d50b736f7fbd6a"},{url:"tag/bioinformatics/index.html",revision:"3c5df8cc55de1e09915be1fbc8b94468"},{url:"tag/complex-numbers/index.html",revision:"346279cef2d772e6bde629ee8dfe875e"},{url:"tag/computer-vision/index.html",revision:"9bd0a898ab766746b0544a6add464504"},{url:"tag/data-structures/index.html",revision:"0e463c6c65b5c2dcf6c9c9a005aaed5f"},{url:"tag/database/index.html",revision:"22e50901f6a894a48b7359efd03eba87"},{url:"tag/deep-learning/index.html",revision:"f55c2cb3b2e7e133b480617d36250724"},{url:"tag/event/index.html",revision:"57a3c27c8ad654dcff43657f9d55e6f7"},{url:"tag/game-theory/index.html",revision:"99630528c1e852c746bdd8386d356cd4"},{url:"tag/graph-theory/index.html",revision:"32bd780696b58943a394edeedcda290b"},{url:"tag/image-processing/index.html",revision:"d3672a6858e6cd40fc714e59589d5956"},{url:"tag/index.html",revision:"9f681ec033b0a3421b0be6122e4779bd"},{url:"tag/linear-algebra/index.html",revision:"c6c4201a81e98bf6e8e213f11df9f90d"},{url:"tag/machine-learning/index.html",revision:"627a2241897777cf6ebba0c6fda97ac7"},{url:"tag/mathematics/index.html",revision:"a20745f073c2be1fb3bd2dffd8696ec2"},{url:"tag/mobile/index.html",revision:"45a7cdc24aa665ba3bff5c68585a2b0d"},{url:"tag/motion-magnification/index.html",revision:"9b45da489fef315992c379adb1c9b5ef"},{url:"tag/natural-language-processing/index.html",revision:"4486ace1667e538a61e8fc06e47986c8"},{url:"tag/planning/index.html",revision:"697df2e1080c271ff507e097e4da4a04"},{url:"tag/principles/index.html",revision:"a980a0675fd690ed50c6f580ae3caebf"},{url:"tag/programming/index.html",revision:"89eb25f8ed6fd0f2a70fe107b40719a3"},{url:"tag/quantum-computing/index.html",revision:"13aa1e9aa3b1686957367894ea73e64e"},{url:"tag/reinforcement-learning/index.html",revision:"dcd8a0125f3d44582c32afa7c04ce407"},{url:"tag/research/index.html",revision:"94fb58510a3aa6c6ef640b7710c91659"},{url:"timeline/index.html",revision:"414153da08e101cd95b395551389c9bd"},{url:"android-chrome-192x192.png",revision:"fafda387d2096d05f91c2a61a97aae8d"},{url:"android-chrome-512x512.png",revision:"6adcbc0093138fe376486f88f7b9576a"},{url:"apple-touch-icon.png",revision:"d925f286f134e89b1ca7aebd0608aa83"},{url:"cuhk.jpg",revision:"1a7abd1a834e2831bd10b44f1ede27ae"},{url:"favicon-16x16.png",revision:"efa1ab057e0ae97b6cbf7edc05700bce"},{url:"favicon-32x32.png",revision:"13faa7d01d5cb4eb07a97372a2186c91"}],{}),e.cleanupOutdatedCaches()}));
