import e,{useCallback as t,useState as r,useRef as a,useEffect as n}from"react";import{atomFamily as o,DefaultValue as c,selectorFamily as l,useRecoilState as s}from"recoil";const i=()=>{try{return localStorage}catch{return}},u=o({key:"routeCache",default:{},effects:[({setSelf:e,onSet:t,node:r})=>{const a=i()?.getItem(r.key);a&&e(JSON.parse(a)),t((e=>{e instanceof c?i()?.removeItem(r.key):i()?.setItem(r.key,JSON.stringify(e))}))}]}),g=l({key:"routeLoading",get:e=>({get:t})=>t(u(e)).loading,set:e=>({set:t},r)=>{t(u(e),(e=>({...e,loading:r})))}}),y=l({key:"routeError",get:e=>({get:t})=>t(u(e)).error,set:e=>({set:t},r)=>{t(u(e),(e=>({...e,error:r})))}}),d=l({key:"routeData",get:e=>({get:t})=>t(u(e)).data,set:e=>({set:t},r)=>{t(u(e),(e=>({...e,data:r})))}}),m=e=>{const r=e.apiUrl+e.path,a=e.client(),[n,o]=s(d(r)),[c,l]=s(y(r)),[i,u]=s(g(r));return[t((async e=>{let t;u(!0);try{t=await a(e),o(t)}catch(e){l(e)}finally{return u(!1),t}}),[e]),{data:n,error:c,loading:i}]},f=e=>{const[a,n]=r(),[o,c]=r(),[l,s]=r(!1);return[t((async t=>{let r;s(!0);try{r=await e(t),n(r)}catch(e){c(e)}finally{return s(!1),r}}),[e]),{data:a,error:o,loading:l}]},h=({children:t,clients:r,router:o})=>{const c=a(!1);return n((()=>{!c.current&&r&&o&&(c.current=!0,o.methodClients(r))}),[o,r]),e.createElement(e.Fragment,null,t)};export{h as RouterContextProvider,m as useCachedRoute,f as useRoute};
//# sourceMappingURL=index.js.map
