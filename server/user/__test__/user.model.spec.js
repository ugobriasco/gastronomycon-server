const expect = require('chai').expect;
const sinon = require('sinon');

const User = require('../user.model');

describe('👴🏼  The User model', () => {
  describe('model validations', () => {
    it('should be invalid if email or password are missing', done => {
      const u = new User();
      u.validate(err => {
        expect(err.errors.email).to.exist;
        expect(err.errors.password).to.exist;
        done();
      });
    });
    it('should return a user with role User as default', done => {
      const u = new User({ email: 'foo@foo.com', password: 'foo' });
      expect(u.role).to.exist;
      expect(u.role).to.be.equal('User');
      u.validate(err => {
        expect(err).to.not.exist;
        done();
      });
    });
    it('should return a user with role Admin if given', done => {
      const u = new User({
        email: 'foo@foo.com',
        password: 'foo',
        role: 'Admin'
      });
      expect(u.role).to.exist;
      expect(u.role).to.be.equal('Admin');
      u.validate(err => {
        expect(err).to.not.exist;
        done();
      });
    });
    it('should be invalid if the role is otuside the acceptance labels', done => {
      const u = new User({
        email: 'foo@foo.com',
        password: 'foo',
        role: 'Wizard'
      });
      u.validate(err => {
        expect(err.errors.email).to.not.exist;
        expect(err.errors.password).to.not.exist;
        expect(err.errors.role).to.exist;
        done();
      });
    });
  });

  describe('instance methods', () => {
    it('should save by encrypting the password');
    it('should be able to verify the hashed pasword');
    it('should provide a gravatar when the email is provided');
  });
});
