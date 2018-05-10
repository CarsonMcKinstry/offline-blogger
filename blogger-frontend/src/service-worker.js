/* global importScripts workbox Dexie*/

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');
importScripts('https://cdnjs.cloudflare.com/ajax/libs/dexie/2.0.3/dexie.min.js');

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

workbox.routing.registerRoute(
  'http://localhost:4000/api/topics',
  workbox.strategies.networkFirst({
    cacheName: 'blog-cache'
  })
);

const db = new Dexie('unsynced_posts');
// console.log(db);
db.version(1).stores({
  posts: '++id, inserted_at, updated_at, title, author, topic_id, body, synced'
});

setInterval(() => {
  db.posts.toArray().then(console.log).catch(console.error);
}, 5000);

// workbox.routing.registerRoute(
//   // Cache CSS files
//   /.*\.css/,
//   // Use cache but update in the background ASAP
//   workbox.strategies.staleWhileRevalidate({
//     // Use a custom cache name
//     cacheName: 'css-cache'
//   })
// );

// workbox.routing.registerRoute(
//   // Cache image files
//   /.*\.(?:png|jpg|jpeg|svg|gif)/,
//   // Use the cache if it's available
//   workbox.strategies.cacheFirst({
//     // Use a custom cache name
//     cacheName: 'image-cache',
//     plugins: [
//       new workbox.expiration.Plugin({
//         // Cache only 20 images
//         maxEntries: 20,
//         // Cache for a maximum of a week
//         maxAgeSeconds: 7 * 24 * 60 * 60
//       })
//     ]
//   })
// );
