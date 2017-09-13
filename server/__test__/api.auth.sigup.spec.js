const async = require('async');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const should = chai.should();
const t  = require('./testdata');

chai.use(chaiHttp);

const host = t.host;
const signupCode = t.signupCode;


let testUser = {
	email: `${new Date().toISOString()}@test.com`,
	password: new Date().toISOString(),
	token: '',
	id: '',
}

describe('/signup', () =>{

	after((done) => {
		let admin = {};
		async.series([
			getAdminToken = (cb) => {
				chai.request(host)
				  	.post('/login')
				  	.set('content-type', 'application/x-www-form-urlencoded') 
				  	.send({email: 'foo', password: 'foo'})
				  	.end((err, res) => {
				    	admin.token = `Bearer ${res.body.token}`;
				    	cb();
				    	
					});
			},
			deleteTestUser = (cb) => {
				chai.request(host)
					.delete(`/user/${testUser.id}`)
				    .set('Authorization', admin.token)
				    .end((err, res) => {
				    	cb();
				    });
			}
		], done);
	});

	it('it should register a new user returning a 201 and a token', (done) => {

		let user1 = {email: testUser.email, password: testUser.password, signupCode: signupCode}

		chai.request(host)
		.post('/signup')
		.set('content-type', 'application/x-www-form-urlencoded')	
		.send(user1)
		.end((err, res) => {
			res.should.have.status(201);
			res.body.should.be.a('object');
			res.body.should.have.property('token');
			testUser.token = res.body.token;
			testUser.id = res.body.user._id;
			done();
		});
	});

	it('it should respond 422 for signup without email', (done) => {
		let user = {password: testUser.email}

		chai.request(host)
		.post('/signup')
		.send(user)
		.end((err, res) => {
			res.should.have.status(422);
			res.body.should.not.have.property('token');
			done();
		});
	});
	it('it should respond 422 for signup without password', (done) => {
		let user = {email: testUser.email}

		chai.request(host)
		.post('/signup')
		.send(user)
		.end((err, res) => {
			res.should.have.status(422);
			res.body.should.not.have.property('token');
			done();
		});
	});

	it('it should respond 422 for signup without signupCode - if set', (done) => {
		let user = {email: testUser.email, password: testUser.password}

		chai.request(host)
		.post('/signup')
		.send(user)
		.end((err, res) => {
			res.should.have.status(422);
			res.body.should.not.have.property('token');
			done();
		});
	});


	it('it should respond 422 with wrong req.body', (done) => {
		let user = {apples: 2}

		chai.request(host)
		.post('/signup')
		.send(user)
		.end((err, res) => {
			res.should.have.status(422);
			res.body.should.not.have.property('token');
			done();
		});
	});
	
	it('it should not register a already existing user, sending back a 422', (done) => {
		let user = {email: testUser.email, password: testUser.password, signupCode: signupCode}

		chai.request(host)
		.post('/signup')
		.send(user)
		.end((err, res) => {
			res.should.have.status(422);
			res.body.should.not.have.property('token');
			done();
		});
	});

	it('it should not register a user with role Admin, sending back a 422', (done) =>{

		let badUser = {
			email: `${new Date().toISOString()}@test.com`,
			password: new Date().toISOString(),
			role: 'Admin',
		}

		chai.request(host)
		.post('/signup')
		.send(badUser)
		.end((err, res) => {
			res.should.have.status(422);
			res.body.should.not.have.property('token');
			done();
		});

	});


});

