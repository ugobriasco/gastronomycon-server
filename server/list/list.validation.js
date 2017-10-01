const Joi = require('joi');



module.exports = {
	
	postList:{
		body:{
			ownerID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
			data: Joi.array()
		}
	},

	getList:{
		params:{
			objID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
			//userID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
		}
		
	},

	deleteList:{
		params:{
			objID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
			//userID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
		}

	},

	replaceListItem:{
		params:{
			objID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
			//userID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
		},
		body:{
			data: Joi.array()
		}
	},
	shareList:{
		params:{
			objID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
			//userID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
		}
	},

	unshareList:{
		params:{
			objID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
			//userID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
		}
	}

}




