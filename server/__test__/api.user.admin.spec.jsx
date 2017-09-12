//Require the dev-dependencies
const chai = require('chai'),
const chaiHttp = require('chai-http'),
const mongoose = require('mongoose');
const should = chai.should();
const expect = chai.expect;
const t = require('./testdata');

chai.use(chaiHttp);

const user = t.createBasicUser();
const host = t.host;

describe('/user', () => {

  after();

  describe('user with role basic', () => {
    it('it should GET his/her own data');
    it('it should PUT his/her own data');
    it('it should not GET ALL user data');
    it('it should not PUT ')
  });

  describe('user with role admin', () =>{

    before( () => {




    });

    after();

    it('should GET all the users', (done) => {
      chai.request(host)
        .get(/user/)
        .set('Authorization', admin.token) 
        .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a('array');
          done();
        });
    });
    it('should GET a single user', (done) => {
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
});


