const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
let should = chai.should();
const host = 'http://localhost:3000/api/v1.0/';
const signupCode = 'foo';
chai.use(chaiHttp);

exports.host = host;
exports.signupCode = signupCode;

exports.createBasicUser = function() {
  let user = {
    email: `${new Date().toISOString()}@test.com`,
    password: 'foo',
    token: '',
    id: '',
    role: 'User'
  };

  chai
    .request(host)
    .post('/signup')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({ email: user.email, password: user.password, signupCode: 'foo' })
    .end((err, res) => {
      user.token = res.body.token;
      user.id = res.body.user._id;
    });

  return user;
};
