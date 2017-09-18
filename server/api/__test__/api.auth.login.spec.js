const async = require('async');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const should = chai.should();
const t = require('./testdata.utils');

chai.use(chaiHttp);

const user = t.createBasicUser();
const host = t.host;


describe('/login', () =>{

	let admin = {token: ''};

	after((done) => {
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
					.delete(`/user/${user.id}`)
				    .set('Authorization', admin.token)
				    .end((err, res) => {
				    	cb();
				    });
			}
		], done);
	});

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
    
	  	let _user = {email: user.email, password: 'wrongpassword'}

	    chai.request(host)
	        .post('/login')
	        .send(_user)
	        .end((err, res) => {
	            res.should.have.status(401);
	            res.body.should.not.have.property('token');
	          	done();
	        });
	 });

  	it('it should deny access to a user with inconsistant credentials', (done) => {
    
	  	let _user = {email: user.email, bees: user.password}

	    chai.request(host)
	        .post('/login')
	        .send(_user)
	        .end((err, res) => {
	            res.should.have.status(400);
	            res.body.should.not.have.property('token');
	          	done();
	        });
	 });

  	it('it should return a token with right credentials', (done) => {
    
	  	let _user = {email: user.email, password: 'wrongpassword'}

	    chai.request(host)
	        .post('/login')
	        .send(_user)
	        .end((err, res) => {
	            res.should.have.status(401);
	            res.body.should.not.have.property('token');
	          	done();
	        });
	 });

});
