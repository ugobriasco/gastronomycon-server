//Require the dev-dependencies
const 	chai = require('chai'),
		    chaiHttp = require('chai-http'),
		    mongoose = require('mongoose');

let should = chai.should();
let expect = chai.expect;
let host = "http://localhost:3000/api";

chai.use(chaiHttp);
//Our parent block

let testUser = {
  email: `${new Date().toISOString()}@test.com`,
  password: new Date().toISOString(),
  token: '',
  id: '',
}

chai.request(host)
  .post('/signup')
  .set('content-type', 'application/x-www-form-urlencoded') 
  .send({email: testUser.email, password: testUser.password, signupCode:'foo'})
  .end((err, res) => {
    testUser.token = res.body.token;
    testUser.id = res.body.user._id;
});


//get user
var admin = {
      email: "foo",
      password: "foo",
      token: '',
}
//get token
chai.request(host)
  .post('/login')
  .set('content-type', 'application/x-www-form-urlencoded') 
  .send({email: admin.email, password: admin.password})
  .end((err, res) => {
    admin.token = `Bearer ${res.body.token}`;
});

describe(' a /user with role ADMIN', () => {

  it('it should return all the users', (done) => {

    chai.request(host)
      .get(/user/)
      .set('Authorization', admin.token) 
      .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
        done();
    	});
  });
  it('should be able to search for a given user', (done) => {

    chai.request(host)
      .get(`/user/${testUser.id}`)
      .set('Authorization', admin.token) 
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.have.property('_id');
        done();
      });
  });
  it('should be able to delete a user', (done) => {

     chai.request(host)
      .delete(`/user/${testUser.id}`)
      .set('Authorization', admin.token) 
      .end((err, res) => {
          res.should.have.status(200);
          chai.request(host)
            .get(`/user/${testUser.id}`)
            .set('Authorization', admin.token) 
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body.data).to.equal(null);
                done();
            });
      });

  });
  it('should be able to see thge list of items');
  it('should change the role of a user');
});


