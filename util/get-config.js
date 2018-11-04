function getConfig() {
  try {
    const cfg = require('../cfg');
    return cfg;
  } catch (ex) {
    console.log('no config found, procede with default');
    return {
      secret: 'visit matchyourtie.com!', //jwt secret
      db: {
        local: 'mongodb://localhost:27017/grocerybot',
        remote: ''
      }
    };
  }
}

module.exports = getConfig;
