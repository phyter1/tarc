import t,{useCallback as e,useState as r,createContext as n,useRef as a,useEffect as o}from"react";import{atomFamily as s,DefaultValue as i,selectorFamily as c,useRecoilState as p}from"recoil";import{z as u}from"zod";const l=()=>{try{return localStorage}catch{return}},f=s({key:"routeCache",default:{},effects:[({setSelf:t,onSet:e,node:r})=>{const n=l()?.getItem(r.key);n&&t(JSON.parse(n)),e((t=>{t instanceof i?l()?.removeItem(r.key):l()?.setItem(r.key,JSON.stringify(t))}))}]}),d=c({key:"routeLoading",get:t=>({get:e})=>e(f(t)).loading,set:t=>({set:e},r)=>{e(f(t),(t=>({...t,loading:r})))}}),y=c({key:"routeError",get:t=>({get:e})=>e(f(t)).error,set:t=>({set:e},r)=>{e(f(t),(t=>({...t,error:r})))}}),g=c({key:"routeData",get:t=>({get:e})=>e(f(t)).data,set:t=>({set:e},r)=>{e(f(t),(t=>({...t,data:r})))}}),m=t=>{const r=t.apiUrl+t.path,n=t.client(),[a,o]=p(g(r)),[s,i]=p(y(r)),[c,u]=p(d(r));return[e((async t=>{let e;u(!0);try{e=await n(t),o(e)}catch(t){i(t)}finally{return u(!1),e}}),[t]),{data:a,error:s,loading:c}]},h=t=>{const[n,a]=r(),[o,s]=r(),[i,c]=r(!1);return[e((async e=>{let r;c(!0);try{r=await t(e),a(r)}catch(t){s(t)}finally{return c(!1),r}}),[t]),{data:n,error:o,loading:i}]},S=n(void 0),b=({children:e,clients:r,router:n})=>{const s=a(!1);return o((()=>{!s.current&&r&&n&&(s.current=!0,n.methodClients(r))}),[n,r]),t.createElement(S.Provider,{value:void 0},e)};var j={},k=t=>encodeURIComponent(t).replace(/[!'()*]/g,(t=>`%${t.charCodeAt(0).toString(16).toUpperCase()}`)),x=new RegExp("%[a-f0-9]{2}","gi"),w=new RegExp("(%[a-f0-9]{2})+","gi");function v(t,e){try{return decodeURIComponent(t.join(""))}catch(t){}if(1===t.length)return t;e=e||1;var r=t.slice(0,e),n=t.slice(e);return Array.prototype.concat.call([],v(r),v(n))}function O(t){try{return decodeURIComponent(t)}catch(n){for(var e=t.match(x),r=1;r<e.length;r++)e=(t=v(e,r).join("")).match(x);return t}}var F=function(t){if("string"!=typeof t)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof t+"`");try{return t=t.replace(/\+/g," "),decodeURIComponent(t)}catch(e){return function(t){for(var e={"%FE%FF":"��","%FF%FE":"��"},r=w.exec(t);r;){try{e[r[0]]=decodeURIComponent(r[0])}catch(t){var n=O(r[0]);n!==r[0]&&(e[r[0]]=n)}r=w.exec(t)}e["%C2"]="�";for(var a=Object.keys(e),o=0;o<a.length;o++){var s=a[o];t=t.replace(new RegExp(s,"g"),e[s])}return t}(t)}},E=(t,e)=>{if("string"!=typeof t||"string"!=typeof e)throw new TypeError("Expected the arguments to be of type `string`");if(""===e)return[t];const r=t.indexOf(e);return-1===r?[t]:[t.slice(0,r),t.slice(r+e.length)]},I=function(t,e){for(var r={},n=Object.keys(t),a=Array.isArray(e),o=0;o<n.length;o++){var s=n[o],i=t[s];(a?-1!==e.indexOf(s):e(s,i,t))&&(r[s]=i)}return r};!function(t){const e=k,r=F,n=E,a=I,o=Symbol("encodeFragmentIdentifier");function s(t){if("string"!=typeof t||1!==t.length)throw new TypeError("arrayFormatSeparator must be single character string")}function i(t,r){return r.encode?r.strict?e(t):encodeURIComponent(t):t}function c(t,e){return e.decode?r(t):t}function p(t){return Array.isArray(t)?t.sort():"object"==typeof t?p(Object.keys(t)).sort(((t,e)=>Number(t)-Number(e))).map((e=>t[e])):t}function u(t){const e=t.indexOf("#");return-1!==e&&(t=t.slice(0,e)),t}function l(t){const e=(t=u(t)).indexOf("?");return-1===e?"":t.slice(e+1)}function f(t,e){return e.parseNumbers&&!Number.isNaN(Number(t))&&"string"==typeof t&&""!==t.trim()?t=Number(t):!e.parseBooleans||null===t||"true"!==t.toLowerCase()&&"false"!==t.toLowerCase()||(t="true"===t.toLowerCase()),t}function d(t,e){s((e=Object.assign({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},e)).arrayFormatSeparator);const r=function(t){let e;switch(t.arrayFormat){case"index":return(t,r,n)=>{e=/\[(\d*)\]$/.exec(t),t=t.replace(/\[\d*\]$/,""),e?(void 0===n[t]&&(n[t]={}),n[t][e[1]]=r):n[t]=r};case"bracket":return(t,r,n)=>{e=/(\[\])$/.exec(t),t=t.replace(/\[\]$/,""),e?void 0!==n[t]?n[t]=[].concat(n[t],r):n[t]=[r]:n[t]=r};case"colon-list-separator":return(t,r,n)=>{e=/(:list)$/.exec(t),t=t.replace(/:list$/,""),e?void 0!==n[t]?n[t]=[].concat(n[t],r):n[t]=[r]:n[t]=r};case"comma":case"separator":return(e,r,n)=>{const a="string"==typeof r&&r.includes(t.arrayFormatSeparator),o="string"==typeof r&&!a&&c(r,t).includes(t.arrayFormatSeparator);r=o?c(r,t):r;const s=a||o?r.split(t.arrayFormatSeparator).map((e=>c(e,t))):null===r?r:c(r,t);n[e]=s};case"bracket-separator":return(e,r,n)=>{const a=/(\[\])$/.test(e);if(e=e.replace(/\[\]$/,""),!a)return void(n[e]=r?c(r,t):r);const o=null===r?[]:r.split(t.arrayFormatSeparator).map((e=>c(e,t)));void 0!==n[e]?n[e]=[].concat(n[e],o):n[e]=o};default:return(t,e,r)=>{void 0!==r[t]?r[t]=[].concat(r[t],e):r[t]=e}}}(e),a=Object.create(null);if("string"!=typeof t)return a;if(!(t=t.trim().replace(/^[?#&]/,"")))return a;for(const o of t.split("&")){if(""===o)continue;let[t,s]=n(e.decode?o.replace(/\+/g," "):o,"=");s=void 0===s?null:["comma","separator","bracket-separator"].includes(e.arrayFormat)?s:c(s,e),r(c(t,e),s,a)}for(const t of Object.keys(a)){const r=a[t];if("object"==typeof r&&null!==r)for(const t of Object.keys(r))r[t]=f(r[t],e);else a[t]=f(r,e)}return!1===e.sort?a:(!0===e.sort?Object.keys(a).sort():Object.keys(a).sort(e.sort)).reduce(((t,e)=>{const r=a[e];return Boolean(r)&&"object"==typeof r&&!Array.isArray(r)?t[e]=p(r):t[e]=r,t}),Object.create(null))}t.extract=l,t.parse=d,t.stringify=(t,e)=>{if(!t)return"";s((e=Object.assign({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},e)).arrayFormatSeparator);const r=r=>e.skipNull&&null==t[r]||e.skipEmptyString&&""===t[r],n=function(t){switch(t.arrayFormat){case"index":return e=>(r,n)=>{const a=r.length;return void 0===n||t.skipNull&&null===n||t.skipEmptyString&&""===n?r:null===n?[...r,[i(e,t),"[",a,"]"].join("")]:[...r,[i(e,t),"[",i(a,t),"]=",i(n,t)].join("")]};case"bracket":return e=>(r,n)=>void 0===n||t.skipNull&&null===n||t.skipEmptyString&&""===n?r:null===n?[...r,[i(e,t),"[]"].join("")]:[...r,[i(e,t),"[]=",i(n,t)].join("")];case"colon-list-separator":return e=>(r,n)=>void 0===n||t.skipNull&&null===n||t.skipEmptyString&&""===n?r:null===n?[...r,[i(e,t),":list="].join("")]:[...r,[i(e,t),":list=",i(n,t)].join("")];case"comma":case"separator":case"bracket-separator":{const e="bracket-separator"===t.arrayFormat?"[]=":"=";return r=>(n,a)=>void 0===a||t.skipNull&&null===a||t.skipEmptyString&&""===a?n:(a=null===a?"":a,0===n.length?[[i(r,t),e,i(a,t)].join("")]:[[n,i(a,t)].join(t.arrayFormatSeparator)])}default:return e=>(r,n)=>void 0===n||t.skipNull&&null===n||t.skipEmptyString&&""===n?r:null===n?[...r,i(e,t)]:[...r,[i(e,t),"=",i(n,t)].join("")]}}(e),a={};for(const e of Object.keys(t))r(e)||(a[e]=t[e]);const o=Object.keys(a);return!1!==e.sort&&o.sort(e.sort),o.map((r=>{const a=t[r];return void 0===a?"":null===a?i(r,e):Array.isArray(a)?0===a.length&&"bracket-separator"===e.arrayFormat?i(r,e)+"[]":a.reduce(n(r),[]).join("&"):i(r,e)+"="+i(a,e)})).filter((t=>t.length>0)).join("&")},t.parseUrl=(t,e)=>{e=Object.assign({decode:!0},e);const[r,a]=n(t,"#");return Object.assign({url:r.split("?")[0]||"",query:d(l(t),e)},e&&e.parseFragmentIdentifier&&a?{fragmentIdentifier:c(a,e)}:{})},t.stringifyUrl=(e,r)=>{r=Object.assign({encode:!0,strict:!0,[o]:!0},r);const n=u(e.url).split("?")[0]||"",a=t.extract(e.url),s=t.parse(a,{sort:!1}),c=Object.assign(s,e.query);let p=t.stringify(c,r);p&&(p=`?${p}`);let l=function(t){let e="";const r=t.indexOf("#");return-1!==r&&(e=t.slice(r)),e}(e.url);return e.fragmentIdentifier&&(l=`#${r[o]?i(e.fragmentIdentifier,r):e.fragmentIdentifier}`),`${n}${p}${l}`},t.pick=(e,r,n)=>{n=Object.assign({parseFragmentIdentifier:!0,[o]:!1},n);const{url:s,query:i,fragmentIdentifier:c}=t.parseUrl(e,n);return t.stringifyUrl({url:s,query:a(i,r),fragmentIdentifier:c},n)},t.exclude=(e,r,n)=>{const a=Array.isArray(r)?t=>!r.includes(t):(t,e)=>!r(t,e);return t.pick(e,a,n)}}(j);const C=new Map([["get",({apiUrl:t,path:e,inputShape:r,outputShape:n})=>async a=>{const o=r.parse(a),s=await fetch(t+e+"?"+j.stringify(o,{encode:!0}),{method:"GET",headers:{"Content-Type":"application/json"}});return n.parse(await s.json())}],["post",({apiUrl:t,path:e,inputShape:r,outputShape:n})=>async a=>{const o=r.parse(a),s=await fetch(t+e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}),i=await s.json();return n.parse(i)}]]),N=new Map([["get",({inputShape:t,outputShape:e,context:r,handler:n})=>async(a,o)=>{const s=t.parse(a.query),i=await n({req:a,res:o,context:r,input:s});o.status(200).json(e.parse(i))}],["post",({inputShape:t,outputShape:e,context:r,handler:n})=>async(a,o)=>{const s=t.parse(a.body),i=await n({req:a,res:o,context:r,input:s});o.status(200).json(e.parse(i))}]]),U=({contextShape:t,apiUrl:e="/api/"})=>{let r;return{route:({method:n,path:a,inputShape:o,outputShape:s})=>{let i=[];const c=u.function().args(o).returns(u.promise(s)),p=u.function().args(u.object({input:o,context:t,req:u.any(),res:u.any()})).returns(u.promise(s)),l=N.get(n)??N.get("post");return{apiUrl:e,path:a,routeMiddleware:i,inputShape:o,outputShape:s,clientShape:c,serviceShape:p,contextShape:t,handler:t=>async(e,n)=>{for(const t of i||[])await t(e,n);if(await(()=>{if(!r)throw new Error("createContext not set");return r})()(e,n))return l({inputShape:o,outputShape:s,context:await r(e,n),handler:t})(e,n);n.status(500).json({status:"error",message:"no context"})},client:()=>(C.get(n)??C.get("post"))({apiUrl:e,path:a,inputShape:o,outputShape:s}),middleware:(...t)=>{i=[...i,...t]}}},context:t=>{r=t},methodHandlers:t=>{for(const[e,r]of t)N.set(e,r)},methodClients:t=>{for(const[e,r]of t)C.set(e,r)}}};export{U as Router,b as RouterContextProvider,m as useCachedRoute,h as useRoute};
//# sourceMappingURL=index.js.map