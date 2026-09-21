const V='lw-v36';const FILES=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./icon-180.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
/* cache-first for instant, offline-safe launches; refreshes the cache in the background when online */
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.open(V).then(ch=>ch.match(e.request,{ignoreSearch:true}).then(hit=>{const net=fetch(e.request).then(r=>{if(r&&(r.ok||r.type==='opaque'))ch.put(e.request,r.clone()).catch(()=>{});return r}).catch(()=>hit||ch.match('./index.html'));return hit||net})))});
