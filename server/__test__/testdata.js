const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
let should = chai.should();
const host = "http://localhost:3000/api";
const signupCode = "foo";
chai.use(chaiHttp);


exports.host = host;
exports.signupCode = signupCode;


exports.createBasicUser = function(){

	let user = {
		email: `${new Date().toISOString()}@test.com`,
		password: new Date().toISOString(),
		token: '',
		id: '',
		role: 'User',
	};

	chai.request(host)
	  .post('/signup')
	  .set('content-type', 'application/x-www-form-urlencoded') 
	  .send({email: user.email, password: user.password, signupCode:'foo'})
	  .end((err, res) => {
	    user.token = res.body.token;
	    user.id = res.body.user._id;
	});

	return user
}


exports.getAdminToken = function(){
	let _token ='';
	chai.request(host)
	  	.post('/login')
	  	.set('content-type', 'application/x-www-form-urlencoded') 
	  	.send({email: 'foo', password: 'foo'})
	  	.end((err, res) => {
	    	_token = `Bearer ${res.body.token}`;
		});

	console.log(_token);
	return _token;
}