const CACHE_NAME = 'sharon-infotech-v2';

const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/assets/sharon_infotech_nagpur_1784884270967.webp',
  '/assets/sharon_infotech_nagpur_1784884270967.jpg',
  '/assets/sharon_infotech_nagpur.webp',
  '/assets/sharon_infotech_nagpur.jpg',
  '/assets/laptop_repair_hero_1784882127140.webp',
  '/assets/laptop_repair_hero_1784882127140.jpg',
  '/assets/doorstep_technician_1784882139268.webp',
  '/assets/doorstep_technician_1784882139268.jpg'
];

// 1. Install Event - Pre-cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch((err) => {
        console.warn('[SW] Core asset pre-cache partial warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// 2. Activate Event - Clean up stale caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event - Optimized caching strategy for 98+ Mobile Performance
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Skip non-GET requests, browser extension requests, dev server vite endpoints, and API calls
  if (
    request.method !== 'GET' ||
    !request.url.startsWith('http') ||
    request.url.includes('/@vite') ||
    request.url.includes('/@fs') ||
    request.url.includes('/@id') ||
    request.url.includes('node_modules') ||
    request.url.includes('/api/')
  ) {
    return;
  }

  // Strategy A: Page Navigations -> Network First, Fallback to Cached HTML
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || caches.match('/index.html');
          });
        })
    );
    return;
  }

  // Strategy B: Static Assets (JS, CSS, Images, Fonts) -> Stale-While-Revalidate
  const isStaticAsset =
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'image' ||
    request.destination === 'font' ||
    /\.(js|css|png|jpg|jpeg|webp|svg|woff2?|json)(\?.*)?$/i.test(request.url);

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        // Fetch fresh asset in background to revalidate cache
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const copy = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        // Return cached version immediately if available, otherwise wait for network
        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Default Strategy: Network First
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
