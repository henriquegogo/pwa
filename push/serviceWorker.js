self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('sw-cache').then(function(cache) {
      return cache.addAll(['./', 'index.html']);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('sync', function(event) {
  (!self.ws || self.ws.readyState !== self.ws.OPEN) && (self.ws = new WebSocket("wss://connect.websocket.in/gogspush"));
  self.ws.onmessage = function(msg) {
    self.registration.showNotification('Push Notification', {
      body: msg.data,
    });
  }
});
