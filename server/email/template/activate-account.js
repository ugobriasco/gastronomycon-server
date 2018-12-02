const templateActivation = props => {
  const text = `
    Welcome in Gastronomycon! \n
    Here your activation link: \n
    https://${props.host || 'gcon.matchyourtie.com'}/activate/${props.token} \n
    Enjoy!
  `;

  return {
    from: '"Gastronomycon" <noreply@gastronomycon.matchyourtie.com>',
    to: props.to,
    subject: 'Welome to Gastronomycon!',
    text
  };
};

module.exports = templateActivation;
