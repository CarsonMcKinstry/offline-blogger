/* global importScripts workbox Dexie Axios*/

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

function sendPost(post) {
  const uri = `http://localhost:4000/api/posts`
  const options = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      post: post
    })
  }
  // console.log(options);
  fetch(uri, options)
    .then(res => res.json())
    .then(console.log);
}

setInterval(() => {
  db.posts
    .filter(post => !post.synced)
    .toArray()
    .then(posts => {
      Promise.all(posts.map(sendPost));
    })
    .catch(console.error);
}, 1000 * 15);