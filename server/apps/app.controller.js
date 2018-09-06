const jwt = require('jsonwebtoken');
const cfg = require('../cfg');

const { App } = require('../apps');
const { User } = require('../user');

// GET all apps related to a given user
const getApps = (req, res) => {
  const user_id = getUserID(req);
  const app_id = getAppID(req);

  if (app_id) {
    return App.findById(app_id)
      .then(app => res.json(app))
      .catch(err =>
        res.status(404).send({ message: 'App not found', data: app_id })
      );
  }
  if (user_id) {
    return App.findOne({ user_id })
      .then(apps => res.send(apps))
      .catch(err =>
        res.status(404).send({ message: 'user not found', data: user_id })
      );
  } else {
    App.find()
      .then(apps => res.send(apps))
      .cathc(err => res.status(404).send({ message: 'no app found' }));
  }
};

// POST a new application for a given user
const postApp = (req, res) => {
  const user_id = getUserID(req);
  if (!user_id) return res.status(400).json({ message: 'missing user_id' });
  const app = new App({
    api_key: generateKey(user_id),
    app_name: req.body.app_name || '',
    user_id
  });
  app.save(err => {
    if (err) res.status(500).send(err);
    res.json({ message: 'app created', data: app });
  });
};

// PUT descriptive data of a given app
const putApp = (req, res) => {
  const appID = getAppID(req);
  const { app_name } = req;

  App.findById(appID, (err, app) => {
    if (err) res.status(500).send(err);
    app.app_id = app_id;

    app.save(err => {
      if (err) res.status(500).send(err);
      res.json(app);
    });
  });
};

// DELETE a given app
const deleteApp = (req, res) => {
  const appID = getAppID(req);
  App.findByIdAndRemove(appID, err => {
    if (err) res.status(500).send(err);
    res.json({ message: 'App ' + appID + ' removed' });
  });
};

// PUT an app by refrehing its api_key
const refreshKey = (req, res) => {
  App.findById(appID, (err, app) => {
    if (err) res.status(500).send(err);

    app.api_key = generateKey(app.user_id);
    app.save(err => {
      if (err) res.status(500).send(err);
      res.json(app);
    });
  });
  return res.send({ message: 'refresh key' });
};

// Generates api key given the user and secret
function generateKey(userID) {
  return jwt.sign({ userID }, cfg.secret);
}

const getUserID = req =>
  req.query.user_id || req.body.user_id || req.params.userID;
const getAppID = req => req.query.app_id || req.body.app_id || req.params.appID;

module.exports = { getApps, postApp, putApp, deleteApp, refreshKey };
