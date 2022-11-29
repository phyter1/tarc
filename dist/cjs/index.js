"use strict";var e=require("react"),t=require("recoil");const r=t.atomFamily({key:"routeCache",default:{}}),n=t.selectorFamily({key:"routeLoading",get:e=>({get:t})=>t(r(e)).loading,set:e=>({set:t},n)=>{t(r(e),(e=>({...e,loading:n})))}}),a=t.selectorFamily({key:"routeError",get:e=>({get:t})=>t(r(e)).error,set:e=>({set:t},n)=>{t(r(e),(e=>({...e,error:n})))}}),o=t.selectorFamily({key:"routeData",get:e=>({get:t})=>t(r(e)).data,set:e=>({set:t},n)=>{t(r(e),(e=>({...e,data:n})))}});var s={},i=e=>encodeURIComponent(e).replace(/[!'()*]/g,(e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`)),c=new RegExp("%[a-f0-9]{2}","gi"),u=new RegExp("(%[a-f0-9]{2})+","gi");function l(e,t){try{return decodeURIComponent(e.join(""))}catch(e){}if(1===e.length)return e;t=t||1;var r=e.slice(0,t),n=e.slice(t);return Array.prototype.concat.call([],l(r),l(n))}function p(e){try{return decodeURIComponent(e)}catch(n){for(var t=e.match(c),r=1;r<t.length;r++)t=(e=l(t,r).join("")).match(c);return e}}var f=function(e){if("string"!=typeof e)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof e+"`");try{return e=e.replace(/\+/g," "),decodeURIComponent(e)}catch(t){return function(e){for(var t={"%FE%FF":"��","%FF%FE":"��"},r=u.exec(e);r;){try{t[r[0]]=decodeURIComponent(r[0])}catch(e){var n=p(r[0]);n!==r[0]&&(t[r[0]]=n)}r=u.exec(e)}t["%C2"]="�";for(var a=Object.keys(t),o=0;o<a.length;o++){var s=a[o];e=e.replace(new RegExp(s,"g"),t[s])}return e}(e)}},d=(e,t)=>{if("string"!=typeof e||"string"!=typeof t)throw new TypeError("Expected the arguments to be of type `string`");if(""===t)return[e];const r=e.indexOf(t);return-1===r?[e]:[e.slice(0,r),e.slice(r+t.length)]},y=function(e,t){for(var r={},n=Object.keys(e),a=Array.isArray(t),o=0;o<n.length;o++){var s=n[o],i=e[s];(a?-1!==t.indexOf(s):t(s,i,e))&&(r[s]=i)}return r};!function(e){const t=i,r=f,n=d,a=y,o=Symbol("encodeFragmentIdentifier");function s(e){if("string"!=typeof e||1!==e.length)throw new TypeError("arrayFormatSeparator must be single character string")}function c(e,r){return r.encode?r.strict?t(e):encodeURIComponent(e):e}function u(e,t){return t.decode?r(e):e}function l(e){return Array.isArray(e)?e.sort():"object"==typeof e?l(Object.keys(e)).sort(((e,t)=>Number(e)-Number(t))).map((t=>e[t])):e}function p(e){const t=e.indexOf("#");return-1!==t&&(e=e.slice(0,t)),e}function g(e){const t=(e=p(e)).indexOf("?");return-1===t?"":e.slice(t+1)}function m(e,t){return t.parseNumbers&&!Number.isNaN(Number(e))&&"string"==typeof e&&""!==e.trim()?e=Number(e):!t.parseBooleans||null===e||"true"!==e.toLowerCase()&&"false"!==e.toLowerCase()||(e="true"===e.toLowerCase()),e}function h(e,t){s((t=Object.assign({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},t)).arrayFormatSeparator);const r=function(e){let t;switch(e.arrayFormat){case"index":return(e,r,n)=>{t=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),t?(void 0===n[e]&&(n[e]={}),n[e][t[1]]=r):n[e]=r};case"bracket":return(e,r,n)=>{t=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),t?void 0!==n[e]?n[e]=[].concat(n[e],r):n[e]=[r]:n[e]=r};case"colon-list-separator":return(e,r,n)=>{t=/(:list)$/.exec(e),e=e.replace(/:list$/,""),t?void 0!==n[e]?n[e]=[].concat(n[e],r):n[e]=[r]:n[e]=r};case"comma":case"separator":return(t,r,n)=>{const a="string"==typeof r&&r.includes(e.arrayFormatSeparator),o="string"==typeof r&&!a&&u(r,e).includes(e.arrayFormatSeparator);r=o?u(r,e):r;const s=a||o?r.split(e.arrayFormatSeparator).map((t=>u(t,e))):null===r?r:u(r,e);n[t]=s};case"bracket-separator":return(t,r,n)=>{const a=/(\[\])$/.test(t);if(t=t.replace(/\[\]$/,""),!a)return void(n[t]=r?u(r,e):r);const o=null===r?[]:r.split(e.arrayFormatSeparator).map((t=>u(t,e)));void 0!==n[t]?n[t]=[].concat(n[t],o):n[t]=o};default:return(e,t,r)=>{void 0!==r[e]?r[e]=[].concat(r[e],t):r[e]=t}}}(t),a=Object.create(null);if("string"!=typeof e)return a;if(!(e=e.trim().replace(/^[?#&]/,"")))return a;for(const o of e.split("&")){if(""===o)continue;let[e,s]=n(t.decode?o.replace(/\+/g," "):o,"=");s=void 0===s?null:["comma","separator","bracket-separator"].includes(t.arrayFormat)?s:u(s,t),r(u(e,t),s,a)}for(const e of Object.keys(a)){const r=a[e];if("object"==typeof r&&null!==r)for(const e of Object.keys(r))r[e]=m(r[e],t);else a[e]=m(r,t)}return!1===t.sort?a:(!0===t.sort?Object.keys(a).sort():Object.keys(a).sort(t.sort)).reduce(((e,t)=>{const r=a[t];return Boolean(r)&&"object"==typeof r&&!Array.isArray(r)?e[t]=l(r):e[t]=r,e}),Object.create(null))}e.extract=g,e.parse=h,e.stringify=(e,t)=>{if(!e)return"";s((t=Object.assign({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},t)).arrayFormatSeparator);const r=r=>t.skipNull&&null==e[r]||t.skipEmptyString&&""===e[r],n=function(e){switch(e.arrayFormat){case"index":return t=>(r,n)=>{const a=r.length;return void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?r:null===n?[...r,[c(t,e),"[",a,"]"].join("")]:[...r,[c(t,e),"[",c(a,e),"]=",c(n,e)].join("")]};case"bracket":return t=>(r,n)=>void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?r:null===n?[...r,[c(t,e),"[]"].join("")]:[...r,[c(t,e),"[]=",c(n,e)].join("")];case"colon-list-separator":return t=>(r,n)=>void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?r:null===n?[...r,[c(t,e),":list="].join("")]:[...r,[c(t,e),":list=",c(n,e)].join("")];case"comma":case"separator":case"bracket-separator":{const t="bracket-separator"===e.arrayFormat?"[]=":"=";return r=>(n,a)=>void 0===a||e.skipNull&&null===a||e.skipEmptyString&&""===a?n:(a=null===a?"":a,0===n.length?[[c(r,e),t,c(a,e)].join("")]:[[n,c(a,e)].join(e.arrayFormatSeparator)])}default:return t=>(r,n)=>void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?r:null===n?[...r,c(t,e)]:[...r,[c(t,e),"=",c(n,e)].join("")]}}(t),a={};for(const t of Object.keys(e))r(t)||(a[t]=e[t]);const o=Object.keys(a);return!1!==t.sort&&o.sort(t.sort),o.map((r=>{const a=e[r];return void 0===a?"":null===a?c(r,t):Array.isArray(a)?0===a.length&&"bracket-separator"===t.arrayFormat?c(r,t)+"[]":a.reduce(n(r),[]).join("&"):c(r,t)+"="+c(a,t)})).filter((e=>e.length>0)).join("&")},e.parseUrl=(e,t)=>{t=Object.assign({decode:!0},t);const[r,a]=n(e,"#");return Object.assign({url:r.split("?")[0]||"",query:h(g(e),t)},t&&t.parseFragmentIdentifier&&a?{fragmentIdentifier:u(a,t)}:{})},e.stringifyUrl=(t,r)=>{r=Object.assign({encode:!0,strict:!0,[o]:!0},r);const n=p(t.url).split("?")[0]||"",a=e.extract(t.url),s=e.parse(a,{sort:!1}),i=Object.assign(s,t.query);let u=e.stringify(i,r);u&&(u=`?${u}`);let l=function(e){let t="";const r=e.indexOf("#");return-1!==r&&(t=e.slice(r)),t}(t.url);return t.fragmentIdentifier&&(l=`#${r[o]?c(t.fragmentIdentifier,r):t.fragmentIdentifier}`),`${n}${u}${l}`},e.pick=(t,r,n)=>{n=Object.assign({parseFragmentIdentifier:!0,[o]:!1},n);const{url:s,query:i,fragmentIdentifier:c}=e.parseUrl(t,n);return e.stringifyUrl({url:s,query:a(i,r),fragmentIdentifier:c},n)},e.exclude=(t,r,n)=>{const a=Array.isArray(r)?e=>!r.includes(e):(e,t)=>!r(e,t);return e.pick(t,a,n)}}(s);const g=new Map([["get",({apiUrl:e,path:t,inputShape:r,outputShape:n})=>async a=>{const o=r.parse(a),i=await fetch(e+t+"?"+s.stringify(o,{encode:!0}),{method:"GET",headers:{"Content-Type":"application/json"}});return n.parse(await i.json())}],["post",({apiUrl:e,path:t,inputShape:r,outputShape:n})=>async a=>{const o=r.parse(a),s=await fetch(e+t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}),i=await s.json();return n.parse(i)}]]),m=new Map([["get",({inputShape:e,outputShape:t,context:r,handler:n})=>async(a,o)=>{const s=e.parse(a.query),i=await n({req:a,res:o,context:r,input:s});o.status(200).json(t.parse(i))}],["post",({inputShape:e,outputShape:t,context:r,handler:n})=>async(a,o)=>{const s=e.parse(a.body),i=await n({req:a,res:o,context:r,input:s});o.status(200).json(t.parse(i))}]]);exports.Router=({contextShape:e,apiUrl:t="/api"})=>{let r;return{route:({method:n,path:a,inputShape:o,outputShape:s})=>{let i=[];const c=m.get(n)??m.get("post");return{apiUrl:t,path:a,routeMiddleware:i,inputShape:o,outputShape:s,contextShape:e,handler:e=>async(t,n)=>{for(const e of i||[])await e(t,n);if(await(()=>{if(!r)throw new Error("createContext not set");return r})()(t,n))return c({inputShape:o,outputShape:s,context:await r(t,n),handler:e})(t,n);n.status(500).json({status:"error",message:"no context"})},client:()=>(g.get(n)??g.get("post"))({apiUrl:t,path:a,inputShape:o,outputShape:s}),middleware:(...e)=>{i=[...i,...e]}}},context:e=>{r=e},methodHandlers:e=>{for(const[t,r]of e)m.set(t,r)},methodClients:e=>{for(const[t,r]of e)g.set(t,r)}}},exports.RouterContextProvider=({children:r,clients:n,router:a})=>{const o=e.useRef(!1);return e.useEffect((()=>{!o.current&&n&&a&&(o.current=!0,a.methodClients(n))}),[a,n]),e.createElement(t.RecoilRoot,null,r)},exports.useCachedRoute=r=>{const s=r.apiUrl+r.path,i=r.client(),[c,u]=t.useRecoilState(o(s)),[l,p]=t.useRecoilState(a(s)),[f,d]=t.useRecoilState(n(s));return[e.useCallback((async e=>{let t;d(!0);try{t=await i(e),u(t)}catch(e){p(e)}finally{return d(!1),t}}),[r]),{data:c,error:l,loading:f}]},exports.useRoute=t=>{const[r,n]=e.useState(),[a,o]=e.useState(),[s,i]=e.useState(!1);return[e.useCallback((async e=>{let r;i(!0);try{r=await t(e),n(r)}catch(e){o(e)}finally{return i(!1),r}}),[t]),{data:r,error:a,loading:s}]};
//# sourceMappingURL=index.js.map
