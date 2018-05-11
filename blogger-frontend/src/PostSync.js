import Dexie from 'dexie';

class PostSync {
  constructor(dbName, dbVersion, dbTable, tableSchema, interval) {
    this.db = new Dexie(dbName)

    this.db.version(dbVersion).stores({
      [dbTable]: tableSchema
    });

    this.table = dbTable;
    this.tryInterval = interval;

    this.syncInterval = null;
  }

  async getUnsyncedPosts() {

    clearInterval(this.syncInterval);

    try {
      const unsyncedPosts = 
        await this.db[this.table]
          .filter(el => !el.synced)
          .toArray()
      
      console.log(unsyncedPosts);
    } catch(err) {
      console.log(err);
      // this.startSync();
    }
  }

  async checkConnection() {
    try {
      const connectionCheck = await fetch('http://localhost:4000/api/health');
      const statusCheck = await connectionCheck.status === 200;

      console.log(`connection is ${statusCheck ? 'on': 'off' }line`)
    } catch(err) {
      console.log(err);
    }
  }

  async checkStorageQuotas() {
    try {
      const storageQuotas = await navigator.storage.estimate();

      console.log(storageQuotas);
    } catch(err) {
      console.log(err);
    }
  }

  startSync() {
    this.syncInterval = setInterval(() => {
      if (this.checkConnection()) {
        this.getUnsyncedPosts();
      }
    }, this.tryInterval)
  }

  startPush() {

  }
}

window.PostSync = PostSync;