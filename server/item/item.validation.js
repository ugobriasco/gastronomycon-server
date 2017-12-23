const Joi = require('joi');
const regex_weburl = require('./regex-weburl');

module.exports = {
  getItem: {
    params: {
      objID: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
    }
  },
  postItem: {
    body: {
      type: Joi.string(),
      pic: Joi.string().regex(regex_weburl),
      name: Joi.string()
    }
  },
  queryItems: {
    query: Joi.any()
  },

  getItem: {
    params: {
      objID: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
    }
  },

  deleteItem: {
    params: {
      objID: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
    }
  },

  updateItem: {
    params: {
      objID: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
    },
    body: {
      type: Joi.string(),
      pic: Joi.string().regex(regex_weburl),
      name: Joi.string()
    }
  }
};
