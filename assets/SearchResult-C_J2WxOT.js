import{u as I,e as te,f as ae,g as U,h as se,P as le,t as re,r as ie,i as T,j as q,k as ue,w as Y,l as a,m as oe,R as _,n as ne,p as ce,q as he,C as me,s as ve,v as pe,x as ge,y as ye,z as de,A as O,B as fe,D as He,E as Re,F as $,G as j,H as be}from"./app-R8G8ZUdo.js";const Ce=["/","/bachelor/ENGG2780.html","/bachelor/ESTR1005.html","/bachelor/ESTR1006.html","/bachelor/ESTR2004.html","/bachelor/ESTR2018.html","/bachelor/MATH1510.html","/bachelor/","/other/","/other/hackathon.html","/master/COMP90014.html","/master/COMP90018.html","/master/COMP90042.html","/master/COMP90044.html","/master/COMP90054.html","/master/COMP90077.html","/master/COMP90084.html","/master/GEOM90008.html","/master/","/master/COMP90084/","/master/COMP90084/quantum.html","/master/COMP90084/quantum_recources.html","/master/COMP90084/shor.html","/master/paper/","/master/paper/evm.html","/master/topics/","/master/topics/t-bc.html","/master/topics/t-bt.html","/master/topics/t-mc.html","/master/topics/t-mh.html","/master/topics/t-mr.html","/master/topics/t-to.html","/404.html","/category/","/category/cuhk/","/category/hackathon/","/category/unimelb/","/category/24s2/","/category/24s1/","/category/25s1/","/tag/","/tag/mathematics/","/tag/event/","/tag/algorithm/","/tag/bioinformatics/","/tag/mobile/","/tag/programming/","/tag/artificial-intelligence/","/tag/machine-learning/","/tag/deep-learning/","/tag/natural-language-processing/","/tag/research/","/tag/planning/","/tag/reinforcement-learning/","/tag/game-theory/","/tag/data-structures/","/tag/graph-theory/","/tag/quantum-computing/","/tag/principles/","/tag/linear-algebra/","/tag/complex-numbers/","/tag/database/","/tag/image-processing/","/tag/computer-vision/","/tag/motion-magnification/","/article/","/star/","/timeline/"],ke="SEARCH_PRO_QUERY_HISTORY",d=I(ke,[]),qe=()=>{const{queryHistoryCount:s}=O,l=s>0;return{enabled:l,queryHistory:d,addQueryHistory:r=>{l&&(d.value=Array.from(new Set([r,...d.value.slice(0,s-1)])))},removeQueryHistory:r=>{d.value=[...d.value.slice(0,r),...d.value.slice(r+1)]}}},D=s=>Ce[s.id]+("anchor"in s?`#${s.anchor}`:""),Oe="SEARCH_PRO_RESULT_HISTORY",{resultHistoryCount:G}=O,f=I(Oe,[]),Pe=()=>{const s=G>0;return{enabled:s,resultHistory:f,addResultHistory:l=>{if(s){const r={link:D(l),display:l.display};"header"in l&&(r.header=l.header),f.value=[r,...f.value.slice(0,G-1)]}},removeResultHistory:l=>{f.value=[...f.value.slice(0,l),...f.value.slice(l+1)]}}},we=s=>{const l=me(),r=U(),P=ve(),u=T(0),b=q(()=>u.value>0),p=pe([]);return ge(()=>{const{search:g,terminate:w}=ye(),H=de(c=>{const R=c.join(" "),{searchFilter:Q=v=>v,splitWord:S,suggestionsFilter:L,...y}=l.value;R?(u.value+=1,g(c.join(" "),r.value,y).then(v=>Q(v,R,r.value,P.value)).then(v=>{u.value-=1,p.value=v}).catch(v=>{console.warn(v),u.value-=1,u.value||(p.value=[])})):p.value=[]},O.searchDelay-O.suggestDelay);Y([s,r],([c])=>H(c),{immediate:!0}),fe(()=>{w()})}),{isSearching:b,results:p}};var Se=te({name:"SearchResult",props:{queries:{type:Array,required:!0},isFocusing:Boolean},emits:["close","updateQuery"],setup(s,{emit:l}){const r=ae(),P=U(),u=se(le),{enabled:b,addQueryHistory:p,queryHistory:g,removeQueryHistory:w}=qe(),{enabled:H,resultHistory:c,addResultHistory:R,removeResultHistory:Q}=Pe(),S=b||H,L=re(s,"queries"),{results:y,isSearching:v}=we(L),i=ie({isQuery:!0,index:0}),h=T(0),m=T(0),A=q(()=>S&&(g.value.length>0||c.value.length>0)),x=q(()=>y.value.length>0),M=q(()=>y.value[h.value]||null),B=()=>{const{isQuery:e,index:t}=i;t===0?(i.isQuery=!e,i.index=e?c.value.length-1:g.value.length-1):i.index=t-1},z=()=>{const{isQuery:e,index:t}=i;t===(e?g.value.length-1:c.value.length-1)?(i.isQuery=!e,i.index=0):i.index=t+1},N=()=>{h.value=h.value>0?h.value-1:y.value.length-1,m.value=M.value.contents.length-1},V=()=>{h.value=h.value<y.value.length-1?h.value+1:0,m.value=0},J=()=>{m.value<M.value.contents.length-1?m.value+=1:V()},K=()=>{m.value>0?m.value-=1:N()},E=e=>e.map(t=>be(t)?t:a(t[0],t[1])),W=e=>{if(e.type==="customField"){const t=He[e.index]||"$content",[o,k=""]=Re(t)?t[P.value].split("$content"):t.split("$content");return e.display.map(n=>a("div",E([o,...n,k])))}return e.display.map(t=>a("div",E(t)))},C=()=>{h.value=0,m.value=0,l("updateQuery",""),l("close")},X=()=>b?a("ul",{class:"search-pro-result-list"},a("li",{class:"search-pro-result-list-item"},[a("div",{class:"search-pro-result-title"},u.value.queryHistory),g.value.map((e,t)=>a("div",{class:["search-pro-result-item",{active:i.isQuery&&i.index===t}],onClick:()=>{l("updateQuery",e)}},[a($,{class:"search-pro-result-type"}),a("div",{class:"search-pro-result-content"},e),a("button",{class:"search-pro-remove-icon",innerHTML:j,onClick:o=>{o.preventDefault(),o.stopPropagation(),w(t)}})]))])):null,Z=()=>H?a("ul",{class:"search-pro-result-list"},a("li",{class:"search-pro-result-list-item"},[a("div",{class:"search-pro-result-title"},u.value.resultHistory),c.value.map((e,t)=>a(_,{to:e.link,class:["search-pro-result-item",{active:!i.isQuery&&i.index===t}],onClick:()=>{C()}},()=>[a($,{class:"search-pro-result-type"}),a("div",{class:"search-pro-result-content"},[e.header?a("div",{class:"content-header"},e.header):null,a("div",e.display.map(o=>E(o)).flat())]),a("button",{class:"search-pro-remove-icon",innerHTML:j,onClick:o=>{o.preventDefault(),o.stopPropagation(),Q(t)}})]))])):null;return ue("keydown",e=>{if(s.isFocusing){if(x.value){if(e.key==="ArrowUp")K();else if(e.key==="ArrowDown")J();else if(e.key==="Enter"){const t=M.value.contents[m.value];p(s.queries.join(" ")),R(t),r.push(D(t)),C()}}else if(H){if(e.key==="ArrowUp")B();else if(e.key==="ArrowDown")z();else if(e.key==="Enter"){const{index:t}=i;i.isQuery?(l("updateQuery",g.value[t]),e.preventDefault()):(r.push(c.value[t].link),C())}}}}),Y([h,m],()=>{var e;(e=document.querySelector(".search-pro-result-list-item.active .search-pro-result-item.active"))==null||e.scrollIntoView(!1)},{flush:"post"}),()=>a("div",{class:["search-pro-result-wrapper",{empty:s.queries.length?!x.value:!A.value}],id:"search-pro-results"},s.queries.length?v.value?a(oe,{hint:u.value.searching}):x.value?a("ul",{class:"search-pro-result-list"},y.value.map(({title:e,contents:t},o)=>{const k=h.value===o;return a("li",{class:["search-pro-result-list-item",{active:k}]},[a("div",{class:"search-pro-result-title"},e||u.value.defaultTitle),t.map((n,ee)=>{const F=k&&m.value===ee;return a(_,{to:D(n),class:["search-pro-result-item",{active:F,"aria-selected":F}],onClick:()=>{p(s.queries.join(" ")),R(n),C()}},()=>[n.type==="text"?null:a(n.type==="title"?ne:n.type==="heading"?ce:he,{class:"search-pro-result-type"}),a("div",{class:"search-pro-result-content"},[n.type==="text"&&n.header?a("div",{class:"content-header"},n.header):null,a("div",W(n))])])})])})):u.value.emptyResult:S?A.value?[X(),Z()]:u.value.emptyHistory:u.value.emptyResult)}});export{Se as default};
