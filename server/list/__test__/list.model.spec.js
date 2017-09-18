const expect = require('chai').expect;


//Object Under test
const List = require('../list.model');
const listCtrl = require('../list.controller');

describe('list.model', () => {
	it('requires allowedUsers when instanced',(done) => {
		let L = new List();
		L.validate(function(err){
			expect(err.errors.allowedUsers).to.exist;
			done();
		});


	});
})