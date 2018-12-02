const cfg = require('../../cfg');

const getTransporter = service => {
  if (service === 'sendGrid') {
    return {
      service: 'sendGrid',
      auth: {
        user: cfg.api.sendGrid.user,
        pass: cfg.api.sendGrid.pass
      }
    };
  }

  return {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: cfg.api.ethereal.user,
      pass: cfg.api.ethereal.pass
    }
  };
};

module.exports = getTransporter;
