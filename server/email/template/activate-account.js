const templateActivation = props => {
  const text = `
    Welcome in Gastronomycon! \n
    Here your activation link: \n
    https://${props.host || 'gcon.matchyourtie.com'}/activate/${props.token} \n
    Enjoy!
  `;

  const html = `
  <div>
    <h1>Welcome in Gastronomycon!</h1>
    <p>Here your activation link:</p>
    <a href="https://${props.host || 'gcon.matchyourtie.com'}/activate/${
    props.token
  }">https://${props.host || 'gcon.matchyourtie.com'}/activate/${
    props.token
  }</a>
    <p>Enjoy!</p>
  </div>
  `;

  return {
    from: '"Gastronomycon" <noreply@gastronomycon.matchyourtie.com>',
    to: props.to,
    subject: 'Welome to Gastronomycon!',
    text,
    html
  };
};

module.exports = templateActivation;
