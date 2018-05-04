import Dexie from 'dexie';
import moment from 'moment';
const logI = i => { console.log(i); return i};
const db = new Dexie('unsynced_posts');

db.version(1).stores({
  posts: '++id, inserted_at, updated_at, title, author, topic_id, body, synced'
});

export const createPost = ({
  inserted_at = moment().toISOString(), 
  updated_at = moment().toISOString(), 
  synced = false,
  title, 
  body, 
  author, 
  topic
  }) => {

  return db.posts.put({inserted_at: inserted_at,updated_at:updated_at,synced:synced,title:title,body:body,author:author,topic_id:topic})
    .then(logI)
    .catch(console.log);
} 

export const getUnsavedPosts = () => {
  return db.posts.filter(post => !post.synced).toArray()
    .then(logI)
    .catch(console.log)
}
