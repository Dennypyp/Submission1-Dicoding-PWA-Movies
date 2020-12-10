const CACHE_NAME = 'dinamikamovies';
var urlsToCache = [
    "/",
    "/manifest.json",
    "/nav.html",
    "/index.html",
    "/pages/home.html",
    "/pages/movies.html",
    "/pages/series.html",
    "/pages/genre.html",
    "/pages/about.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/image/icon.png",
    "/image/icon2.png",
    "/image/sample.jpg",
    "/image/sample2.jpg",
    "/image/sample3.jpg",
    "/image/sample4.jpg",
    "/image/sample5.jpg",
    "/image/sample6.jpg",
    "/image/sample7.jpg",
    "/image/sample8.jpg",
    "/image/sample9.jpg",
    "/image/sample10.jpg",
    "/image/series1.jpg",
    "/image/series2.jpg",
    "/image/series3.jpg",
    "/image/series4.jpg",
    "/image/series5.jpg",
    "/image/twit.png",
    "/image/fb.png",
    "/image/ig.png",
    "/image/denny.png"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(function (response) {
                if (response) {
                    console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                    return response;
                }

                console.log(
                    "ServiceWorker: Memuat aset dari server: ",
                    event.request.url
                );
                return fetch(event.request);
            })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});