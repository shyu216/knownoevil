if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,d)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let c={};const t=e=>a(e,r),l={module:{uri:r},exports:c,require:t};s[r]=Promise.all(i.map((e=>l[e]||t(e)))).then((e=>(d(...e),c)))}}define(["./workbox-1ab968a5"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"assets/404.html-BeyUVphC.js",revision:"11c7bcb4bdcedb2e29725409d748752b"},{url:"assets/app-R8G8ZUdo.js",revision:"15b5603d4493df0b956eace2b6599fe2"},{url:"assets/COMP90014.html-BGZ53e3M.js",revision:"ba43929b1a2bf5d54c0e2ec87b09f812"},{url:"assets/COMP90018.html---s55BKS.js",revision:"9300c28be6ff19516cd4ff64049a528a"},{url:"assets/COMP90042.html-QTf7SjjR.js",revision:"1d3a103b6be4ab9024644ad0333b9e04"},{url:"assets/COMP90044.html-DaAVUrC8.js",revision:"e8e2b64e451a4b513698ccc700279baa"},{url:"assets/COMP90054.html-2rovfluS.js",revision:"478ed1ac5cb04ce7d26a3f25eaad6979"},{url:"assets/COMP90077.html-C6FbDnZG.js",revision:"95751dcc4bac7ad04362c2c30a5ae1e0"},{url:"assets/COMP90084.html-S47baoQf.js",revision:"339517a6f49a604e5b4442540bf38a0c"},{url:"assets/ENGG2780.html-P_sf8pHd.js",revision:"dd2afb0ff57c631f67ad9690737cbde7"},{url:"assets/ESTR1005.html-IRJi5X8I.js",revision:"124bb689bb5945dc231227bfe4472b37"},{url:"assets/ESTR1006.html-8uGX9Ecz.js",revision:"2840c9462a8f8b0456ee22d3af651b0b"},{url:"assets/ESTR2004.html-CxPVIuvB.js",revision:"c8d5bfa08455c3fe613a5ce7143b0f68"},{url:"assets/ESTR2018.html-CL0nPJPi.js",revision:"d36ba1dabbf2dd8c88fde703a389d3cb"},{url:"assets/evm.html-DkbO0UEl.js",revision:"0f00d36c3920ea1f3130172b0642a65b"},{url:"assets/GEOM90008.html-CaFMsMOR.js",revision:"70a469009ffed8db078844e0fb9758a7"},{url:"assets/giscus-D-fkNSKD.js",revision:"9215a76234a985e12f7abb9d670bd6d1"},{url:"assets/hackathon.html-DjX1FL0e.js",revision:"cbed00aa4ae42f04503c8b1d5bb674a6"},{url:"assets/index-DTEEl-sV.js",revision:"46a193641571106d3b7b43f9bc2a2735"},{url:"assets/index.html-5YRQ-_ra.js",revision:"cd3bd29ab329b4fcdf7a8ee14985d7ae"},{url:"assets/index.html-aPeSll7L.js",revision:"246a7e0204e2485aa5694eac3520f2f4"},{url:"assets/index.html-B_-a55sO.js",revision:"9ee83e76816fb4ca34216a9a2d748dc4"},{url:"assets/index.html-B3XXvHwr.js",revision:"196f2cdfd2601d1ca117edd922c41d82"},{url:"assets/index.html-BCGI1CcM.js",revision:"1b940851d232e17aa800da8e4a62fff9"},{url:"assets/index.html-BdqP9z9e.js",revision:"b6aa1dffdcae3d4832784782e2454caf"},{url:"assets/index.html-BdZ2cxP3.js",revision:"dfb0fce6d3a62daab19d751e9bb60dd6"},{url:"assets/index.html-BfMzDrdp.js",revision:"5da43ab4691262837e98c6384da7b115"},{url:"assets/index.html-BJSpJ2UJ.js",revision:"a31c87245f06faae4f58d9b52bcea5ca"},{url:"assets/index.html-BmuOMD0Y.js",revision:"084b8587851dc6f73502e557a1074d53"},{url:"assets/index.html-BNZ4lhUN.js",revision:"5b707114e6045f4036effcc197413cca"},{url:"assets/index.html-BSaGNCR0.js",revision:"48579b6cda0c26dc75918bddf08c8dc9"},{url:"assets/index.html-Bthy6zHF.js",revision:"6127fc87a2d1c5012eefe1fe5d871674"},{url:"assets/index.html-BXNGj5Zl.js",revision:"452d3d1b1abb2008eea4481fed4bd1a3"},{url:"assets/index.html-BXq52ZK5.js",revision:"a50563dd898912b2899d61eb40237889"},{url:"assets/index.html-C_GrF7Sx.js",revision:"0403f3949e80baf68d8c4f45dba64c94"},{url:"assets/index.html-Ca98CPfj.js",revision:"f25e78ed66617fe22ff3744fb4acf138"},{url:"assets/index.html-CDy090pJ.js",revision:"be1cad1e560831652837abe5ea4ad04a"},{url:"assets/index.html-CEfDI47P.js",revision:"bc75b9098ebab5607e8bdd0c77a21a9b"},{url:"assets/index.html-CFIyJkV0.js",revision:"42699fa61f07107008f088041c793df9"},{url:"assets/index.html-ClbF7P4m.js",revision:"80ffdea79e07e89e83c56479abde6175"},{url:"assets/index.html-Cn-zam5s.js",revision:"4322b2612ae33210e222d866751b8272"},{url:"assets/index.html-CNiZDjaQ.js",revision:"4acee1d8b8082a1e7e8319f274c33cb5"},{url:"assets/index.html-CpeQwoVR.js",revision:"e37615793c51c4e8a28a21e2cf309e3f"},{url:"assets/index.html-CvrmBsVl.js",revision:"9887870bb9e3c7b60cf88cd115061ea7"},{url:"assets/index.html-CxR6Bb1_.js",revision:"3f840cff0b8a9e6cf7b67adc3c5c6470"},{url:"assets/index.html-D57nMyto.js",revision:"7f3fed7eabbfef47494dfd0b41e16503"},{url:"assets/index.html-D5SNQcu1.js",revision:"9ed77448cfa4208d768a9fe8995bbbc4"},{url:"assets/index.html-D881UomC.js",revision:"7588e55150bdec393ffe69ef56ebf34d"},{url:"assets/index.html-DbhEKpP4.js",revision:"737ec55af6ccdff25dc1c6e5d7db74ed"},{url:"assets/index.html-DeH8_uUP.js",revision:"ad5bfe73750ab2e74af14d23bd083b33"},{url:"assets/index.html-DHQWcKbh.js",revision:"b92e4944f194767cd92b4ab3b224b61e"},{url:"assets/index.html-DIbpducP.js",revision:"ad2e940795ef8c3c65f35de34dcc9dd6"},{url:"assets/index.html-DJscQ6K9.js",revision:"2bf4f23fbf15f4a9ade1a144fbef877a"},{url:"assets/index.html-DjTKaXhY.js",revision:"cfeae4ae37b8e28a4bf35337c8b2f1f9"},{url:"assets/index.html-DQyhAiyS.js",revision:"a9b0ec80d2f85017196ee99b5a624c93"},{url:"assets/index.html-dU0Yrz_4.js",revision:"9bc82aeaeb91a84a3119eadd9645bc8d"},{url:"assets/index.html-DZy7Nh5J.js",revision:"87efba179a3f5d2a92029ebbc11308f5"},{url:"assets/index.html-JZbHZh10.js",revision:"a5fb3674c9c2a9a88da44cd7508ba80c"},{url:"assets/index.html-MsAPXy5E.js",revision:"d7abf1cd91ab03d04e3e2948382a772a"},{url:"assets/index.html-rjjSfZ_T.js",revision:"116f036af8ba1c2db040c9149a033cfe"},{url:"assets/index.html-xFRvhO6P.js",revision:"86be71c6117dd995200a46d06bd47d60"},{url:"assets/MATH1510.html-CYz-gOGo.js",revision:"a19c526ec1875117598c6576ac94283b"},{url:"assets/photoswipe.esm-GXRgw7eJ.js",revision:"9252721b01cd263ae52f9296614a7ddb"},{url:"assets/plugin-vue_export-helper-DlAUqK2U.js",revision:"25e3a5dcaf00fb2b1ba0c8ecea6d2560"},{url:"assets/quantum_recources.html-DKoaOMcz.js",revision:"de033c66441cba1313a543e15b44ba17"},{url:"assets/quantum.html-DYGvwFm1.js",revision:"6f7191836a7f9e43d0978e9763c4ca03"},{url:"assets/SearchResult-C_J2WxOT.js",revision:"12eaee663ffadcdaf3edd2ee38cf2b00"},{url:"assets/style-CoPSD5xb.css",revision:"81dc247ec228504dd4b758749037411e"},{url:"assets/t-bc.html-ChuNpnlp.js",revision:"c3d1390ccac44744efff9b8ea750886d"},{url:"assets/t-bt.html-BnXD27Rg.js",revision:"097cf40352542c1e9f9a3df5dcfc017c"},{url:"assets/t-mc.html-ifr7AfrY.js",revision:"aeb49a792be6d7d44d6e4b36c754978d"},{url:"assets/t-mh.html-Bx7MyOWQ.js",revision:"212a942327574ae21de0e1ef1fd56e75"},{url:"assets/t-mr.html-CwMJbxIt.js",revision:"152376792a1c3d419fba9a4c4e9d4c76"},{url:"assets/t-to.html-HLt0Nmq8.js",revision:"ff5d4ef595ea81b867a2459563f83c66"},{url:"404.html",revision:"96ff81cff8f6d3ab28dfc1c50195ab6f"},{url:"article/index.html",revision:"6cdab1e16bb0c598868dd22de4e5a513"},{url:"bachelor/ENGG2780.html",revision:"2a6ce939238db543f1709319a0787934"},{url:"bachelor/ESTR1005.html",revision:"6d9a7e641078b1c064c4b58d1011f959"},{url:"bachelor/ESTR1006.html",revision:"5bc0e19f6abfec9cd8b72f3bfd5952d4"},{url:"bachelor/ESTR2004.html",revision:"f4c99aa34d66a181a7331b5f4bfd94a2"},{url:"bachelor/ESTR2018.html",revision:"0b143b9b58c0bb9f05e7c99e2587cbc1"},{url:"bachelor/index.html",revision:"3e2b1f250946f98d624653b003d6f9af"},{url:"bachelor/MATH1510.html",revision:"4b45f3972149c4ec2db58835cc545630"},{url:"category/24s1/index.html",revision:"ef2ea8b14e0769caa543107dadfe9b10"},{url:"category/24s2/index.html",revision:"160fb2e89aa060365ee391000a16a411"},{url:"category/25s1/index.html",revision:"702cd96b3c70aa3b0096116016f6d59b"},{url:"category/cuhk/index.html",revision:"b63981cd516cf68a43dd32f2aa79d194"},{url:"category/hackathon/index.html",revision:"cf6479194a4ba5713500308da3c50802"},{url:"category/index.html",revision:"629786a2480a15b862af436bf6dad248"},{url:"category/unimelb/index.html",revision:"ead65c87cfd1f61a87a9dd6f9e675e78"},{url:"index.html",revision:"6daedf72e327feefc0d90d603a325349"},{url:"master/COMP90014.html",revision:"495719c45bd9cde1e62bcacb2f1ae313"},{url:"master/COMP90018.html",revision:"59c21d840148911deb6e53dbc4f0e7ca"},{url:"master/COMP90042.html",revision:"5f3bc690f14b297cc350e840f624f58d"},{url:"master/COMP90044.html",revision:"b4cc797ec401fafebcb05bd8b36c04a9"},{url:"master/COMP90054.html",revision:"9ca639d38b291181cdca3c4c091b00df"},{url:"master/COMP90077.html",revision:"a957eb34ffd7b3f4b61bd5b399b6ed7b"},{url:"master/COMP90084.html",revision:"c04697a2c0c12ce0ed4cf9d04fe78f56"},{url:"master/COMP90084/index.html",revision:"d73cf12211db7a848148d0d98d3f5131"},{url:"master/COMP90084/quantum_recources.html",revision:"66057c637e4dd724afaad8975803ea0b"},{url:"master/COMP90084/quantum.html",revision:"feb389c74b1c82f3143e3b0347d919ed"},{url:"master/GEOM90008.html",revision:"17f987ac38cf4f2c93848ed7ad14a8c5"},{url:"master/index.html",revision:"9c1bc5feae2974eec5e0d03a640fe1d3"},{url:"master/paper/evm.html",revision:"1828356cc3648a6e6146e840479c27f7"},{url:"master/paper/index.html",revision:"22b70ac42c31c9ca4d61498e77c17f99"},{url:"master/topics/index.html",revision:"89a883da1ab4330e332c8439595c1101"},{url:"master/topics/t-bc.html",revision:"fbad32a42b3732a854f3800b03eca968"},{url:"master/topics/t-bt.html",revision:"9ef28ac4e77df107bf7283e84548ae6b"},{url:"master/topics/t-mc.html",revision:"8fe60f2e5b5c5f457264b2ab523622d1"},{url:"master/topics/t-mh.html",revision:"25c773607ab41e07c2543c31d8d9923d"},{url:"master/topics/t-mr.html",revision:"1fc557a32f1970a716cbf42a27d3480b"},{url:"master/topics/t-to.html",revision:"dd13ed3532823a582faf80a2e8b1e77c"},{url:"other/hackathon.html",revision:"33fae7790566d9f50b1e640402ef5461"},{url:"other/index.html",revision:"adc111e03cf3c8f97bae52df15edb702"},{url:"star/index.html",revision:"966a873eef6fddee03f1b744e1689893"},{url:"tag/algorithm/index.html",revision:"cf0edb16e3619bd0ca1b4366f7bd685c"},{url:"tag/artificial-intelligence/index.html",revision:"3c5753e7ee600c766aad2b20d5101951"},{url:"tag/bioinformatics/index.html",revision:"20772982b45b23bd8cdd25447b4eec82"},{url:"tag/complex-numbers/index.html",revision:"40d85f75eb3fb510ed49e8cbed58facf"},{url:"tag/computer-vision/index.html",revision:"d2e63e2a4bf44a1f009d7f3de117df6e"},{url:"tag/data-structures/index.html",revision:"aa4798d4adc463733a739f404e7cc650"},{url:"tag/database/index.html",revision:"15e3163aeed01c9171d47a26d27f26a3"},{url:"tag/deep-learning/index.html",revision:"62cce3f1f5861c7fe72198a9130606c9"},{url:"tag/event/index.html",revision:"e517470960332bf2bf10c88c7340cfa4"},{url:"tag/game-theory/index.html",revision:"90e5a216e2ab7114f16bdb19dc40a0e9"},{url:"tag/graph-theory/index.html",revision:"3acd914a74004d9a989ce6bad9402e23"},{url:"tag/image-processing/index.html",revision:"7331c476c0fc085ed746939500df8210"},{url:"tag/index.html",revision:"dad263f7c97661713532c6a3ff0062b7"},{url:"tag/linear-algebra/index.html",revision:"29d22b214fed4d3e50e365e77a099cc5"},{url:"tag/machine-learning/index.html",revision:"23dd5f7d9b334a97dde6177839585c74"},{url:"tag/mathematics/index.html",revision:"349c6282ad50d4e11a014e8caf518114"},{url:"tag/mobile/index.html",revision:"e8890d6ef614d1ae2bbea7b9bb073e7d"},{url:"tag/motion-magnification/index.html",revision:"7897f25608adf954b407241d2cba71a2"},{url:"tag/natural-language-processing/index.html",revision:"9465e76cc04d8e4745d73fc6a49d7d2f"},{url:"tag/planning/index.html",revision:"30c4e0accde15a8064f58725ee2ae704"},{url:"tag/principles/index.html",revision:"5c5d102787f08ce41645be693b6566f7"},{url:"tag/programming/index.html",revision:"63b5da313ca2d50b288e600756034ab2"},{url:"tag/quantum-computing/index.html",revision:"cdc5d96665f6a6908fe6589cafcfc3c3"},{url:"tag/reinforcement-learning/index.html",revision:"4f15eeea85c4eaed323f029c0f5b7222"},{url:"tag/research/index.html",revision:"d3e64948581a2fc07170c7c4974398cc"},{url:"timeline/index.html",revision:"eb00550235e406a00fcace3432c49034"},{url:"android-chrome-192x192.png",revision:"fafda387d2096d05f91c2a61a97aae8d"},{url:"android-chrome-512x512.png",revision:"6adcbc0093138fe376486f88f7b9576a"},{url:"apple-touch-icon.png",revision:"d925f286f134e89b1ca7aebd0608aa83"},{url:"cuhk.jpg",revision:"1a7abd1a834e2831bd10b44f1ede27ae"},{url:"favicon-16x16.png",revision:"efa1ab057e0ae97b6cbf7edc05700bce"},{url:"favicon-32x32.png",revision:"13faa7d01d5cb4eb07a97372a2186c91"}],{}),e.cleanupOutdatedCaches()}));
