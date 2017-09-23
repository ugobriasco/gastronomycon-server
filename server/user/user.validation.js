const Joi = require('joi');

module.exports = {

	
	getUser:{
		params:{
			objID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
		}
	},

	updateUser:{
		params:{
			objID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
		}
	},

	deleteUser:{
		
	}

}