const _templateActivation = props => {
  const text = `
    Welcome in Gastronomycon! \n
    Here your activation link: \n
    ${props.host || 'https://gcon.matchyourtie.com'}/activate/${props.token} \n
    Enjoy!
  `;

  const html = `
  <div>
    <h1>Welcome in Gastronomycon!</h1>
    <p>Here your activation link:</p>
    <a href="${props.host || 'https://gcon.matchyourtie.com'}/activate/${
    props.token
  }">${props.host || 'https://gcon.matchyourtie.com'}/activate/${
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

const templateActivation = props => {
  return new Promise((resolve, reject) => {
    console.log(props);
    const text = `
      Welcome in Gastronomycon! \n
      Here your activation link: \n
      ${props.host || 'https://gcon.matchyourtie.com'}/activate/${
      props.token
    } \n
      Enjoy!
    `;

    const html = `
    <div>
      <h1>Welcome in Gastronomycon!</h1>
      <p>Here your activation link:</p>
      <a href="${props.host || 'https://gcon.matchyourtie.com'}/activate/${
      props.token
    }">${props.host || 'https://gcon.matchyourtie.com'}/activate/${
      props.token
    }</a>
      <p>Enjoy!</p>
    </div>
    `;

    resolve({
      from: '"Gastronomycon" <noreply@gastronomycon.matchyourtie.com>',
      to: props.to,
      subject: 'Welome to Gastronomycon!',
      text,
      html
    });
  });
};

module.exports = templateActivation;
