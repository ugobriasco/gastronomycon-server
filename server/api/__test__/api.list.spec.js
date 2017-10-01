const async = require('async');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const should = chai.should();
const expect = chai.expect;
const t = require('./testdata.utils');

chai.use(chaiHttp);
const host = t.host;

describe('/list & /list/:objID', () => {
	let user = t.createBasicUser();
	let user1 = t.createBasicUser();
	let admin = {};

	//get admin token and user token
	before((done) => {
		async.series([
			getAdminToken = (next) => {
				chai.request(host)
				  	.post('/login')
				  	.set('content-type', 'application/x-www-form-urlencoded') 
				  	.send({email: 'foo', password: 'foo'})
				  	.end((err, res) => {
				    	admin.token = `Bearer ${res.body.token}`;
				    	next();
				    	
					});
			},
			getUserToken = (next) => {
				chai.request(host)
				  	.post('/login')
				  	.set('content-type', 'application/x-www-form-urlencoded') 
				  	.send({email: user.email, password: user.password})
				  	.end((err, res) => {
				    	user.token = `Bearer ${res.body.token}`;
				    	next();
				    	
					});
			}
		], done);
	});

	//delete the testuser
	after((done) => {
		async.series([
			deleteUser = (cb) => {
				chai.request(host)
				.delete(`/user/${user.id}`)
			    .set('Authorization', admin.token )
			    .end((err, res) => {
			    	cb();
		    	});
			},
			deleteUser1 = (cb) => {
				chai.request(host)
				.delete(`/user/${user1.id}`)
			    .set('Authorization', admin.token )
			    .end((err, res) => {
			    	cb();
		    	});
			},
		], done);
	});

	describe('A User with role USER', () => {
		describe('POST', () => {
			it('shoudl create a list as owner')
		});

		describe('GET', () => {
			it('should NOT GET all the lists in the db')
			it('should get the list he owns')
			it('should NOT get the list of another user')

		});
		describe('PUT', () => {
			it('should be able to replace the items in the owned list')
			it('should not be able to replace the items in another list')
		});
		describe('DELETE', () => {
			it('should be able to delete the list owned')
			it('should NOT be able to delete the list of someone else');
		})

	});
	
	describe('A User with role ADMIN', () => {
		describe('GET', () =>{
			it('should be able to gather all the lists')
		})

	});


})

