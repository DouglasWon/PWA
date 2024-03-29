var CACHE_NAME = 'cache‐v2'; 
var filesToCache = [
    './img/4.gif',    
    './img/2.gif',
    'noncache.html',
    'favicon.ico',      
    ];

self.addEventListener('install', function(event) {   
    event.waitUntil(     
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(filesToCache);     
        })   
    ); 
});

self.addEventListener('fetch', function(event) {
   event.respondWith(
     caches.match(event.request).then(function(response) {
       if (response) {
         return response;
       }
       return fetch(event.request);
     })
   );
});

self.addEventListener('activate', function(event) {

    var cacheWhitelist = ['cache‐v2', 'cache‐v1'];
  
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });


