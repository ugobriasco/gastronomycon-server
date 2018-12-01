const findUser = require('./user-find');

const activateAccount = (token, email) => {
  if (!token || !email) return false;

  findUser(email).then(user => {
    //TODO find {name:'activation', 'value': "fhdgjgbskg"} then compare the value with the given tokens
    // if match set isActive=true && delete the above mentioned token
    // return true
    // catch err with false
  });
};

module.exports = activateAccount;
