const CACHE = 'control-horas-v1';
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./', './index.html'])));
  self.skipWaiting();
});
self.addEventListener('activate', e => { self.clients.claim(); });
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetchPromise = fetch(e.request).then(resp => {
        caches.open(CACHE).then(c => c.put(e.request, resp.clone()));
        return resp;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
