import{u as G,f as te,g as ae,h as U,i as se,P as re,t as le,j as ie,k as E,l as q,m as ue,w as Y,n as a,p as oe,R as F,q as ne,s as ce,v as he,C as me,x as ve,y as pe,z as de,A as ge,B as ye,D as w,E as fe,F as be,G as He,H as $,I as j,J as Re}from"./app-BB1fzfAe.js";const ke=["/","/bachelor/ENGG2780.html","/bachelor/ESTR1005.html","/bachelor/ESTR1006.html","/bachelor/ESTR2004.html","/bachelor/ESTR2018.html","/bachelor/MATH1510.html","/bachelor/","/other/","/other/hackathon.html","/other/proposal.html","/master/COMP90014.html","/master/COMP90018.html","/master/COMP90042.html","/master/COMP90044.html","/master/COMP90054.html","/master/COMP90077.html","/master/COMP90084.html","/master/GEOM90008.html","/master/","/master/COMP90084/","/master/COMP90084/quantum.html","/master/COMP90084/quantum_recources.html","/master/COMP90084/shor.html","/master/research/","/master/research/candidate_topics/","/master/research/candidate_topics/t-bc.html","/master/research/candidate_topics/t-bt.html","/master/research/candidate_topics/t-mc.html","/master/research/candidate_topics/t-mh.html","/master/research/candidate_topics/t-mr.html","/master/research/candidate_topics/t-to.html","/master/research/literature_review/","/master/research/literature_review/evm.html","/master/research/troubleshooting/","/master/research/troubleshooting/qtcreator.html","/master/research/troubleshooting/realsense.html","/404.html","/category/","/category/cuhk/","/category/hackathon/","/category/skills/","/category/unimelb/","/category/24s2/","/category/24s1/","/category/25s1/","/tag/","/tag/mathematics/","/tag/event/","/tag/skills/","/tag/algorithm/","/tag/bioinformatics/","/tag/mobile/","/tag/programming/","/tag/artificial-intelligence/","/tag/machine-learning/","/tag/deep-learning/","/tag/natural-language-processing/","/tag/research/","/tag/planning/","/tag/reinforcement-learning/","/tag/game-theory/","/tag/data-structures/","/tag/graph-theory/","/tag/quantum-computing/","/tag/principles/","/tag/linear-algebra/","/tag/complex-numbers/","/tag/database/","/tag/image-processing/","/tag/computer-vision/","/tag/motion-magnification/","/article/","/star/","/timeline/"],Ce="SEARCH_PRO_QUERY_HISTORY",y=G(Ce,[]),qe=()=>{const{queryHistoryCount:s}=w,r=s>0;return{enabled:r,queryHistory:y,addQueryHistory:l=>{r&&(y.value=Array.from(new Set([l,...y.value.slice(0,s-1)])))},removeQueryHistory:l=>{y.value=[...y.value.slice(0,l),...y.value.slice(l+1)]}}},T=s=>ke[s.id]+("anchor"in s?`#${s.anchor}`:""),we="SEARCH_PRO_RESULT_HISTORY",{resultHistoryCount:I}=w,f=G(we,[]),Oe=()=>{const s=I>0;return{enabled:s,resultHistory:f,addResultHistory:r=>{if(s){const l={link:T(r),display:r.display};"header"in r&&(l.header=r.header),f.value=[l,...f.value.slice(0,I-1)]}},removeResultHistory:r=>{f.value=[...f.value.slice(0,r),...f.value.slice(r+1)]}}},Pe=s=>{const r=me(),l=U(),O=ve(),u=E(0),R=q(()=>u.value>0),p=pe([]);return de(()=>{const{search:d,terminate:P}=ge(),b=ye(c=>{const H=c.join(" "),{searchFilter:Q=v=>v,splitWord:S,suggestionsFilter:D,...g}=r.value;H?(u.value+=1,d(c.join(" "),l.value,g).then(v=>Q(v,H,l.value,O.value)).then(v=>{u.value-=1,p.value=v}).catch(v=>{console.warn(v),u.value-=1,u.value||(p.value=[])})):p.value=[]},w.searchDelay-w.suggestDelay);Y([s,l],([c])=>b(c),{immediate:!0}),fe(()=>{P()})}),{isSearching:R,results:p}};var Se=te({name:"SearchResult",props:{queries:{type:Array,required:!0},isFocusing:Boolean},emits:["close","updateQuery"],setup(s,{emit:r}){const l=ae(),O=U(),u=se(re),{enabled:R,addQueryHistory:p,queryHistory:d,removeQueryHistory:P}=qe(),{enabled:b,resultHistory:c,addResultHistory:H,removeResultHistory:Q}=Oe(),S=R||b,D=le(s,"queries"),{results:g,isSearching:v}=Pe(D),i=ie({isQuery:!0,index:0}),h=E(0),m=E(0),L=q(()=>S&&(d.value.length>0||c.value.length>0)),x=q(()=>g.value.length>0),M=q(()=>g.value[h.value]||null),B=()=>{const{isQuery:e,index:t}=i;t===0?(i.isQuery=!e,i.index=e?c.value.length-1:d.value.length-1):i.index=t-1},z=()=>{const{isQuery:e,index:t}=i;t===(e?d.value.length-1:c.value.length-1)?(i.isQuery=!e,i.index=0):i.index=t+1},J=()=>{h.value=h.value>0?h.value-1:g.value.length-1,m.value=M.value.contents.length-1},N=()=>{h.value=h.value<g.value.length-1?h.value+1:0,m.value=0},V=()=>{m.value<M.value.contents.length-1?m.value+=1:N()},K=()=>{m.value>0?m.value-=1:J()},_=e=>e.map(t=>Re(t)?t:a(t[0],t[1])),W=e=>{if(e.type==="customField"){const t=be[e.index]||"$content",[o,C=""]=He(t)?t[O.value].split("$content"):t.split("$content");return e.display.map(n=>a("div",_([o,...n,C])))}return e.display.map(t=>a("div",_(t)))},k=()=>{h.value=0,m.value=0,r("updateQuery",""),r("close")},X=()=>R?a("ul",{class:"search-pro-result-list"},a("li",{class:"search-pro-result-list-item"},[a("div",{class:"search-pro-result-title"},u.value.queryHistory),d.value.map((e,t)=>a("div",{class:["search-pro-result-item",{active:i.isQuery&&i.index===t}],onClick:()=>{r("updateQuery",e)}},[a($,{class:"search-pro-result-type"}),a("div",{class:"search-pro-result-content"},e),a("button",{class:"search-pro-remove-icon",innerHTML:j,onClick:o=>{o.preventDefault(),o.stopPropagation(),P(t)}})]))])):null,Z=()=>b?a("ul",{class:"search-pro-result-list"},a("li",{class:"search-pro-result-list-item"},[a("div",{class:"search-pro-result-title"},u.value.resultHistory),c.value.map((e,t)=>a(F,{to:e.link,class:["search-pro-result-item",{active:!i.isQuery&&i.index===t}],onClick:()=>{k()}},()=>[a($,{class:"search-pro-result-type"}),a("div",{class:"search-pro-result-content"},[e.header?a("div",{class:"content-header"},e.header):null,a("div",e.display.map(o=>_(o)).flat())]),a("button",{class:"search-pro-remove-icon",innerHTML:j,onClick:o=>{o.preventDefault(),o.stopPropagation(),Q(t)}})]))])):null;return ue("keydown",e=>{if(s.isFocusing){if(x.value){if(e.key==="ArrowUp")K();else if(e.key==="ArrowDown")V();else if(e.key==="Enter"){const t=M.value.contents[m.value];p(s.queries.join(" ")),H(t),l.push(T(t)),k()}}else if(b){if(e.key==="ArrowUp")B();else if(e.key==="ArrowDown")z();else if(e.key==="Enter"){const{index:t}=i;i.isQuery?(r("updateQuery",d.value[t]),e.preventDefault()):(l.push(c.value[t].link),k())}}}}),Y([h,m],()=>{var e;(e=document.querySelector(".search-pro-result-list-item.active .search-pro-result-item.active"))==null||e.scrollIntoView(!1)},{flush:"post"}),()=>a("div",{class:["search-pro-result-wrapper",{empty:s.queries.length?!x.value:!L.value}],id:"search-pro-results"},s.queries.length?v.value?a(oe,{hint:u.value.searching}):x.value?a("ul",{class:"search-pro-result-list"},g.value.map(({title:e,contents:t},o)=>{const C=h.value===o;return a("li",{class:["search-pro-result-list-item",{active:C}]},[a("div",{class:"search-pro-result-title"},e||u.value.defaultTitle),t.map((n,ee)=>{const A=C&&m.value===ee;return a(F,{to:T(n),class:["search-pro-result-item",{active:A,"aria-selected":A}],onClick:()=>{p(s.queries.join(" ")),H(n),k()}},()=>[n.type==="text"?null:a(n.type==="title"?ne:n.type==="heading"?ce:he,{class:"search-pro-result-type"}),a("div",{class:"search-pro-result-content"},[n.type==="text"&&n.header?a("div",{class:"content-header"},n.header):null,a("div",W(n))])])})])})):u.value.emptyResult:S?L.value?[X(),Z()]:u.value.emptyHistory:u.value.emptyResult)}});export{Se as default};
