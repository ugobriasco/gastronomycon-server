const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const should = chai.should();
const expect = chai.expect;
const t = require('./testdata');

chai.use(chaiHttp);
const host = t.host;


describe('/user', () =>{

	
	//create a test user
	let user = t.createBasicUser();
	let user1 = t.createBasicUser();
	let admin = {};

	//get admin token and user token
	before((done) => {
		chai.request(host)
		  	.post('/login')
		  	.set('content-type', 'application/x-www-form-urlencoded') 
		  	.send({email: 'foo', password: 'foo'})
		  	.end((err, res) => {
		    	admin.token = `Bearer ${res.body.token}`;

		    	chai.request(host)
				  	.post('/login')
				  	.set('content-type', 'application/x-www-form-urlencoded') 
				  	.send({email: user.email, password: user.password})
				  	.end((err, res) => {
				    	user.token = `Bearer ${res.body.token}`;
				    	done();
					});
			});
	});
	

	//delete the testuser
	after((done) => {		
		let token = t.getAdminToken();
		chai.request(host)
			.delete(`/user/${user.id}`)
		    .set('Authorization', token )
		    .end((err, res) => {
		    	chai.request(host)
				.delete(`/user/${user1.id}`)
			    .set('Authorization', token )
			    .end((err, res) => {
			    	done();
		    	});
		    });
	});

	describe('A user with role USER', () => {

		describe('GET', () => {
			it('should NOT GET the list of all users', (done) =>{	
			chai.request(host)
				.get('/user')
				.set('Authorization', user.token)
				.end((err,res) =>{
					res.should.have.status(401);
					res.body.should.not.have.property('data');
					done();

				});
			});
			it('should GET his/her own profile', (done) => {
				chai.request(host)
					.get(`/user/${user.id}`)
					.set('Authorization', user.token)
					.end((err,res) =>{
						res.should.have.status(200);
						res.body.should.have.property('data');
						expect(res.body.data._id).to.equal(user.id);
						done();

					});
			});
			it('should not GET the profile of another user', (done) =>{
				chai.request(host)
					.get(`/user/${user1.id}`)
					.set('Authorization', user.token)
					.end((err,res) =>{
						res.should.have.status(401);
						done();

					});
			});
		});

		describe('PUT', () => {
			it('should PUT his profile', (done) => {
				chai.request(host)
					.put(`/user/${user.id}`)
					.set('Authorization', user.token)
					.send({profile:{name: 'Mr Foo'}})
					.end((err,res) =>{
						res.should.have.status(200);
						chai.request(host)
							.get(`/user/${user.id}`)
							.set('Authorization', user.token)
							.end((err,res) =>{
								expect(res.body.data.profile.name).to.equal('Mr Foo');
								done();

							});
					});
			});
			it('should not PUT query which is not matching the user model', (done) => {
				chai.request(host)
					.put(`/user/${user.id}`)
					.set('Authorization', user.token)
					.send({profile:{amount_of_bananas: 200, name: 'Mr Blue'}})
					.end((err,res) =>{
						res.should.have.status(200);
						chai.request(host)
							.get(`/user/${user.id}`)
							.set('Authorization', user.token)
							.end((err,res) =>{
								res.should.have.status(200);
								res.body.data.profile.should.not.have.property('amount_of_bananas');
								expect(res.body.data.profile.name).to.equal('Mr Blue');

								done();

							});
					});
			});
			it('should not PUT the profile of another user');
			it('should NOT be able to change the ROLE');
		});

		describe('DELETE', () => {
			it('should not be able to delete another user');
		})

	});

	describe('A user with role ADMIN', () => {
		describe('GET', () =>{
			it('should see all users', (done) =>{
				chai.request(host)
				.get('/user')
				.set('Authorization', admin.token)
				.end((err,res) =>{
					res.should.have.status(200);
	            	res.body.data.should.be.a('array');
	            	done();
				});
			});
			it('should see a single user', (done) =>{
				chai.request(host)
				.get(`/user/${user.id}`)
				.set('Authorization', admin.token)
				.end((err,res) =>{
					res.should.have.status(200);
	            	res.body.data.should.be.a('object');
	            	expect(res.body.data._id).to.equal(user.id);
	            	done();
				});
			});
		});
		describe('PUT', () => {
			it('should PUT his profile');
			it('should change the role of a user');
			it('should be able to change the ROLE of another user');
		});
		describe('DELETE', () =>{
			it('should be able to DELETE a user');
		});

		
		
		
	});

	

})