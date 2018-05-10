const express = require('express');
const path = require('path');

const app = express();

const buildPath = path.join(__dirname, 'build');
const staticBuild = express.static(buildPath);

app.use(staticBuild);

app.listen(8080, () => {
  console.log('Production server listening on 8080');
});
