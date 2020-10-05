const package = require('../../../package.json');

const PROXY_CONFIG = {
  '/api/auth/*': {
    target: `http://localhost:${package.config.dev.apiauth.port}`,
    secure: false,
    logLevel: 'debug',
    changeOrigin: true,
  },
};

module.exports = PROXY_CONFIG;
