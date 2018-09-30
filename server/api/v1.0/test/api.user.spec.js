const async = require('async');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const should = chai.should();
const expect = chai.expect;
const t = require('./testdata.utils');

chai.use(chaiHttp);
const host = t.host;

describe('/users & /users/:ObjID', () => {
  //create a test user
  let user = t.createBasicUser();
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

  describe('No user', () => {
    describe('POST', () => {
      it('should not post on this path');
    });
  });

  describe('A user with role USER', () => {
    describe('GET', () => {
      it('should NOT GET the list of all users', done => {
        chai
          .request(host)
          .get('/users')
          .set('Authorization', user.token)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.not.have.property('data');
            done();
          });
      });
      it('should GET his/her own profile', done => {
        chai
          .request(host)
          .get(`/users/${user.id}`)
          .set('Authorization', user.token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('data');
            expect(res.body.data._id).to.equal(user.id);
            done();
          });
      });
      it('should not GET the profile of another user', done => {
        chai
          .request(host)
          .get(`/users/${user1.id}`)
          .set('Authorization', user.token)
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });
      it('should get a 400 if the params are inconsistant', done => {
        chai
          .request(host)
          .get(`/users/${user.id.slice(1, 7)}`)
          .set('Authorization', user.token)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });

    describe('PUT', () => {
      it('should PUT his profile', done => {
        chai
          .request(host)
          .put(`/users/${user.id}`)
          .set('Authorization', user.token)
          .send({ profile: { name: 'Mr Foo' } })
          .end((err, res) => {
            res.should.have.status(200);
            chai
              .request(host)
              .get(`/users/${user.id}`)
              .set('Authorization', user.token)
              .end((err, res) => {
                expect(res.body.data.profile.name).to.equal('Mr Foo');
                done();
              });
          });
      });
      it.skip('should not PUT query which is not matching the user model', done => {
        chai
          .request(host)
          .put(`/users/${user.id}`)
          .set('Authorization', user.token)
          .send({ profile: { amount_of_bananas: 200, name: 'Mr Blue' } })
          .end((err, res) => {
            res.should.have.status(200);
            chai
              .request(host)
              .get(`/users/${user.id}`)
              .set('Authorization', user.token)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.data.profile.should.not.have.property(
                  'amount_of_bananas'
                );
                expect(res.body.data.profile.name).to.equal('Mr Blue');

                done();
              });
          });
      });
      it('should not PUT the profile of another user', done => {
        chai
          .request(host)
          .put(`/users/${user1.id}`)
          .set('Authorization', user.token)
          .send({ profile: { name: 'Mr Red' } })
          .end((er, res) => {
            res.should.have.status(401);
            chai
              .request(host)
              .get(`/users/${user1.id}`)
              .set('Authorization', admin.token)
              .end((err, res) => {
                expect(res.body.data.profile.name).to.not.equal('Mr Red');
                done();
              });
          });
      });
      it('should NOT be able to change the ROLE', done => {
        chai
          .request(host)
          .put(`/users/${user.id}`)
          .set('Authorization', user.token)
          .send({ role: 'Admin' })
          .end((err, res) => {
            chai
              .request(host)
              .get(`/users/${user1.id}`)
              .set('Authorization', admin.token)
              .end((err, res) => {
                expect(res.body.data.role).to.not.equal('Admin');
                done();
              });
          });
      });
      it('should get a 400 if the params are inconsistant', done => {
        chai
          .request(host)
          .put(`/users/${user.id.slice(1, 7)}`)
          .set('Authorization', user.token)
          .send({ profile: { name: 'Mr Red' } })
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });

    describe('DELETE', () => {
      it('should not be able to delete another user', done => {
        chai
          .request(host)
          .delete(`/users/${user1.id}`)
          .set('Authorization', user.token)
          .end((err, res) => {
            res.should.have.status(401);
            chai
              .request(host)
              .get(`/users/${user1.id}`)
              .set('Authorization', admin.token)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('object');
                expect(res.body.data._id).to.equal(user1.id);
                done();
              });
          });
      });

      it('should get a 400 if the params are inconsistant', done => {
        chai
          .request(host)
          .put(`/users/${user.id.slice(1, 7)}`)
          .set('Authorization', user.token)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });
  });

  describe('A user with role ADMIN', () => {
    describe('GET', () => {
      it('should see all users', done => {
        chai
          .request(host)
          .get('/users')
          .set('Authorization', admin.token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a('array');
            done();
          });
      });
      it('should see a single user', done => {
        chai
          .request(host)
          .get(`/users/${user.id}`)
          .set('Authorization', admin.token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a('object');
            expect(res.body.data._id).to.equal(user.id);
            done();
          });
      });

      it('should return 400 if the request has inconsistant params', done => {
        chai
          .request(host)
          .get(`/users/${user.id.slice(2, 6)}`)
          .set('Authorization', admin.token)
          .send({ profile: { name: 'Mr Flop' } })
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });
    describe('PUT', () => {
      it('should change the ROLE of a user', done => {
        chai
          .request(host)
          .put(`/users/${user.id}`)
          .set('Authorization', admin.token)
          .send({ role: 'Admin' })
          .end((err, res) => {
            chai
              .request(host)
              .get(`/users/${user.id}`)
              .set('Authorization', admin.token)
              .end((err, res) => {
                expect(res.body.data.role).to.equal('Admin');
                done();
              });
          });
      });
      // FROM NOW ON USER HAS ROLE ADMIN
      it('should PUT his profile', done => {
        chai
          .request(host)
          .put(`/users/${user.id}`)
          .set('Authorization', user.token)
          .send({ profile: { name: 'Mr Flop' } })
          .end((err, res) => {
            res.should.have.status(200);
            chai
              .request(host)
              .get(`/users/${user.id}`)
              .set('Authorization', user.token)
              .end((err, res) => {
                expect(res.body.data.profile.name).to.equal('Mr Flop');
                done();
              });
          });
      });

      it('should return 400 if the request has inconsistant params', done => {
        chai
          .request(host)
          .put(`/users/${user.id.slice(2, 6)}`)
          .set('Authorization', user.token)
          .send({ profile: { name: 'Mr Flop' } })
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });
    describe('DELETE', () => {
      it('should be able to DELETE another user', done => {
        //as the token encodes the role, it has to regenerated
        async.series(
          [
            (refreshToken = cb => {
              chai
                .request(host)
                .post('/login')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({ email: user.email, password: user.password })
                .end((err, res) => {
                  user.token = `Bearer ${res.body.token}`;
                  cb();
                });
            }),
            (deleteUser1 = cb => {
              chai
                .request(host)
                .delete(`/users/${user1.id}`)
                .set('Authorization', user.token)
                .end((err, res) => {
                  res.should.have.status(200);
                  cb();
                });
            }),
            (checkUser1 = cb => {
              chai
                .request(host)
                .get(`/users/${user1.id}`)
                .set('Authorization', admin.token)
                .end((err, res) => {
                  res.should.have.status(404);
                  cb();
                });
            })
          ],
          done
        );
      });

      it('should return 400 if the request has inconsistant params', done => {
        chai
          .request(host)
          .delete(`/users/${user.id.slice(2, 6)}`)
          .set('Authorization', user.token)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });
  });

  describe('A user who is owning Apps', () => {
    it('should be able to create a new app');
    it('should be able to change the title of the app');
    it('should be able to refresh the toke of the app');
    it('should be able to delete an app');
  });
});
