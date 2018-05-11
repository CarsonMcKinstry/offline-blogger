import Dexie from 'dexie';

class PostSync {
  constructor(dbName, dbVersion, dbTable, tableSchema, interval) {

    this.db = new Dexie(dbName);
    this.db.version(dbVersion).stores({
      [dbTable]: tableSchema
    });
    this.table = dbTable;
    this.tryInterval = interval;
    this.syncInterval = null;
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

  getUnsyncedPosts = () => {
    return this.db[this.table]
      .filter(el => !el.synced)
      .toArray();
  }

  syncPosts = (posts) => {
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

window.PostSync = PostSync;

window.syncer = new PostSync('unsynced_posts', 1, 'posts', '++id, inserted_at, updated_at, title, author, topic_id, body, synced', 10000);

// window.syncer.startSync();