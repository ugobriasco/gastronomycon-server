const { User } = require('../user');

async function findUser(email) {
  try {
    return await User.findOne({ email });
  } catch (e) {
    console.log(err);
    return;
  }
}

module.exports = findUser;
