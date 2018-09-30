const {
  postUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser
} = require('./user.controller');
const User = require('./user.model');

module.exports = {
  User,
  postUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser
};
