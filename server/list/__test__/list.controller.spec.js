const expect = require('chai').expect;
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const sinon = require('sinon');
require('sinon-mongoose');
const sem= require('sinon-express-mock');


//Object Under test
const List = require('../list.model');
const listCtrl = require('../list.controller');

describe('list.controller', () => {



	// it('should find a List', (done) =>{

	// 	const mockRes = {'data':[{'_id': 'foo'}]}

	// 	sinon.mock(List)
	// 		.expects('find')
	// 		.yields(mockRes, 'SUCCESS');

	// 	listCtrl.getAllLists().then(function(res){
	// 		assert(res, 'SUCCESS');
	// 		done();
	// 	});


	// });
})