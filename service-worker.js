if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,r)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(s[d])return;let c={};const b=e=>a(e,d),t={module:{uri:d},exports:c,require:b};s[d]=Promise.all(i.map((e=>t[e]||b(e)))).then((e=>(r(...e),c)))}}define(["./workbox-1ab968a5"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"assets/404.html-mIT0Iexw.js",revision:"7bfb9657f3824dc56b7f0ba749aa49e4"},{url:"assets/app-Cb1RROb0.js",revision:"60cf21619f285947ae101fda8893930f"},{url:"assets/COMP90014.html-NIUEdyzc.js",revision:"5bae7e9f84cadaefde2d9b5f98b87d49"},{url:"assets/COMP90018.html-CrMJZzLo.js",revision:"b6b0dee6bb89786888ee119acad11460"},{url:"assets/COMP90042.html-D1Qw8SnG.js",revision:"5e1fd11be33b9704d5b232df8be62e8f"},{url:"assets/COMP90044.html-CA-SqVVE.js",revision:"11546a8ca40f1ffdb8fc1d78b18ef949"},{url:"assets/COMP90054.html-5HcvnLwb.js",revision:"720e0847b5d7f971f7996b4dcd57a0c2"},{url:"assets/COMP90077.html-3qbhTuUP.js",revision:"83022e9e7ce867b42d9a7dfb8a6e38f3"},{url:"assets/COMP90084.html-DqnN4xPr.js",revision:"84b921b1f6d36b9d6c8538759ebbbb5e"},{url:"assets/ENGG2780.html-Bq87rGUe.js",revision:"d9b6fd2b87b22c7926af86b89a1db412"},{url:"assets/ESTR1005.html-qWIXJocJ.js",revision:"a35393b053b2c670a8e80a7ca7d0af99"},{url:"assets/ESTR1006.html-Dh9wukQt.js",revision:"2360a54d0f550c91eef41f08982abae0"},{url:"assets/ESTR2004.html-DNa6n759.js",revision:"c3e2ae660dead90bac82d7cc97233bef"},{url:"assets/ESTR2018.html-DzSpOEQx.js",revision:"aac55c1d62663f13aca04a93f72ff04b"},{url:"assets/GEOM90008.html-CLsDvEgG.js",revision:"54cda443dc0e398982af319561c99cd5"},{url:"assets/giscus-D-fkNSKD.js",revision:"9215a76234a985e12f7abb9d670bd6d1"},{url:"assets/hackathon.html-XvarX4MQ.js",revision:"f14ae2f655f0a4806b0df19b8e9ab074"},{url:"assets/index-DTEEl-sV.js",revision:"46a193641571106d3b7b43f9bc2a2735"},{url:"assets/index.html-4vcikyEb.js",revision:"21ef7f66e983c2eeacd349b10560484b"},{url:"assets/index.html-8im9946a.js",revision:"94c6073a9aad0b93bc8441ae301a174a"},{url:"assets/index.html-Bb3hjcz0.js",revision:"0c4755bf34c17ca369c5f6f7b6324220"},{url:"assets/index.html-BdE9v2zr.js",revision:"31d49db46ece18c45d0a969a15e93f1f"},{url:"assets/index.html-BgxIUjK0.js",revision:"7d42220e92a97267bc02a88a5fa083fa"},{url:"assets/index.html-BHbI7Yju.js",revision:"7ec0687d9087fdc0db804f7c266c67de"},{url:"assets/index.html-BNh3BPp9.js",revision:"74257069e98c865284a5689b512ef7be"},{url:"assets/index.html-BP3Q9Lwx.js",revision:"0062c898f0eec5f78a5caad04d042c77"},{url:"assets/index.html-Bu1MO0RW.js",revision:"c372002e69d8d0c0ebb069f40332d28f"},{url:"assets/index.html-BV_snrcg.js",revision:"fd690383d2adb8ab2b51e5f9f7d5953b"},{url:"assets/index.html-BvbU4ZDg.js",revision:"9262a90e1d0e67ff7893fbb1c077b938"},{url:"assets/index.html-BVCXyDnC.js",revision:"f08a43ea7067f70d2cfd0630b68467cc"},{url:"assets/index.html-C_ck4HQ-.js",revision:"8b479050919a93fe27a7fabb51e9565b"},{url:"assets/index.html-C0sQj3St.js",revision:"fcbccf5d07a1cf3496d4749565afb370"},{url:"assets/index.html-CbCGWub_.js",revision:"02ef17a217483d16fa65053a89bc20be"},{url:"assets/index.html-CDYlBsMr.js",revision:"e83b395aed1a2b9fb4a4f45c75406d3c"},{url:"assets/index.html-CEhWJozO.js",revision:"03e18d62c1ee8350347e8b1a6cf2d6ab"},{url:"assets/index.html-CkQ_dVhK.js",revision:"da6482821468a6a60a21c359d1275610"},{url:"assets/index.html-CyNU1Hdi.js",revision:"2ba6da18886c7419610bfce37217cfb0"},{url:"assets/index.html-D-rE6M2r.js",revision:"0015928729f9d9c7fb23f652b6dcbab5"},{url:"assets/index.html-D38PvMOd.js",revision:"58a31acb5d0813f4fa2d267810072400"},{url:"assets/index.html-DcBbmO8w.js",revision:"a9f6a8c49428180e9adbd29b9b08a4d5"},{url:"assets/index.html-DcZ3drcd.js",revision:"e1f129deda9c45d6cf2b71f916a77d77"},{url:"assets/index.html-Dg29SrNq.js",revision:"abcb1901cf5228740eb6800a32e43af8"},{url:"assets/index.html-DGrfGRJU.js",revision:"749cb66e3dd8083aa4dfbc68adf89890"},{url:"assets/index.html-DM3_DiBS.js",revision:"ba1277df2d0e88f2b332291a65dacf92"},{url:"assets/index.html-DnLG36IF.js",revision:"f3d6f2d2473b2b64e546b7d6336c943b"},{url:"assets/index.html-DRROiJ7q.js",revision:"3aff766b7c659cda2c94319b3304860c"},{url:"assets/index.html-DwAPb4CX.js",revision:"a384c5238e30c86ec8625ab53a7afcd4"},{url:"assets/index.html-eU5_prn0.js",revision:"5ce8d2f439a7e663b77628f4b7a11829"},{url:"assets/index.html-Fs-er2rA.js",revision:"f694fb785a7ba9e430e2938d0a417b0d"},{url:"assets/index.html-H2v0rihW.js",revision:"d401027d3acbfd8467e798ab458e15bf"},{url:"assets/index.html-J_uiYMIN.js",revision:"55fb91afaea09855c0d66aa45e6c76fa"},{url:"assets/index.html-pX59XyPn.js",revision:"d9d0c51ec347281e8577bdca4f80e741"},{url:"assets/index.html-VUlULP-h.js",revision:"8d804f183d8cc0a1c55cd7a4d8a6dbfc"},{url:"assets/index.html-VZmPwrQm.js",revision:"72cb367aec754822cea2caa076415852"},{url:"assets/index.html-w3mDfAN6.js",revision:"f62c435f64310d7f16bb2ebbb1c8f4ed"},{url:"assets/index.html-YEC863qj.js",revision:"c4fdd674b21e8b67dea2dd898a2bc266"},{url:"assets/MATH1510.html-DlXoqcoE.js",revision:"2018b7a548312f037ccb705050881179"},{url:"assets/photoswipe.esm-GXRgw7eJ.js",revision:"9252721b01cd263ae52f9296614a7ddb"},{url:"assets/plugin-vue_export-helper-DlAUqK2U.js",revision:"25e3a5dcaf00fb2b1ba0c8ecea6d2560"},{url:"assets/quantum_recources.html-BZVLuaoX.js",revision:"7ba4b9a2086de33358f86006480d0bf3"},{url:"assets/quantum.html-CtrHgxt8.js",revision:"a6392f92c7790b87bd2dfc346d742332"},{url:"assets/SearchResult-C7ep923m.js",revision:"39abb4d70cc0b16fcc5160f9824e1a66"},{url:"assets/style-CoPSD5xb.css",revision:"81dc247ec228504dd4b758749037411e"},{url:"assets/t-bc.html-CMIgR70M.js",revision:"70b8f0457f24987bfee28aa1b00e2cae"},{url:"assets/t-bt.html-DVXZjXYI.js",revision:"398544dc19f07f25e8217b2a159f10ea"},{url:"assets/t-mc.html-CTLrxkUa.js",revision:"4d02c2f7b73d3be4504784e79c650a8a"},{url:"assets/t-mh.html-CzKhkLKH.js",revision:"d47d3b362fe681320ad6cc42349f92ad"},{url:"assets/t-mr.html-Bg0uaFfp.js",revision:"c7ff863ce6f90366c0d64b3f7bcf2480"},{url:"assets/t-to.html-BJCPLQMv.js",revision:"9b2dd8df72dcbbe4768ca7fddf6e12af"},{url:"404.html",revision:"88bf6109be743261db82d37ede153c3a"},{url:"article/index.html",revision:"2ae22cd16f78e7bb23749f1b837a5417"},{url:"bachelor/ENGG2780.html",revision:"793bf91678c92808f925ba53cf9d1426"},{url:"bachelor/ESTR1005.html",revision:"d50814f3bb7a8339b3f6e5dfacab39ea"},{url:"bachelor/ESTR1006.html",revision:"234cd4c21f43466d5d20ca71a5b8aa65"},{url:"bachelor/ESTR2004.html",revision:"a595f647316efb502add63f63285e29d"},{url:"bachelor/ESTR2018.html",revision:"d9c8bdf4651248b4bcea643b730add4b"},{url:"bachelor/index.html",revision:"5aba6ccc13f27c541004a07d02c64c71"},{url:"bachelor/MATH1510.html",revision:"210bfa3e872be1c7a2024f303888f149"},{url:"category/24s1/index.html",revision:"12a55628041753c8838545dd92618c1b"},{url:"category/24s2/index.html",revision:"754b3a1e56ef592c7bc4c2bf11422679"},{url:"category/25s1/index.html",revision:"db69ece23324adf776b9cd2885af0a47"},{url:"category/cuhk/index.html",revision:"8843800b58574e8cb389dfddd83cf8f5"},{url:"category/hackathon/index.html",revision:"7da66c64d4353f6b2b1e1689e9439943"},{url:"category/index.html",revision:"f68c0757d2604863677ce8ad1888d8fc"},{url:"category/unimelb/index.html",revision:"2bd3eaece8d4bf9f5d65ed85a23ffd43"},{url:"index.html",revision:"5877922407e2171bcdf444c37cc2e538"},{url:"master/COMP90014.html",revision:"71d09b0e9922c51ada255a98504d54a2"},{url:"master/COMP90018.html",revision:"b8254818d4f227d01a754f698dfbc3b6"},{url:"master/COMP90042.html",revision:"822243f4420eb8b45e8e3b3488cfc86e"},{url:"master/COMP90044.html",revision:"30334aa0bd6ccf5f5e791fa40c5253f9"},{url:"master/COMP90054.html",revision:"43cddfe1dcb1daf25ddb1fb649b1a6c4"},{url:"master/COMP90077.html",revision:"29e9c1260ca47fe54bd704aa7d13361f"},{url:"master/COMP90084.html",revision:"dc29b094b9a29cfc8ec1c3b24b88c853"},{url:"master/COMP90084/index.html",revision:"257fe43f3e35f89f073a470a713852dd"},{url:"master/COMP90084/quantum_recources.html",revision:"b9a4c4b568a13a0c82229db31beaa7b3"},{url:"master/COMP90084/quantum.html",revision:"a83ac9b173ff7b18d9926124237a999f"},{url:"master/GEOM90008.html",revision:"e7ecb90963d529d93fd2a2f0a0c1e47f"},{url:"master/index.html",revision:"447163fa4a582e5aa340b768a3d46680"},{url:"master/topics/index.html",revision:"bee05f82731c97cfdea967bb6aa80b05"},{url:"master/topics/t-bc.html",revision:"7d6147ad361b2e3b68453fc0f6362cc3"},{url:"master/topics/t-bt.html",revision:"92df58f561a71243ab6467640ef4911c"},{url:"master/topics/t-mc.html",revision:"e05bcfed2a00a99adc7f0e52a4ee6192"},{url:"master/topics/t-mh.html",revision:"59931aad586e4eeef40ca3d06f3661aa"},{url:"master/topics/t-mr.html",revision:"63db60a00bb5dd297956678d28ef05fe"},{url:"master/topics/t-to.html",revision:"5a89d80d602cd7c211d898b26f7aff70"},{url:"other/hackathon.html",revision:"2f64f076ffbc09160dc9aa47238edf88"},{url:"other/index.html",revision:"9e9660d0e33d05928906684f6f0201be"},{url:"star/index.html",revision:"d7b607cda1f39f45b0d631ee43c51d3c"},{url:"tag/algorithm/index.html",revision:"924c688ecf264f12099f1c91c64305af"},{url:"tag/artificial-intelligence/index.html",revision:"2f7af96b47f32945eca1fd3fbcbb4c4d"},{url:"tag/bioinformatics/index.html",revision:"c9343e7f0b2497d9ba11c88d1d05312e"},{url:"tag/complex-numbers/index.html",revision:"5cff1858b7928fcb1d69f94fc7cbea99"},{url:"tag/data-structures/index.html",revision:"45c5ec822d9e76ef857fed0abbc9177d"},{url:"tag/database/index.html",revision:"7d4379710387ef589c4ebd17c84f6057"},{url:"tag/deep-learning/index.html",revision:"946720ee70b89f48fb5c61582274c4e7"},{url:"tag/event/index.html",revision:"0d090a85317f490cae517daa3ad6ba18"},{url:"tag/game-theory/index.html",revision:"e1f5e5e92097cec1398436be652b7e72"},{url:"tag/graph-theory/index.html",revision:"904b45110fc1cb09ccf5b2887d4c3f03"},{url:"tag/index.html",revision:"ba5d6e9c8c05ed07a5b0458dbab18117"},{url:"tag/linear-algebra/index.html",revision:"7be022e3128aa9a305c9e4554a6d4942"},{url:"tag/machine-learning/index.html",revision:"b7536a85770169e3e5bd53a32bc0ac48"},{url:"tag/mathematics/index.html",revision:"6e68d01820bbd924cff04fbbe2cda31c"},{url:"tag/mobile/index.html",revision:"e72b7ea8f5c2cc8aef161710c3954a68"},{url:"tag/natural-language-processing/index.html",revision:"a879b7b0bd68a06fa086c605488ec03a"},{url:"tag/planning/index.html",revision:"8082617f8a03c78f6a5d98c167654ea6"},{url:"tag/principles/index.html",revision:"174470b7a1e4846f3352dd08cb488db7"},{url:"tag/programming/index.html",revision:"23a096af7bbe52ddc27d13cb5c4245b1"},{url:"tag/quantum-computing/index.html",revision:"c9afc1fa70023c92da44ce18b096f445"},{url:"tag/reinforcement-learning/index.html",revision:"b8df46058db3ff8d33e1367df26fb5d1"},{url:"tag/research/index.html",revision:"32b7db699c0f8dfa43326682afe7f9b0"},{url:"timeline/index.html",revision:"529201c9e34019cc4b16ad13e30714c0"},{url:"android-chrome-192x192.png",revision:"fafda387d2096d05f91c2a61a97aae8d"},{url:"android-chrome-512x512.png",revision:"6adcbc0093138fe376486f88f7b9576a"},{url:"apple-touch-icon.png",revision:"d925f286f134e89b1ca7aebd0608aa83"},{url:"cuhk.jpg",revision:"1a7abd1a834e2831bd10b44f1ede27ae"},{url:"favicon-16x16.png",revision:"efa1ab057e0ae97b6cbf7edc05700bce"},{url:"favicon-32x32.png",revision:"13faa7d01d5cb4eb07a97372a2186c91"}],{}),e.cleanupOutdatedCaches()}));
