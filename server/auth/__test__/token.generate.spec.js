const expect = require('chai').expect;

const {
  generateToken,
  generatePasswordResetToken
} = require('../token-generate');

describe('The token generate', () => {
  it('should provide a valid token', done => {
    const user = { email: 'foo@bar.com', userID: '1234', role: 'User' };
    const token = generateToken(user);
    expect(token).to.exist;
    done();
  });
});

describe('PRT - generate password reset token', () => {
  it('should provide a valid token', done => {
    generatePasswordResetToken().then(token => {
      expect(token).to.exist;
      done();
    });
  });
});
