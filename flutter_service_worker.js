'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "f1c2003286e96445b91decd943f76ec1",
"assets/AssetManifest.bin.json": "a374f12ad43ea47d9a01c1a6b4b0ffb7",
"assets/AssetManifest.json": "7db9b5df53611d02317f7dfb4d141213",
"assets/assets/fonts/Anta-Regular.ttf": "08dc1c5893bfab96b496642e402e21fa",
"assets/assets/icons/dart.svg": "92974b2449f737099360ddd29c5407e8",
"assets/assets/icons/firebase.svg": "ec06500b6cdc4ae7375c888eaf37e45d",
"assets/assets/icons/flutter.svg": "806ab8f34071fc083ac830859b03daea",
"assets/assets/icons/github.png": "9181c9cf2ee47b4265ac43d46f09bea5",
"assets/assets/icons/intellij.svg": "c627cb550b8ea5decc59f6f1ed14540a",
"assets/assets/icons/java.svg": "8cec15fedaea5cd03b4e598a3563aa44",
"assets/assets/icons/javascript.svg": "d5d77aefa83930c13cf045624225d314",
"assets/assets/icons/linkedin.png": "efdb74ff3631151062095b0c9b228c21",
"assets/assets/icons/linux.svg": "4ae06d5cae3c9d7c9bfc81f0803fed67",
"assets/assets/icons/mongodb.svg": "bb53e0f5b71dce7a02044acbc92421c5",
"assets/assets/icons/mysql.svg": "3cd295d4ffe2d77dcacaf100a6ba7cc5",
"assets/assets/icons/node.svg": "1934018e48a34591194e798dff9e6274",
"assets/assets/icons/postman.svg": "c364da8cfee0770c569ec66e26d90c57",
"assets/assets/icons/python.svg": "94e1299a7a9fc20f039f1b87afe47ebb",
"assets/assets/icons/vscode.svg": "7dffabb946954c76fe27b81a26cd2b42",
"assets/assets/images/colorful-laptop.png": "ac996c4f524441d294668ba48a22f83d",
"assets/assets/images/dev-laptop-icon.png": "7d61790247ab65f067135b0c0daa6da1",
"assets/assets/images/flutterleb-logo.png": "627ec873c947f2d57888b2a6182255e2",
"assets/assets/images/gts-logo.png": "8a8718dadaa00fcf0d90e2a4b554814e",
"assets/assets/images/mobimind-logo.jpg": "e72557cbd21ac67d0e6d757ff01c9f75",
"assets/assets/images/my-pic.jpeg": "d32fbad81e79b02df99c55c2185516ee",
"assets/assets/images/projects.png": "a533379e00f47e2563db14636eeeb8c2",
"assets/assets/patterns/geometry.png": "f10544eca8100262ce520c5192b6f65e",
"assets/assets/patterns/gplay.png": "d1b4cc17fbb3149178c9a1a6a47e33fb",
"assets/FontManifest.json": "ef164245f863c3cf33a7733f7ae63a10",
"assets/fonts/MaterialIcons-Regular.otf": "f1a12940d0139b2e683c5f45fe419790",
"assets/loading_indicator.gif": "138b5454293bbacc0480f29cdba98b3f",
"assets/loading_indicator_old.gif": "27208728864163d97bf73a6a8143e693",
"assets/NOTICES": "a975ee0b4321c246e92f557b910eedb9",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "7737f5fc722b6a040ac15271ea8d92fb",
"canvaskit/canvaskit.js.symbols": "d0b3bf92014e698856d505a65b5f0ee9",
"canvaskit/canvaskit.wasm": "567c5aeda8f673d1b76256d2682fd3b9",
"canvaskit/chromium/canvaskit.js": "2f82009588e8a72043db753d360d488f",
"canvaskit/chromium/canvaskit.js.symbols": "e3a8db3bea434c929936f69d84e2f2bd",
"canvaskit/chromium/canvaskit.wasm": "e86670fe2af62cbdd3b75e098f393924",
"canvaskit/skwasm.js": "445e9e400085faead4493be2224d95aa",
"canvaskit/skwasm.js.symbols": "f1b800f6a9fac877f65a545b9f76c703",
"canvaskit/skwasm.wasm": "5a5c6171d2eed658e3b5fff70c4af82c",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.ico": "98d85bcac0e16b6e613d88d4fbe050ae",
"flutter.js": "4af2b91eb221b73845365e1302528f07",
"icons/Icon-192.png": "542246ba19ea49f5f563bb6e71e79154",
"icons/Icon-512.png": "4db89457a3be73a4cd32deec5d4e62a2",
"icons/Icon-maskable-192.png": "0c3e9ea0777832f9de70f0f95cb8707b",
"icons/Icon-maskable-512.png": "59e8dcc36155a86cb6c62bc8765512b7",
"index.html": "4628a40ab6529b4058142e94ae6219b2",
"/": "4628a40ab6529b4058142e94ae6219b2",
"main.dart.js": "ad7978dc428eb5c50f24543c09332dbb",
"manifest.json": "9b9cfe17dd20eb5bfae09859b73de334",
"version.json": "528590cfb00fc1ca502120db4808bb64"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
