const staticFiles = [
    '/',
    '/index.html',
    '/assets/css/style.css',
    '/assets/css/font-awesome.min.css',
    '/assets/js/script.js',
    '/assets/fonts/fontawesome-webfont.eot',
    '/assets/fonts/fontawesome-webfont.svg',
    '/assets/fonts/fontawesome-webfont.ttf',
    '/assets/fonts/fontawesome-webfont.woff',
    '/assets/fonts/fontawesome-webfont.woff2',
    '/assets/fonts/FontAwesome.otf',
];
const staticCacheName = 'static-cache-v3';

self.addEventListener('install', (e) => {
    console.log('[Service worker] Installing service worker');
    e.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            console.log('[Service worker] Precaching app shell');
            cache.addAll(staticFiles).catch((err) => {
                    console.log('Error in caching: ', err);
            });
        })
    );
});

self.addEventListener('activate', (e) => {
    console.log('[Service worker] Activating service worker');
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(keys.map((key) => {
                if (key !== staticCacheName) {
                    console.log('[Service worker] Activating service worker');
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});
