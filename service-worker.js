// AquaForce Training v2 — Service Worker
// v2.2: network-first para el app shell, para evitar que el cache
// sirva versiones viejas indefinidamente cuando el navegador no
// detecta cambios en este mismo archivo entre despliegues.
const CACHE = 'aquaforce-v2.2';

// App shell: siempre se intenta traer fresco de la red primero.
const APP_SHELL = ['./', './index.html', './styles.css', './app.js', './manifest.json'];

// Assets externos que rara vez cambian: cache-first está bien para estos.
const STATIC_ASSETS = [
  'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.js',
  'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.wasm',
  'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700;800;900&family=Barlow:wght@300;400;500;600&family=Rajdhani:wght@400;500;600;700&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll([...APP_SHELL, ...STATIC_ASSETS]))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function isAppShellRequest(url) {
  // Mismo origen y es un archivo del app shell (HTML/CSS/JS/manifest) o navegación.
  const sameOrigin = url.origin === self.location.origin;
  if (!sameOrigin) return false;
  return APP_SHELL.some(path => url.pathname.endsWith(path.replace('./', '/'))) 
    || url.pathname === self.registration.scope.replace(self.location.origin, '');
}

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // Navegaciones y app shell → network-first, con fallback a cache si no hay red.
  if (e.request.mode === 'navigate' || isAppShellRequest(url)) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() =>
          caches.match(e.request).then(cached => cached || caches.match('./index.html'))
        )
    );
    return;
  }

  // Todo lo demás (fuentes, sql.js, etc.) → cache-first como antes.
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => {
        if (e.request.mode === 'navigate') return caches.match('./index.html');
      });
    })
  );
});
