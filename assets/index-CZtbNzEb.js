(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const fe="modulepreload",me=function(t){return"/"+t},q={},V=function(e,n,i){let s=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),a=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));s=Promise.all(n.map(o=>{if(o=me(o),o in q)return;q[o]=!0;const d=o.endsWith(".css"),l=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${l}`))return;const g=document.createElement("link");if(g.rel=d?"stylesheet":fe,d||(g.as="script",g.crossOrigin=""),g.href=o,a&&g.setAttribute("nonce",a),document.head.appendChild(g),d)return new Promise((v,T)=>{g.addEventListener("load",v),g.addEventListener("error",()=>T(new Error(`Unable to preload CSS for ${o}`)))})}))}return s.then(()=>e()).catch(r=>{const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=r,window.dispatchEvent(a),!a.defaultPrevented)throw r})};/*! Capacitor: https://capacitorjs.com/ - MIT License */const ge=t=>{const e=new Map;e.set("web",{name:"web"});const n=t.CapacitorPlatforms||{currentPlatform:{name:"web"},platforms:e},i=(r,a)=>{n.platforms.set(r,a)},s=r=>{n.platforms.has(r)&&(n.currentPlatform=n.platforms.get(r))};return n.addPlatform=i,n.setPlatform=s,n},he=t=>t.CapacitorPlatforms=ge(t),J=he(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});J.addPlatform;J.setPlatform;var O;(function(t){t.Unimplemented="UNIMPLEMENTED",t.Unavailable="UNAVAILABLE"})(O||(O={}));class R extends Error{constructor(e,n,i){super(e),this.message=e,this.code=n,this.data=i}}const ye=t=>{var e,n;return t!=null&&t.androidBridge?"android":!((n=(e=t==null?void 0:t.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||n===void 0)&&n.bridge?"ios":"web"},pe=t=>{var e,n,i,s,r;const a=t.CapacitorCustomPlatform||null,o=t.Capacitor||{},d=o.Plugins=o.Plugins||{},l=t.CapacitorPlatforms,g=()=>a!==null?a.name:ye(t),v=((e=l==null?void 0:l.currentPlatform)===null||e===void 0?void 0:e.getPlatform)||g,T=()=>v()!=="web",te=((n=l==null?void 0:l.currentPlatform)===null||n===void 0?void 0:n.isNativePlatform)||T,re=c=>{const u=$.get(c);return!!(u!=null&&u.platforms.has(v())||W(c))},ne=((i=l==null?void 0:l.currentPlatform)===null||i===void 0?void 0:i.isPluginAvailable)||re,se=c=>{var u;return(u=o.PluginHeaders)===null||u===void 0?void 0:u.find(E=>E.name===c)},W=((s=l==null?void 0:l.currentPlatform)===null||s===void 0?void 0:s.getPluginHeader)||se,oe=c=>t.console.error(c),ie=(c,u,E)=>Promise.reject(`${E} does not have an implementation of "${u}".`),$=new Map,ae=(c,u={})=>{const E=$.get(c);if(E)return console.warn(`Capacitor plugin "${c}" already registered. Cannot register plugins twice.`),E.proxy;const L=v(),C=W(c);let w;const ce=async()=>(!w&&L in u?w=typeof u[L]=="function"?w=await u[L]():w=u[L]:a!==null&&!w&&"web"in u&&(w=typeof u.web=="function"?w=await u.web():w=u.web),w),de=(f,m)=>{var y,P;if(C){const b=C==null?void 0:C.methods.find(h=>m===h.name);if(b)return b.rtype==="promise"?h=>o.nativePromise(c,m.toString(),h):(h,S)=>o.nativeCallback(c,m.toString(),h,S);if(f)return(y=f[m])===null||y===void 0?void 0:y.bind(f)}else{if(f)return(P=f[m])===null||P===void 0?void 0:P.bind(f);throw new R(`"${c}" plugin is not implemented on ${L}`,O.Unimplemented)}},x=f=>{let m;const y=(...P)=>{const b=ce().then(h=>{const S=de(h,f);if(S){const U=S(...P);return m=U==null?void 0:U.remove,U}else throw new R(`"${c}.${f}()" is not implemented on ${L}`,O.Unimplemented)});return f==="addListener"&&(b.remove=async()=>m()),b};return y.toString=()=>`${f.toString()}() { [capacitor code] }`,Object.defineProperty(y,"name",{value:f,writable:!1,configurable:!1}),y},N=x("addListener"),H=x("removeListener"),ue=(f,m)=>{const y=N({eventName:f},m),P=async()=>{const h=await y;H({eventName:f,callbackId:h},m)},b=new Promise(h=>y.then(()=>h({remove:P})));return b.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await P()},b},j=new Proxy({},{get(f,m){switch(m){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return C?ue:N;case"removeListener":return H;default:return x(m)}}});return d[c]=j,$.set(c,{name:c,proxy:j,platforms:new Set([...Object.keys(u),...C?[L]:[]])}),j},le=((r=l==null?void 0:l.currentPlatform)===null||r===void 0?void 0:r.registerPlugin)||ae;return o.convertFileSrc||(o.convertFileSrc=c=>c),o.getPlatform=v,o.handleError=oe,o.isNativePlatform=te,o.isPluginAvailable=ne,o.pluginMethodNoop=ie,o.registerPlugin=le,o.Exception=R,o.DEBUG=!!o.DEBUG,o.isLoggingEnabled=!!o.isLoggingEnabled,o.platform=o.getPlatform(),o.isNative=o.isNativePlatform(),o},we=t=>t.Capacitor=pe(t),k=we(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),A=k.registerPlugin;k.Plugins;class Y{constructor(e){this.listeners={},this.retainedEventArguments={},this.windowListeners={},e&&(console.warn(`Capacitor WebPlugin "${e.name}" config object was deprecated in v3 and will be removed in v4.`),this.config=e)}addListener(e,n){let i=!1;this.listeners[e]||(this.listeners[e]=[],i=!0),this.listeners[e].push(n);const r=this.windowListeners[e];r&&!r.registered&&this.addWindowListener(r),i&&this.sendRetainedArgumentsForEvent(e);const a=async()=>this.removeListener(e,n);return Promise.resolve({remove:a})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,n,i){const s=this.listeners[e];if(!s){if(i){let r=this.retainedEventArguments[e];r||(r=[]),r.push(n),this.retainedEventArguments[e]=r}return}s.forEach(r=>r(n))}hasListeners(e){return!!this.listeners[e].length}registerWindowListener(e,n){this.windowListeners[n]={registered:!1,windowEventName:e,pluginEventName:n,handler:i=>{this.notifyListeners(n,i)}}}unimplemented(e="not implemented"){return new k.Exception(e,O.Unimplemented)}unavailable(e="not available"){return new k.Exception(e,O.Unavailable)}async removeListener(e,n){const i=this.listeners[e];if(!i)return;const s=i.indexOf(n);this.listeners[e].splice(s,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const n=this.retainedEventArguments[e];n&&(delete this.retainedEventArguments[e],n.forEach(i=>{this.notifyListeners(e,i)}))}}const F=t=>encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),K=t=>t.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class ve extends Y{async getCookies(){const e=document.cookie,n={};return e.split(";").forEach(i=>{if(i.length<=0)return;let[s,r]=i.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=K(s).trim(),r=K(r).trim(),n[s]=r}),n}async setCookie(e){try{const n=F(e.key),i=F(e.value),s=`; expires=${(e.expires||"").replace("expires=","")}`,r=(e.path||"/").replace("path=",""),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${n}=${i||""}${s}; path=${r}; ${a};`}catch(n){return Promise.reject(n)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(n){return Promise.reject(n)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const n of e)document.cookie=n.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}A("CapacitorCookies",{web:()=>new ve});const Pe=async t=>new Promise((e,n)=>{const i=new FileReader;i.onload=()=>{const s=i.result;e(s.indexOf(",")>=0?s.split(",")[1]:s)},i.onerror=s=>n(s),i.readAsDataURL(t)}),be=(t={})=>{const e=Object.keys(t);return Object.keys(t).map(s=>s.toLocaleLowerCase()).reduce((s,r,a)=>(s[r]=t[e[a]],s),{})},Le=(t,e=!0)=>t?Object.entries(t).reduce((i,s)=>{const[r,a]=s;let o,d;return Array.isArray(a)?(d="",a.forEach(l=>{o=e?encodeURIComponent(l):l,d+=`${r}=${o}&`}),d.slice(0,-1)):(o=e?encodeURIComponent(a):a,d=`${r}=${o}`),`${i}&${d}`},"").substr(1):null,Ee=(t,e={})=>{const n=Object.assign({method:t.method||"GET",headers:t.headers},e),s=be(t.headers)["content-type"]||"";if(typeof t.data=="string")n.body=t.data;else if(s.includes("application/x-www-form-urlencoded")){const r=new URLSearchParams;for(const[a,o]of Object.entries(t.data||{}))r.set(a,o);n.body=r.toString()}else if(s.includes("multipart/form-data")||t.data instanceof FormData){const r=new FormData;if(t.data instanceof FormData)t.data.forEach((o,d)=>{r.append(d,o)});else for(const o of Object.keys(t.data))r.append(o,t.data[o]);n.body=r;const a=new Headers(n.headers);a.delete("content-type"),n.headers=a}else(s.includes("application/json")||typeof t.data=="object")&&(n.body=JSON.stringify(t.data));return n};class Ce extends Y{async request(e){const n=Ee(e,e.webFetchExtra),i=Le(e.params,e.shouldEncodeUrlParams),s=i?`${e.url}?${i}`:e.url,r=await fetch(s,n),a=r.headers.get("content-type")||"";let{responseType:o="text"}=r.ok?e:{};a.includes("application/json")&&(o="json");let d,l;switch(o){case"arraybuffer":case"blob":l=await r.blob(),d=await Pe(l);break;case"json":d=await r.json();break;case"document":case"text":default:d=await r.text()}const g={};return r.headers.forEach((v,T)=>{g[T]=v}),{data:d,headers:g,status:r.status,url:r.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}A("CapacitorHttp",{web:()=>new Ce});const _=A("DBR",{web:()=>V(()=>import("./web-D173lvCP.js"),[]).then(t=>new t.DBRWeb)});var z;(function(t){t[t.RESOLUTION_AUTO=0]="RESOLUTION_AUTO",t[t.RESOLUTION_480P=1]="RESOLUTION_480P",t[t.RESOLUTION_720P=2]="RESOLUTION_720P",t[t.RESOLUTION_1080P=3]="RESOLUTION_1080P",t[t.RESOLUTION_2K=4]="RESOLUTION_2K",t[t.RESOLUTION_4K=5]="RESOLUTION_4K"})(z||(z={}));const p=A("CameraPreview",{web:()=>V(()=>import("./web-CxUrWxxh.js"),[]).then(t=>new t.CameraPreviewWeb)});let B=!1,G=!1,Q,D,M,Oe=document.getElementById("closeButton"),I=document.getElementById("startScanButton"),Te=document.getElementById("toggleTorchButton");I.addEventListener("click",Ue);Oe.addEventListener("click",Z);Te.addEventListener("click",$e);Se();async function Se(){I.innerText="Initializing...",Capacitor.isNativePlatform()||await p.setElement(document.getElementsByClassName("camera")[0]),await p.initialize(),await _.initLicense({license:"DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ=="}),await _.initialize(),D&&await D.remove(),M&&await M.remove(),D=await p.addListener("onPlayed",async t=>{console.log("onPlayed"),console.log(t),Ie()}),M=await p.addListener("onOrientationChanged",async()=>{console.log("onOrientationChanged")}),await p.requestCameraPermission(),I.innerText="Start Live Scan",I.disabled=""}async function Ue(){X(!0),await p.startCamera()}function X(t){t?(document.getElementsByClassName("home")[0].style.display="none",document.getElementsByClassName("controls")[0].style.display="",document.body.style.background="transparent"):(document.getElementsByClassName("home")[0].style.display="",document.getElementsByClassName("controls")[0].style.display="none",document.body.style.background="white")}async function Z(){ee(),await p.stopCamera(),X(!1)}function Ie(){ee(),Q=setInterval(ke,200)}function ee(){clearInterval(Q)}async function ke(){if(B===!0)return;let t=[],e;B=!0;try{Capacitor.isNativePlatform()?(await p.saveFrame(),t=(await _.decodeBitmap({})).results):(e="data:image/jpeg;base64,"+(await p.takeSnapshot({quality:50})).base64,t=await Ae(e)),console.log(t),t.length>0&&(Z(),_e(t))}catch(n){console.log(n)}B=!1}function _e(t){let e=document.getElementById("results"),n=document.createElement("ol");for(let i=0;i<t.length;i++){const s=t[i];let r=document.createElement("li");r.innerText=s.barcodeFormat+": "+s.barcodeText,n.appendChild(r)}e.innerHTML=n.outerHTML}async function Ae(t){return(await _.decode({source:t})).results}async function $e(){try{let t=!G;await p.toggleTorch({on:t}),G=t}catch(t){alert(t)}}export{z as E,Y as W};
