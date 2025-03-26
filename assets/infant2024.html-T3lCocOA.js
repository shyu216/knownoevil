import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as o}from"./app-BFkrgjo-.js";const i={},n=o('<h2 id="how-they-handle-the-data" tabindex="-1"><a class="header-anchor" href="#how-they-handle-the-data"><span>How they handle the data?</span></a></h2><p>Short video segments with mild infant motion or those including caregiver shadow movement are classified as optimal. In contrast, videos with more significant movements, such as upper or lower limb movement (i.e., permissible motion artifacts), the presence of a parent or nurse’s hand that does not block the respiratory area, or mild crying that does not cause high motion artifacts, are considered suboptimal.</p><p>As our main goal is to develop an algorithm that closely matches human performance, our video annotation approach focuses on whether the artifacts permit accurate visual RR annotation by human annotators, rather than relying on strict pixel movement thresholds. This ensures that only videos where human observers can reliably count RR are included in the analysis, preserving the validity of the algorithm’s evaluation. However, for deployment, an automated method to quantify motion artifacts and define thresholds to identify when RR estimation may be inaccurate will be required, which could be implemented in the next iteration.</p><h2 id="how-they-use-evm" tabindex="-1"><a class="header-anchor" href="#how-they-use-evm"><span>How they use EVM?</span></a></h2><p>They also use αB(x, t) = I(x, t) − Ĩ(x, t).</p><p>Barely mentioned, even without stating their passband frequencies.</p><h2 id="how-their-automatic-roi-selection-works" tabindex="-1"><a class="header-anchor" href="#how-their-automatic-roi-selection-works"><span>How their automatic ROI selection works?</span></a></h2><ol><li>Sliding window and calculating average intensity for each.</li><li>Perform wavelet-based denoising for each window in time domain.</li><li>Perform K-medoids clustering to classify the windows into 2 clusters.</li></ol><h2 id="how-they-get-rr" tabindex="-1"><a class="header-anchor" href="#how-they-get-rr"><span>How they get RR?</span></a></h2><p>Counting the peaks.</p>',10),r=[n];function s(h,l){return a(),t("div",null,r)}const m=e(i,[["render",s],["__file","infant2024.html.vue"]]),p=JSON.parse(`{"path":"/master/research/literature_review/infant2024.html","title":"Video-Based Respiratory Rate Estimation for Infants in the NICU","lang":"en-US","frontmatter":{"title":"Video-Based Respiratory Rate Estimation for Infants in the NICU","icon":"note-sticky","timeline":true,"tag":["Signal Processing"],"description":"How they handle the data? Short video segments with mild infant motion or those including caregiver shadow movement are classified as optimal. In contrast, videos with more sign...","head":[["meta",{"property":"og:url","content":"https://shyu216.github.io/knownoevil/knownoevil/master/research/literature_review/infant2024.html"}],["meta",{"property":"og:site_name","content":"SIHONG's Blog"}],["meta",{"property":"og:title","content":"Video-Based Respiratory Rate Estimation for Infants in the NICU"}],["meta",{"property":"og:description","content":"How they handle the data? Short video segments with mild infant motion or those including caregiver shadow movement are classified as optimal. In contrast, videos with more sign..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2025-03-26T11:59:11.000Z"}],["meta",{"property":"article:author","content":"Dale"}],["meta",{"property":"article:tag","content":"Signal Processing"}],["meta",{"property":"article:modified_time","content":"2025-03-26T11:59:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Video-Based Respiratory Rate Estimation for Infants in the NICU\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-03-26T11:59:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Dale\\",\\"url\\":\\"https://github.com/shyu216\\"}]}"]]},"headers":[{"level":2,"title":"How they handle the data?","slug":"how-they-handle-the-data","link":"#how-they-handle-the-data","children":[]},{"level":2,"title":"How they use EVM?","slug":"how-they-use-evm","link":"#how-they-use-evm","children":[]},{"level":2,"title":"How their automatic ROI selection works?","slug":"how-their-automatic-roi-selection-works","link":"#how-their-automatic-roi-selection-works","children":[]},{"level":2,"title":"How they get RR?","slug":"how-they-get-rr","link":"#how-they-get-rr","children":[]}],"git":{"createdTime":1742977129000,"updatedTime":1742990351000,"contributors":[{"name":"shyu216","email":"sihong1@student.unimelb.edu.au","commits":2}]},"filePathRelative":"master/research/literature_review/infant2024.md","localizedDate":"March 26, 2025","excerpt":"<h2>How they handle the data?</h2>\\n<p>Short video segments with mild infant motion or those including caregiver shadow movement are classified as optimal. In contrast, videos with more significant movements, such as upper or lower limb movement (i.e., permissible motion artifacts), the presence of a parent or nurse’s hand that does not block the respiratory area, or mild crying that does not cause high motion artifacts, are considered suboptimal.</p>","autoDesc":true}`);export{m as comp,p as data};
