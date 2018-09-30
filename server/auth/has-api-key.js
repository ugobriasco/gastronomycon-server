const { App } = require('../apps');
const { recordUsage } = require('../metrics');

//checks is the user has a valid apikey
const hasApiKey = (req, res, next) => {
  if (!req.headers['x-api-key']) {
    return res
      .status(401)
      .json({ message: 'No api key provided', headers: req.headers });
  } else {
    const api_key = req.headers['x-api-key'];
    findApp(api_key)
      .then(app => {
        if (!app) {
          return res
            .status(401)
            .json({ message: 'Failed ApiKey Verification' });
        } else {
          recordUsage(app.user_id);
          next();
        }
      })
      .catch(err => res.status(500).send(err));
  }
};

async function findApp(api_key) {
  try {
    return await App.findOne({ api_key });
  } catch (e) {
    console.log(err);
    return;
  }
}

module.exports = { hasApiKey };
