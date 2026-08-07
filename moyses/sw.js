const CACHE = 'moyses-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './favicon.png',
  './botao.png',
  './media/AclamemosEvangelo.mp3',
  './media/AplaudaForte.mp3',
  './media/DomJoserAntonio.mp3',
  './media/FilaDaComunhao.mp3',
  './media/HonrandoNossaMae.mp3',
  './media/NaoEhUmClube.mp3',
  './media/Obstacularizando.mp3',
  './media/PreparadoReconciliacao.mp3',
  './media/DePe.mp3',
  './media/Agradicer.mp3',
  './media/QueQueAGracas.mp3',
  './media/EiVoce.mp3',
  './media/JaEstaNaHora.mp3',
  './media/BomDiaMeuIrmao.mp3',
  './media/EntaoPeco.mp3',
  './media/Risada.mp3',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
