if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,o)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let t={};const l=e=>i(e,r),c={module:{uri:r},exports:t,require:l};s[r]=Promise.all(n.map((e=>c[e]||l(e)))).then((e=>(o(...e),t)))}}define(["./workbox-b833909e"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/icons-UgI65uT9.js",revision:null},{url:"assets/index-CtJf4Dk7.css",revision:null},{url:"assets/index-CY4oZiJM.js",revision:null},{url:"assets/vendor-DWWlUyaL.js",revision:null},{url:"images/profile.jpg",revision:"80060fd4b7331747a32979481ec701ec"},{url:"index.html",revision:"8746841f3bffea93e062c8f7e1bf3183"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"images/profile.jpg",revision:"80060fd4b7331747a32979481ec701ec"},{url:"manifest.webmanifest",revision:"58a263f6a1b26ac59a79652e8210987b"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-cache",plugins:[new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
