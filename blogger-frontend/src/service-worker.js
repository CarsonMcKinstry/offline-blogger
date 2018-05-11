/* global importScripts workbox Dexie self*/

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');
importScripts('https://cdnjs.cloudflare.com/ajax/libs/dexie/2.0.3/dexie.min.js');


workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

workbox.routing.registerRoute(
  'http://localhost:4000/api/topics',
  workbox.strategies.networkFirst({
    cacheName: 'blog-cache'
  })
);

class PostSync {
  constructor(dbName, dbVersion, dbTable, tableSchema, interval) {

    this.db = new Dexie(dbName);
    this.db.version(dbVersion).stores({
      [dbTable]: tableSchema
    });
    this.table = dbTable;
    this.tryInterval = interval;
    this.syncInterval = null;

    this.getUnsyncedPosts = this.getUnsyncedPosts.bind(this);
    this.syncPosts = this.syncPosts.bind(this);
  }

  genOptions(post) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        post: {
          author: post.author,
          title: post.title,
          body: post.body,
          topic_id: post.topic_id,
          index_db_id: post.id
        }
      })
    };
  }

  checkConnection() {
    return fetch('http://localhost:4000/api/health')
      .then(res => res.status === 200);
  }

  getUnsyncedPosts() {
    return this.db[this.table]
      .filter(el => !el.synced)
      .toArray();
  }

  syncPosts(posts) {
    if (posts.length > 0) {
      return Promise.all(
        posts.map(post => {
          const options = this.genOptions(post);
          return fetch('http://localhost:4000/api/posts', options)
            .then(res => res.json())
            .then(res => res.data)
            .then(post => {
              return this.db[this.table].update(post.index_db_id, {synced: true});
            })
            .then(post => {
              console.log(post);
              console.log('Synced post!');
            });
        })
      );
    } else {
      console.log(`You're all synced!`);
    }
  }

  runSync() {
    this.syncInterval = setInterval(() => {
      console.log('Starting sync attempt')
      this.checkConnection()
        .then(this.getUnsyncedPosts)
        .then(this.syncPosts)
        .catch( err => {
          console.log('There was an error while trying to sync');
          console.log(err);
        })
    }, this.tryInterval)
  }

  startSync() {
    this.runSync();
  }

  stopSync() {
    clearInterval(this.syncInterval);
  }
}

// const syncer = new PostSync('unsynced_posts', 1, 'posts', '++id, inserted_at, updated_at, title, author, topic_id, body, synced', 60000);

// syncer.startSync();

// const bgSyncPlugin = new workbox.backgroundSync.Plugin('unsynced-posts', {
//   maxRetentionTime: 24 * 60
// });

// workbox.routing.registerRoute(
//   'http://localhost:4000/api/posts',
//   workbox.strategies.networkOnly({
//     plugins: [bgSyncPlugin]
//   }),
//   'POST'
// );

self.addEventListener('push', function(e) {
  console.log(e);
});

self.addEventListener('sync', function(e) {
  console.log(e);
})