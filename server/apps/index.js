const {
  getApps,
  postApp,
  putApp,
  deleteApp,
  refreshKey,
  getAllApps
} = require('./app.controller');
const App = require('./app.model');

module.exports = {
  App,
  getApps,
  postApp,
  putApp,
  deleteApp,
  refreshKey,
  getAllApps
};
