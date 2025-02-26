const CACHE_NAME = 'portfolio-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/images/profile.jpg',
  '/icons/logo192.jpg',
  '/icons/logo512.jpg',
  '/icons/favicon.ico',
  '/icons/icon-16x16.png',
  '/icons/icon-32x32.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache).catch(error => {
          console.error('Cache addAll error:', error);
          // Continue with installation even if some assets fail to cache
          return Promise.resolve();
        });
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request because it's a stream that can only be consumed once
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then((response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response because it's a stream that can only be consumed once
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              })
              .catch(error => {
                console.error('Cache put error:', error);
              });

            return response;
          })
          .catch(error => {
            console.error('Fetch error:', error);
            // You might want to return a custom offline page here
            return new Response('Offline');
          });
      })
  );
});
