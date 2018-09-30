const async = require('async');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const should = chai.should();
const expect = chai.expect;
const t = require('./testdata.utils');

chai.use(chaiHttp);
const host = t.host;

//create a test user
let user1 = t.createBasicUser();
let admin = {};

//get admin token and user token
before(done => {
  async.series(
    [
      (getAdminToken = cb => {
        chai
          .request(host)
          .post('/login')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({ email: 'root', password: 'root' })
          .end((err, res) => {
            admin.token = `Bearer ${res.body.token}`;
            cb();
          });
      }),
      (getUserToken = cb => {
        chai
          .request(host)
          .post('/login')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({ email: user.email, password: user.password })
          .end((err, res) => {
            user.token = `Bearer ${res.body.token}`;
            cb();
          });
      })
    ],
    done
  );
});

//delete the testuser
after(done => {
  async.series(
    [
      (deleteUser = cb => {
        chai
          .request(host)
          .delete(`/users/${user.id}`)
          .set('Authorization', admin.token)
          .end((err, res) => {
            cb();
          });
      }),
      (deleteUser1 = cb => {
        chai
          .request(host)
          .delete(`/users/${user1.id}`)
          .set('Authorization', admin.token)
          .end((err, res) => {
            cb();
          });
      })
    ],
    done
  );
});

describe.only('/users/:UID/apps & /users/:UID/apps/:AID', () => {
  describe('A user with role USER', () => {
    it('should be able to create a new app', () => {
      chai
        .request(host)
        .post(`/users/${user1.id}/apps`)
        .set('Authorization', user.token)
        .end((err, res) => {
          res.should.heave.status(201);
          chai
            .request(host)
            .get(`/users/${user1.id}/apps`)
            .set('Authorization', user.token)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.data.should.be.a('object');
              expect(res.body.data.user_id).to.equal(user1.id);
              done();
            });
        });
    });

    it('should be able to change the title of the app');
    it('should be able to refresh the toke of the app');
    it('should be able to delete an app');
  });
});
