import{u as G,f as se,g as te,h as U,i as ae,P as le,t as re,j as ue,k as T,l as Q,m as ie,w as Y,n as t,p as oe,R as $,q as ne,s as ce,v as ve,C as he,x as pe,y as de,z as ye,A as me,B as ge,D as S,E as fe,F as He,G as Re,H as j,I,J as ke}from"./app-BiL-7KfF.js";const Ce=["/","/bachelor/ENGG2780.html","/bachelor/ESTR1005.html","/bachelor/ESTR1006.html","/bachelor/ESTR2004.html","/bachelor/ESTR2018.html","/bachelor/MATH1510.html","/bachelor/","/other/","/other/hackathon.html","/other/shor.html","/master/COMP90014.html","/master/COMP90018.html","/master/COMP90042.html","/master/COMP90044.html","/master/COMP90054.html","/master/COMP90077.html","/master/COMP90084.html","/master/GEOM90008.html","/master/","/404.html"],we="SEARCH_PRO_QUERY_HISTORY",g=G(we,[]),Qe=()=>{const{queryHistoryCount:a}=S,l=a>0;return{enabled:l,queryHistory:g,addQueryHistory:r=>{l&&(g.value=Array.from(new Set([r,...g.value.slice(0,a-1)])))},removeQueryHistory:r=>{g.value=[...g.value.slice(0,r),...g.value.slice(r+1)]}}},D=a=>Ce[a.id]+("anchor"in a?`#${a.anchor}`:""),Se="SEARCH_PRO_RESULT_HISTORY",{resultHistoryCount:_}=S,f=G(Se,[]),be=()=>{const a=_>0;return{enabled:a,resultHistory:f,addResultHistory:l=>{if(a){const r={link:D(l),display:l.display};"header"in l&&(r.header=l.header),f.value=[r,...f.value.slice(0,_-1)]}},removeResultHistory:l=>{f.value=[...f.value.slice(0,l),...f.value.slice(l+1)]}}},qe=a=>{const l=he(),r=U(),b=pe(),i=T(0),k=Q(()=>i.value>0),d=de([]);return ye(()=>{const{search:y,terminate:q}=me(),H=ge(c=>{const R=c.join(" "),{searchFilter:x=p=>p,splitWord:E,suggestionsFilter:L,...m}=l.value;R?(i.value+=1,y(c.join(" "),r.value,m).then(p=>x(p,R,r.value,b.value)).then(p=>{i.value-=1,d.value=p}).catch(p=>{console.warn(p),i.value-=1,i.value||(d.value=[])})):d.value=[]},S.searchDelay-S.suggestDelay);Y([a,r],([c])=>H(c),{immediate:!0}),fe(()=>{q()})}),{isSearching:k,results:d}};var Ee=se({name:"SearchResult",props:{queries:{type:Array,required:!0},isFocusing:Boolean},emits:["close","updateQuery"],setup(a,{emit:l}){const r=te(),b=U(),i=ae(le),{enabled:k,addQueryHistory:d,queryHistory:y,removeQueryHistory:q}=Qe(),{enabled:H,resultHistory:c,addResultHistory:R,removeResultHistory:x}=be(),E=k||H,L=re(a,"queries"),{results:m,isSearching:p}=qe(L),u=ue({isQuery:!0,index:0}),v=T(0),h=T(0),A=Q(()=>E&&(y.value.length>0||c.value.length>0)),O=Q(()=>m.value.length>0),P=Q(()=>m.value[v.value]||null),B=()=>{const{isQuery:e,index:s}=u;s===0?(u.isQuery=!e,u.index=e?c.value.length-1:y.value.length-1):u.index=s-1},z=()=>{const{isQuery:e,index:s}=u;s===(e?y.value.length-1:c.value.length-1)?(u.isQuery=!e,u.index=0):u.index=s+1},J=()=>{v.value=v.value>0?v.value-1:m.value.length-1,h.value=P.value.contents.length-1},N=()=>{v.value=v.value<m.value.length-1?v.value+1:0,h.value=0},V=()=>{h.value<P.value.contents.length-1?h.value+=1:N()},K=()=>{h.value>0?h.value-=1:J()},M=e=>e.map(s=>ke(s)?s:t(s[0],s[1])),W=e=>{if(e.type==="customField"){const s=He[e.index]||"$content",[o,w=""]=Re(s)?s[b.value].split("$content"):s.split("$content");return e.display.map(n=>t("div",M([o,...n,w])))}return e.display.map(s=>t("div",M(s)))},C=()=>{v.value=0,h.value=0,l("updateQuery",""),l("close")},X=()=>k?t("ul",{class:"search-pro-result-list"},t("li",{class:"search-pro-result-list-item"},[t("div",{class:"search-pro-result-title"},i.value.queryHistory),y.value.map((e,s)=>t("div",{class:["search-pro-result-item",{active:u.isQuery&&u.index===s}],onClick:()=>{l("updateQuery",e)}},[t(j,{class:"search-pro-result-type"}),t("div",{class:"search-pro-result-content"},e),t("button",{class:"search-pro-remove-icon",innerHTML:I,onClick:o=>{o.preventDefault(),o.stopPropagation(),q(s)}})]))])):null,Z=()=>H?t("ul",{class:"search-pro-result-list"},t("li",{class:"search-pro-result-list-item"},[t("div",{class:"search-pro-result-title"},i.value.resultHistory),c.value.map((e,s)=>t($,{to:e.link,class:["search-pro-result-item",{active:!u.isQuery&&u.index===s}],onClick:()=>{C()}},()=>[t(j,{class:"search-pro-result-type"}),t("div",{class:"search-pro-result-content"},[e.header?t("div",{class:"content-header"},e.header):null,t("div",e.display.map(o=>M(o)).flat())]),t("button",{class:"search-pro-remove-icon",innerHTML:I,onClick:o=>{o.preventDefault(),o.stopPropagation(),x(s)}})]))])):null;return ie("keydown",e=>{if(a.isFocusing){if(O.value){if(e.key==="ArrowUp")K();else if(e.key==="ArrowDown")V();else if(e.key==="Enter"){const s=P.value.contents[h.value];d(a.queries.join(" ")),R(s),r.push(D(s)),C()}}else if(H){if(e.key==="ArrowUp")B();else if(e.key==="ArrowDown")z();else if(e.key==="Enter"){const{index:s}=u;u.isQuery?(l("updateQuery",y.value[s]),e.preventDefault()):(r.push(c.value[s].link),C())}}}}),Y([v,h],()=>{var e;(e=document.querySelector(".search-pro-result-list-item.active .search-pro-result-item.active"))==null||e.scrollIntoView(!1)},{flush:"post"}),()=>t("div",{class:["search-pro-result-wrapper",{empty:a.queries.length?!O.value:!A.value}],id:"search-pro-results"},a.queries.length?p.value?t(oe,{hint:i.value.searching}):O.value?t("ul",{class:"search-pro-result-list"},m.value.map(({title:e,contents:s},o)=>{const w=v.value===o;return t("li",{class:["search-pro-result-list-item",{active:w}]},[t("div",{class:"search-pro-result-title"},e||i.value.defaultTitle),s.map((n,ee)=>{const F=w&&h.value===ee;return t($,{to:D(n),class:["search-pro-result-item",{active:F,"aria-selected":F}],onClick:()=>{d(a.queries.join(" ")),R(n),C()}},()=>[n.type==="text"?null:t(n.type==="title"?ne:n.type==="heading"?ce:ve,{class:"search-pro-result-type"}),t("div",{class:"search-pro-result-content"},[n.type==="text"&&n.header?t("div",{class:"content-header"},n.header):null,t("div",W(n))])])})])})):i.value.emptyResult:E?A.value?[X(),Z()]:i.value.emptyHistory:i.value.emptyResult)}});export{Ee as default};
