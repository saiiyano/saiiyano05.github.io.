const CACHE_NAME = 'pichprint-v1';
const urlsToCache = [
    '/',
    '/index.php',
    '/css/style.css',
    '/site.js',
    '/img/fax.png',
    '/img/Белый фон.png',   // фон section1
    '/img/printer-1.png',   // принтер section1
    '/img/block5.png',      // фон section3
    'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',  // Swiper CSS
    'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
    '/db.php',              // если нужен оффлайн
    '/save_callback.php',   // обработка форм
    'img/icon-192.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});