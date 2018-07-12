const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const should = chai.should();
const expect = chai.expect;
const t = require('./testdata');

chai.use(chaiHttp);
const host = t.host;

describe('/user', () => {
  //create a test user

  let admin = {};
  //get admin token and user token
  before(done => {
    chai
      .request(host)
      .post('/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ email: 'foo', password: 'foo' })
      .end((err, res) => {
        admin.token = `Bearer ${res.body.token}`;

        done();
      });
  });

  describe('A user with role ADMIN', () => {
    describe('DELETE', () => {
      it('should cleanup all test users', done => {
        chai
          .request(host)
          .get('/user')
          .set('Authorization', admin.token)
          .end((err, res) => {
            let filteredList = res.body.data.filter(function f(user) {
              if (user.email.match(new RegExp('.*@test.com', 'gi')))
                return true;
            });
            //console.log(filteredList[0]);

            for (i = 0; i < filteredList.length; i++) {
              console.log(filteredList[i]._id);
              chai
                .request(host)
                .delete(`/user/${filteredList[i]._id}`)
                .set('Authorization', admin.token)
                .end((err, res) => {
                  console.log(res.body);
                });
            }
            done();
          });
      });
    });
  });
});
