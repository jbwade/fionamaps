const CACHE_NAME = 'studio-v1';

const FILES = [
  '/',
  '/index.html',

  // Laboratorio
  '/Mappe_Concettuali_Fondamenti_Suono.html',
  '/Flashcards_Interattive_Fondamenti_Suono.html',
  '/Appunti_Bilingui_Suono.html',
  '/Glossario_Suono.html',

  // Lingua e Letteratura — Grammatica
  '/Mappe_Concettuali_Grammatica.html',
  '/Flashcards_Interattive_Grammatica.html',
  '/Appunti_Bilingui_Grammatica.html',
  '/Glossario_Grammatica.html',

  // Lingua e Letteratura — Epica
  '/Mappe_Concettuali_Epica.html',
  '/Flashcards_Interattive_Epica.html',
  '/Appunti_Bilingui_Epica.html',
  '/Glossario_Epica.html',
];

// Instala: cachea todos los archivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
  );
  self.skipWaiting();
});

// Activa: elimina cachés viejos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: sirve desde caché, si no está intenta red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).catch(() =>
        caches.match('/index.html')
      );
    })
  );
});
