const templateChangedPassword = props => {
  const text = `Hello,\n\nThis is a confirmation that the password for your account ${
    props.email
  } has just been changed.\n`;

  return {
    from: '"Gastronomycon" <noreply@gastronomycon.matchyourtie.com>',
    to: props.to,
    subject: 'Reset your password on Grocerybot',
    text
  };
};

module.exports = templateChangedPassword;
