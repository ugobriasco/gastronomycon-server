// https://stackoverflow.com/questions/24153261/joining-tests-from-multiple-files-with-mocha-js
describe('api v1.0', function() {
  require('./v1.0/test/api.auth.login.spec.js');
  require('./v1.0/test/api.auth.signup.spec.js');
  require('./v1.0/test/api.item.spec.js');
  require('./v1.0/test/api.list.spec.js');
  require('./v1.0/test/api.user.spec.js');
});
