import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,d as e,f as i,a as n,o as a}from"./app-CVdLU53p.js";const r={},o=e("h2",{id:"_1-search",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-search"},[e("span",null,"1. Search")])],-1),s=e("ul",null,[e("li",null,"bfs & dfs"),e("li",null,"greedy best-first search"),e("li",null,"A* search"),e("li",null,"heuristic function")],-1),Q=e("h2",{id:"_2-markov-decision-process",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_2-markov-decision-process"},[e("span",null,"2. Markov Decision Process")])],-1),c=e("li",null,"state, action, transition probability, reward",-1),T={class:"MathJax",jax:"SVG",style:{position:"relative"}},m={style:{"vertical-align":"-0.566ex"},xmlns:"http://www.w3.org/2000/svg",width:"15.834ex",height:"2.262ex",role:"img",focusable:"false",viewBox:"0 -750 6998.6 1000","aria-hidden":"true"},h=n('<g stroke="currentColor" fill="currentColor" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math"><g data-mml-node="mi"><path data-c="1D443" d="M287 628Q287 635 230 637Q206 637 199 638T192 648Q192 649 194 659Q200 679 203 681T397 683Q587 682 600 680Q664 669 707 631T751 530Q751 453 685 389Q616 321 507 303Q500 302 402 301H307L277 182Q247 66 247 59Q247 55 248 54T255 50T272 48T305 46H336Q342 37 342 35Q342 19 335 5Q330 0 319 0Q316 0 282 1T182 2Q120 2 87 2T51 1Q33 1 33 11Q33 13 36 25Q40 41 44 43T67 46Q94 46 127 49Q141 52 146 61Q149 65 218 339T287 628ZM645 554Q645 567 643 575T634 597T609 619T560 635Q553 636 480 637Q463 637 445 637T416 636T404 636Q391 635 386 627Q384 621 367 550T332 412T314 344Q314 342 395 342H407H430Q542 342 590 392Q617 419 631 471T645 554Z"></path></g><g data-mml-node="mo" transform="translate(1028.8,0)"><path data-c="3D" d="M56 347Q56 360 70 367H707Q722 359 722 347Q722 336 708 328L390 327H72Q56 332 56 347ZM56 153Q56 168 72 173H708Q722 163 722 153Q722 140 707 133H70Q56 140 56 153Z"></path></g><g data-mml-node="mo" transform="translate(2084.6,0)"><path data-c="27E8" d="M333 -232Q332 -239 327 -244T313 -250Q303 -250 296 -240Q293 -233 202 6T110 250T201 494T296 740Q299 745 306 749L309 750Q312 750 313 750Q331 750 333 732Q333 727 243 489Q152 252 152 250T243 11Q333 -227 333 -232Z"></path></g><g data-mml-node="mi" transform="translate(2473.6,0)"><path data-c="1D439" d="M48 1Q31 1 31 11Q31 13 34 25Q38 41 42 43T65 46Q92 46 125 49Q139 52 144 61Q146 66 215 342T285 622Q285 629 281 629Q273 632 228 634H197Q191 640 191 642T193 659Q197 676 203 680H742Q749 676 749 669Q749 664 736 557T722 447Q720 440 702 440H690Q683 445 683 453Q683 454 686 477T689 530Q689 560 682 579T663 610T626 626T575 633T503 634H480Q398 633 393 631Q388 629 386 623Q385 622 352 492L320 363H375Q378 363 398 363T426 364T448 367T472 374T489 386Q502 398 511 419T524 457T529 475Q532 480 548 480H560Q567 475 567 470Q567 467 536 339T502 207Q500 200 482 200H470Q463 206 463 212Q463 215 468 234T473 274Q473 303 453 310T364 317H309L277 190Q245 66 245 60Q245 46 334 46H359Q365 40 365 39T363 19Q359 6 353 0H336Q295 2 185 2Q120 2 86 2T48 1Z"></path></g><g data-mml-node="mo" transform="translate(3222.6,0)"><path data-c="2C" d="M78 35T78 60T94 103T137 121Q165 121 187 96T210 8Q210 -27 201 -60T180 -117T154 -158T130 -185T117 -194Q113 -194 104 -185T95 -172Q95 -168 106 -156T131 -126T157 -76T173 -3V9L172 8Q170 7 167 6T161 3T152 1T140 0Q113 0 96 17Z"></path></g><g data-mml-node="mi" transform="translate(3667.2,0)"><path data-c="1D442" d="M740 435Q740 320 676 213T511 42T304 -22Q207 -22 138 35T51 201Q50 209 50 244Q50 346 98 438T227 601Q351 704 476 704Q514 704 524 703Q621 689 680 617T740 435ZM637 476Q637 565 591 615T476 665Q396 665 322 605Q242 542 200 428T157 216Q157 126 200 73T314 19Q404 19 485 98T608 313Q637 408 637 476Z"></path></g><g data-mml-node="mo" transform="translate(4430.2,0)"><path data-c="2C" d="M78 35T78 60T94 103T137 121Q165 121 187 96T210 8Q210 -27 201 -60T180 -117T154 -158T130 -185T117 -194Q113 -194 104 -185T95 -172Q95 -168 106 -156T131 -126T157 -76T173 -3V9L172 8Q170 7 167 6T161 3T152 1T140 0Q113 0 96 17Z"></path></g><g data-mml-node="mi" transform="translate(4874.9,0)"><path data-c="1D43C" d="M43 1Q26 1 26 10Q26 12 29 24Q34 43 39 45Q42 46 54 46H60Q120 46 136 53Q137 53 138 54Q143 56 149 77T198 273Q210 318 216 344Q286 624 286 626Q284 630 284 631Q274 637 213 637H193Q184 643 189 662Q193 677 195 680T209 683H213Q285 681 359 681Q481 681 487 683H497Q504 676 504 672T501 655T494 639Q491 637 471 637Q440 637 407 634Q393 631 388 623Q381 609 337 432Q326 385 315 341Q245 65 245 59Q245 52 255 50T307 46H339Q345 38 345 37T342 19Q338 6 332 0H316Q279 2 179 2Q143 2 113 2T65 2T43 1Z"></path></g><g data-mml-node="mo" transform="translate(5378.9,0)"><path data-c="2C" d="M78 35T78 60T94 103T137 121Q165 121 187 96T210 8Q210 -27 201 -60T180 -117T154 -158T130 -185T117 -194Q113 -194 104 -185T95 -172Q95 -168 106 -156T131 -126T157 -76T173 -3V9L172 8Q170 7 167 6T161 3T152 1T140 0Q113 0 96 17Z"></path></g><g data-mml-node="mi" transform="translate(5823.6,0)"><path data-c="1D43A" d="M50 252Q50 367 117 473T286 641T490 704Q580 704 633 653Q642 643 648 636T656 626L657 623Q660 623 684 649Q691 655 699 663T715 679T725 690L740 705H746Q760 705 760 698Q760 694 728 561Q692 422 692 421Q690 416 687 415T669 413H653Q647 419 647 422Q647 423 648 429T650 449T651 481Q651 552 619 605T510 659Q492 659 471 656T418 643T357 615T294 567T236 496T189 394T158 260Q156 242 156 221Q156 173 170 136T206 79T256 45T308 28T353 24Q407 24 452 47T514 106Q517 114 529 161T541 214Q541 222 528 224T468 227H431Q425 233 425 235T427 254Q431 267 437 273H454Q494 271 594 271Q634 271 659 271T695 272T707 272Q721 272 721 263Q721 261 719 249Q714 230 709 228Q706 227 694 227Q674 227 653 224Q646 221 643 215T629 164Q620 131 614 108Q589 6 586 3Q584 1 581 1Q571 1 553 21T530 52Q530 53 528 52T522 47Q448 -22 322 -22Q201 -22 126 55T50 252Z"></path></g><g data-mml-node="mo" transform="translate(6609.6,0)"><path data-c="27E9" d="M55 732Q56 739 61 744T75 750Q85 750 92 740Q95 733 186 494T278 250T187 6T92 -240Q85 -250 75 -250Q67 -250 62 -245T55 -232Q55 -227 145 11Q236 248 236 250T145 489Q55 727 55 732Z"></path></g></g></g>',1),d=[h],p=e("mjx-assistive-mml",{unselectable:"on",display:"inline"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[e("mi",null,"P"),e("mo",null,"="),e("mo",{fence:"false",stretchy:"false"},"⟨"),e("mi",null,"F"),e("mo",null,","),e("mi",null,"O"),e("mo",null,","),e("mi",null,"I"),e("mo",null,","),e("mi",null,"G"),e("mo",{fence:"false",stretchy:"false"},"⟩")])],-1),u=e("ul",null,[e("li",null,"P: planning problem"),e("li",null,"F: facts"),e("li",null,"O: operators"),e("li",null,"I: initial facts"),e("li",null,"G: goal facts")],-1),g=e("li",null,"actions: PRE, ADD, DEL",-1),f=n('<h2 id="_3-relaxation" tabindex="-1"><a class="header-anchor" href="#_3-relaxation"><span>3. Relaxation</span></a></h2><ul><li>add, delete, hmax, hadd, hff</li></ul><h2 id="_4-reinforcement-learning" tabindex="-1"><a class="header-anchor" href="#_4-reinforcement-learning"><span>4. Reinforcement Learning</span></a></h2><ul><li>value iteration, policy iteration</li><li>SARSA, Q-learning</li><li>monte carlo tree search, upper confidence bound</li><li>approximation</li><li>reward shaping</li></ul><h2 id="_5-game-theory" tabindex="-1"><a class="header-anchor" href="#_5-game-theory"><span>5. Game Theory</span></a></h2><ul><li>nash equilibrium</li></ul>',6);function _(y,b){return a(),t("div",null,[o,s,Q,e("ul",null,[c,e("li",null,[i("STRIPS "),e("ul",null,[e("li",null,[e("mjx-container",T,[(a(),t("svg",m,d)),p]),u]),g])])]),f])}const x=l(r,[["render",_],["__file","COMP90054.html.vue"]]),H=JSON.parse('{"path":"/master/COMP90054.html","title":"COMP90054 AI Planning for Autonomy","lang":"en-US","frontmatter":{"title":"COMP90054 AI Planning for Autonomy","shortTitle":"COMP90054","order":1,"icon":"book-open","category":["UniMelb","24S1"],"tag":["Artificial Intelligence","Planning","Algorithm","Reinforcement Learning","Game Theory"],"description":"1. Search bfs & dfs greedy best-first search A* search heuristic function 2. Markov Decision Process state, action, transition probability, reward STRIPS P: planning problem F: ...","head":[["meta",{"property":"og:url","content":"https://shyu216.github.io/knownoevil/knownoevil/master/COMP90054.html"}],["meta",{"property":"og:site_name","content":"Know No Evil"}],["meta",{"property":"og:title","content":"COMP90054 AI Planning for Autonomy"}],["meta",{"property":"og:description","content":"1. Search bfs & dfs greedy best-first search A* search heuristic function 2. Markov Decision Process state, action, transition probability, reward STRIPS P: planning problem F: ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-08-26T11:15:43.000Z"}],["meta",{"property":"article:author","content":"Dale"}],["meta",{"property":"article:tag","content":"Artificial Intelligence"}],["meta",{"property":"article:tag","content":"Planning"}],["meta",{"property":"article:tag","content":"Algorithm"}],["meta",{"property":"article:tag","content":"Reinforcement Learning"}],["meta",{"property":"article:tag","content":"Game Theory"}],["meta",{"property":"article:modified_time","content":"2024-08-26T11:15:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"COMP90054 AI Planning for Autonomy\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-08-26T11:15:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Dale\\",\\"url\\":\\"https://github.com/shyu216\\"}]}"]]},"headers":[{"level":2,"title":"1. Search","slug":"_1-search","link":"#_1-search","children":[]},{"level":2,"title":"2. Markov Decision Process","slug":"_2-markov-decision-process","link":"#_2-markov-decision-process","children":[]},{"level":2,"title":"3. Relaxation","slug":"_3-relaxation","link":"#_3-relaxation","children":[]},{"level":2,"title":"4. Reinforcement Learning","slug":"_4-reinforcement-learning","link":"#_4-reinforcement-learning","children":[]},{"level":2,"title":"5. Game Theory","slug":"_5-game-theory","link":"#_5-game-theory","children":[]}],"git":{"createdTime":1722491295000,"updatedTime":1724670943000,"contributors":[{"name":"shyu216","email":"sihong1@student.unimelb.edu.au","commits":4},{"name":"shyu216","email":"yusihong073@gmail.com","commits":1}]},"readingTime":{"minutes":0.34,"words":103},"filePathRelative":"master/COMP90054.md","localizedDate":"August 1, 2024","autoDesc":true,"excerpt":"<h2>1. Search</h2>\\n<ul>\\n<li>bfs &amp; dfs</li>\\n<li>greedy best-first search</li>\\n<li>A* search</li>\\n<li>heuristic function</li>\\n</ul>\\n<h2>2. Markov Decision Process</h2>\\n<ul>\\n<li>state, action, transition probability, reward</li>\\n<li>STRIPS\\n<ul>\\n<li>\\n<ul>\\n<li>P: planning problem</li>\\n<li>F: facts</li>\\n<li>O: operators</li>\\n<li>I: initial facts</li>\\n<li>G: goal facts</li>\\n</ul>\\n</li>\\n<li>actions: PRE, ADD, DEL</li>\\n</ul>\\n</li>\\n</ul>"}');export{x as comp,H as data};
