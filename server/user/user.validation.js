const Joi = require('joi');

module.exports = {
  getUser: {
    params: {
      userID: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
    }
  },
  updateUser: {
    params: {
      userID: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
    }
  },
  deleteUser: {
    params: {
      userID: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
    }
  }
};
