var cacheName = 'litematerials-qwq-';
var contentToCache = [
    // './',
    './index.html',
    './favicon.png',
    './output.css'
];

self.addEventListener("install", function (e) {
    console.log("[Service Worker] Install");
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log("[Service Worker] Caching all: app shell and content");
            return cache.addAll(contentToCache);
        }),
    );
});


self.addEventListener("fetch", function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            console.log("[Service Worker] Fetching resource: " + e.request.url);
            return (
                r ||
                fetch(e.request).then(function (response) {
                    return caches.open(cacheName).then(function (cache) {
                        console.log(
                            "[Service Worker] Caching new resource: " + e.request.url,
                        );
                        cache.put(e.request, response.clone()).catch(ex => {console.log('[Service Worker] Maybe something is trying caching contents from plugins, which idiot?')});
                        return response;
                    });
                })
            );
        }),
    );
});

self.addEventListener("activate", function (e) {
    console.log(e);
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(
                keyList.map(function (key) {
                    if (cacheName.indexOf(key) === -1) {
                        return caches.delete(key);
                    }
                }),
            );
        }),
    );
});

