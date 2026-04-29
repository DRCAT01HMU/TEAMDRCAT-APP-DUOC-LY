const CACHE_NAME = 'tdc-anatomy-v60-updated';
const urlsToCache = ['./', './index.html', './pdf-viewer.html', './manifest.json', 'https://cdn.tailwindcss.com', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', 'https://cdn-icons-png.flaticon.com/512/3004/3004458.png', 'https://unpkg.com/react@18/umd/react.production.min.js', 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js', 'https://unpkg.com/@babel/standalone/babel.min.js', './daicuonghetk.html', './giaiphaudaday.html', './giaiphaugan.html', './giaiphaugiannao.html', './giaiphaumuihau.html', './giaiphauruotgia.html', './giaiphauruotnon.html', './giaiphauthanhquan.html', './giaiphauthucquan.html', './giaiphautim.html', './giaiphautuy.html', './giaiphauvungmieng.html', './gpdainao.html', './heco1.html', './heco2.html', './heco3.html', './henoitiet.html', './hesinhducnam.html', './hesinhducnu.html', './hetimmachvahebachhuyet.html', './hevien.html', './khiphequanphoi.html', './machmauchiduoi.html', './machmauchitren.html', './machmaudauconao.html', './machmaungucbung.html', './mat.html', './phucmac.html', './tai.html', './thankinhso.html', './thankinhtuchu.html', './thannao.html', './thantietnieu.html', './tieunao.html', './tkchiduoi.html', './tkcochitren.html', './tuysong.html', './xuongkhop1.html', './xuongkhop2.html', './xuongkhop3.html'];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
          });
        }
        return networkResponse;
      }).catch(err => {});
      return cachedResponse || fetchPromise;
    })
  );
});
