// sw.js
const CACHE_NAME = 'chday169-v1';
const urlsToCache = [
  './',
  './index.html',
  './assets/style.css',
  './viewer_geo.html',
  './viewer_scr.html',
  './viewer_foc.html',
  './js/path-resolver.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.min.js'
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