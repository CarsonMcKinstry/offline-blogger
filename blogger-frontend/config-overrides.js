const {
  rewireWorkboxInject,
  defaultInjectConfig
} = require('react-app-rewire-workbox');
const path = require('path');

module.exports = function override(config, env) {
  if (env === 'production') {
    console.log('Production build - Adding Workbox for PWAs');
    const workboxConfig = Object.assign(
      {
        swSrc: path.join(__dirname, 'src', 'service-worker.js')
      },
      defaultInjectConfig
    );
    // config = rewireWorkboxGenerate()(config, env);
    return rewireWorkboxInject(workboxConfig)(config, env);
  }

  return config;
};
