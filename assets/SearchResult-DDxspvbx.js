import{u as U,i as se,l as te,m as Y,p as ae,P as le,q as re,s as ue,k as D,v as w,x as ie,y as B,j as t,z as oe,R as I,A as ne,B as ce,C as ve,D as he,E as de,G as pe,H as me,I as ye,J as ge,K as S,L as He,M as fe,N as Re,O as $,Q as j,S as Ce}from"./app-CHx0DoaU.js";const ke=["/","/bachelor/CSCI3180.html","/bachelor/ESTR1005.html","/bachelor/MATH1510.html","/bachelor/","/demo/","/demo/disable.html","/demo/layout.html","/demo/markdown.html","/demo/page.html","/master/COMP90014.html","/master/COMP90018.html","/master/COMP90042.html","/master/COMP90044.html","/master/COMP90054.html","/master/COMP90077.html","/master/COMP90084.html","/master/GEOM90008.html","/master/","/404.html"],Qe="SEARCH_PRO_QUERY_HISTORY",g=U(Qe,[]),we=()=>{const{queryHistoryCount:a}=S,l=a>0;return{enabled:l,queryHistory:g,addQueryHistory:r=>{l&&(g.value=Array.from(new Set([r,...g.value.slice(0,a-1)])))},removeQueryHistory:r=>{g.value=[...g.value.slice(0,r),...g.value.slice(r+1)]}}},E=a=>ke[a.id]+("anchor"in a?`#${a.anchor}`:""),Se="SEARCH_PRO_RESULT_HISTORY",{resultHistoryCount:_}=S,H=U(Se,[]),qe=()=>{const a=_>0;return{enabled:a,resultHistory:H,addResultHistory:l=>{if(a){const r={link:E(l),display:l.display};"header"in l&&(r.header=l.header),H.value=[r,...H.value.slice(0,_-1)]}},removeResultHistory:l=>{H.value=[...H.value.slice(0,l),...H.value.slice(l+1)]}}},xe=a=>{const l=he(),r=Y(),q=de(),i=D(0),C=w(()=>i.value>0),p=pe([]);return me(()=>{const{search:m,terminate:x}=ye(),f=ge(c=>{const R=c.join(" "),{searchFilter:O=d=>d,splitWord:P,suggestionsFilter:A,...y}=l.value;R?(i.value+=1,m(c.join(" "),r.value,y).then(d=>O(d,R,r.value,q.value)).then(d=>{i.value-=1,p.value=d}).catch(d=>{console.warn(d),i.value-=1,i.value||(p.value=[])})):p.value=[]},S.searchDelay-S.suggestDelay);B([a,r],([c])=>f(c),{immediate:!0}),He(()=>{x()})}),{isSearching:C,results:p}};var Pe=se({name:"SearchResult",props:{queries:{type:Array,required:!0},isFocusing:Boolean},emits:["close","updateQuery"],setup(a,{emit:l}){const r=te(),q=Y(),i=ae(le),{enabled:C,addQueryHistory:p,queryHistory:m,removeQueryHistory:x}=we(),{enabled:f,resultHistory:c,addResultHistory:R,removeResultHistory:O}=qe(),P=C||f,A=re(a,"queries"),{results:y,isSearching:d}=xe(A),u=ue({isQuery:!0,index:0}),v=D(0),h=D(0),T=w(()=>P&&(m.value.length>0||c.value.length>0)),b=w(()=>y.value.length>0),M=w(()=>y.value[v.value]||null),G=()=>{const{isQuery:e,index:s}=u;s===0?(u.isQuery=!e,u.index=e?c.value.length-1:m.value.length-1):u.index=s-1},z=()=>{const{isQuery:e,index:s}=u;s===(e?m.value.length-1:c.value.length-1)?(u.isQuery=!e,u.index=0):u.index=s+1},J=()=>{v.value=v.value>0?v.value-1:y.value.length-1,h.value=M.value.contents.length-1},K=()=>{v.value=v.value<y.value.length-1?v.value+1:0,h.value=0},N=()=>{h.value<M.value.contents.length-1?h.value+=1:K()},V=()=>{h.value>0?h.value-=1:J()},L=e=>e.map(s=>Ce(s)?s:t(s[0],s[1])),W=e=>{if(e.type==="customField"){const s=fe[e.index]||"$content",[o,Q=""]=Re(s)?s[q.value].split("$content"):s.split("$content");return e.display.map(n=>t("div",L([o,...n,Q])))}return e.display.map(s=>t("div",L(s)))},k=()=>{v.value=0,h.value=0,l("updateQuery",""),l("close")},X=()=>C?t("ul",{class:"search-pro-result-list"},t("li",{class:"search-pro-result-list-item"},[t("div",{class:"search-pro-result-title"},i.value.queryHistory),m.value.map((e,s)=>t("div",{class:["search-pro-result-item",{active:u.isQuery&&u.index===s}],onClick:()=>{l("updateQuery",e)}},[t($,{class:"search-pro-result-type"}),t("div",{class:"search-pro-result-content"},e),t("button",{class:"search-pro-remove-icon",innerHTML:j,onClick:o=>{o.preventDefault(),o.stopPropagation(),x(s)}})]))])):null,Z=()=>f?t("ul",{class:"search-pro-result-list"},t("li",{class:"search-pro-result-list-item"},[t("div",{class:"search-pro-result-title"},i.value.resultHistory),c.value.map((e,s)=>t(I,{to:e.link,class:["search-pro-result-item",{active:!u.isQuery&&u.index===s}],onClick:()=>{k()}},()=>[t($,{class:"search-pro-result-type"}),t("div",{class:"search-pro-result-content"},[e.header?t("div",{class:"content-header"},e.header):null,t("div",e.display.map(o=>L(o)).flat())]),t("button",{class:"search-pro-remove-icon",innerHTML:j,onClick:o=>{o.preventDefault(),o.stopPropagation(),O(s)}})]))])):null;return ie("keydown",e=>{if(a.isFocusing){if(b.value){if(e.key==="ArrowUp")V();else if(e.key==="ArrowDown")N();else if(e.key==="Enter"){const s=M.value.contents[h.value];p(a.queries.join(" ")),R(s),r.push(E(s)),k()}}else if(f){if(e.key==="ArrowUp")G();else if(e.key==="ArrowDown")z();else if(e.key==="Enter"){const{index:s}=u;u.isQuery?(l("updateQuery",m.value[s]),e.preventDefault()):(r.push(c.value[s].link),k())}}}}),B([v,h],()=>{var e;(e=document.querySelector(".search-pro-result-list-item.active .search-pro-result-item.active"))==null||e.scrollIntoView(!1)},{flush:"post"}),()=>t("div",{class:["search-pro-result-wrapper",{empty:a.queries.length?!b.value:!T.value}],id:"search-pro-results"},a.queries.length?d.value?t(oe,{hint:i.value.searching}):b.value?t("ul",{class:"search-pro-result-list"},y.value.map(({title:e,contents:s},o)=>{const Q=v.value===o;return t("li",{class:["search-pro-result-list-item",{active:Q}]},[t("div",{class:"search-pro-result-title"},e||i.value.defaultTitle),s.map((n,ee)=>{const F=Q&&h.value===ee;return t(I,{to:E(n),class:["search-pro-result-item",{active:F,"aria-selected":F}],onClick:()=>{p(a.queries.join(" ")),R(n),k()}},()=>[n.type==="text"?null:t(n.type==="title"?ne:n.type==="heading"?ce:ve,{class:"search-pro-result-type"}),t("div",{class:"search-pro-result-content"},[n.type==="text"&&n.header?t("div",{class:"content-header"},n.header):null,t("div",W(n))])])})])})):i.value.emptyResult:P?T.value?[X(),Z()]:i.value.emptyHistory:i.value.emptyResult)}});export{Pe as default};