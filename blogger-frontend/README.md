# Offline Blogger Front-end

This is a Proof of Concept for background sync of data. This uses service workers and the new Worbox library from Google. 

\*This current version has only been tested in Chrome.

To view the ServiceWorkorder: [service-worker.js](src/service-worker.js)

### How it works

On initial page load, a service worker is installed in your browser, which sets off a chain of events.

1. An interval is started for the background sync process
2. Each interval, a health check endpoint is fetched to confirm that the computer is online
3. Any posts (in this example) that have a value of `false` for `synced` in IndexDB are extracted.
4. An attempt is then made to push each of the posts to the server. All that come back well formed are updated in IndexedDB to have a value of `true` for `synced`
5. At any point, if a request fails (such as for the health check), an error is thrown by `fetch` and the interval will start again.

#### TODO:

- Handle failed `POST` requests to the server
- Test in other browsers that accept the ServiceWorker spec
- Figure out how to handle versioning of the database and the service worker
- Handle pushes and notifications
   - This could be used to stop and start syncing
   - also for checking out the database