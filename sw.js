if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const f=e=>s(e,t),l={module:{uri:t},exports:o,require:f};i[t]=Promise.all(n.map((e=>l[e]||f(e)))).then((e=>(r(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-DKLlQ4Qq.css",revision:null},{url:"assets/index-nVxiEo99.js",revision:null},{url:"index.html",revision:"cca7a341c31fc981ff36f285f2443273"},{url:"registerSW.js",revision:"3f366c9f21feaf33a41305aa79d7e72c"},{url:"manifest.webmanifest",revision:"9532f1ebf661089d133ee5dd0b4080d5"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
