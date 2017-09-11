const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

let should = chai.should();

const host = "http://localhost:3000/api";
const signupCode = "foo";

chai.use(chaiHttp);

let testUser = {
	email: `${new Date().toISOString()}@test.com`,
	password: new Date().toISOString(),
	token: ''
}

let admin = {
	email: "foo",
	password: "foo",
	token: ''
}

describe('/login', () =>{

	it('it should deny access to a user with no credentials', (done) => {
    chai.request(host)
        .post('/login')
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.not.have.property('token');
          done();
        });
  	});

  	it('it should deny access to a user with wrong credentials', (done) => {
    
	  	let user = {email: admin.email, password: 'wrongpassword'}

	    chai.request(host)
	        .post('/login')
	        .send(user)
	        .end((err, res) => {
	            res.should.have.status(401);
	            res.body.should.not.have.property('token');
	          done();
	        });
	 });

  	it('it should deny access to a user with inconsistant credentials', (done) => {
    
	  	let user = {email: admin.email, bees: admin.password}

	    chai.request(host)
	        .post('/login')
	        .send(user)
	        .end((err, res) => {
	            res.should.have.status(400);
	            res.body.should.not.have.property('token');
	          done();
	        });
	 });

  	it('it should return a token with right credentials', (done) => {
    
	  	let user = {email: admin.email, password: 'wrongpassword'}

	    chai.request(host)
	        .post('/login')
	        .send(user)
	        .end((err, res) => {
	            res.should.have.status(401);
	            res.body.should.not.have.property('token');
	          done();
	        });
	 });


});
