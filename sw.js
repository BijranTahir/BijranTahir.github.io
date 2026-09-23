const CACHE='tb-biolab-v1';
const CORE=['./','index.html','style.css','app.js','profile.json','research.json','projects.json','library.json','timeline.json','content.json','categories.json','protocols.json','publications.json','experiments.json','labnotes.json','bio_tools.json','pwa-manifest.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>cached)))});
