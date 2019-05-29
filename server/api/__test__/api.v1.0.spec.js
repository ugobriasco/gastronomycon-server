// https://stackoverflow.com/questions/24153261/joining-tests-from-multiple-files-with-mocha-js

describe('API v1.0 Integration Tests', () => {
  after(done => {
    require('../v1.0/test/cleanup.utils.js');
    done();
  });
  //require('../v1.0/test/api.auth.login.spec.js');
  //require('../v1.0/test/api.auth.signup.spec.js');
  //require('../v1.0/test/api.user.spec.js');
});
