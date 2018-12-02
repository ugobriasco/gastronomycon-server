const templateResetPassword = props => {
  const text = `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
  Please click on the following link, or paste this into your browser to complete the process:\n\n
  https://${props.host || 'gcon.matchyourtie.com'}/reset/${props.token}\n\n
  If you did not request this, please ignore this email and your password will remain unchanged.\n`;

  return {
    from: '"Gastronomycon" <noreply@gastronomycon.matchyourtie.com>',
    to: props.to,
    subject: 'Reset your password on Grocerybot',
    text
  };
};

module.exports = templateResetPassword;
