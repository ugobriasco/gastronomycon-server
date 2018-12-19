const nodemailer = require('nodemailer');
const ejs = require('ejs');
const cfg = require('../../cfg');
const getTransporter = require('./get-transporter');

const sendEmail = props => {
  const { email, token, template } = props;
  const host = cfg.clientHost;

  // Sets the service used
  const transporter = new Promise((resolve, reject) => {
    resolve(nodemailer.createTransport(getTransporter(cfg.email_service)));
  });

  // Send email
  return Promise.all([
    loadTemplate({
      to: email,
      token,
      host,
      template
    }),
    transporter
  ]).then(promises => {
    const emailOptions = promises[0];
    const transporter = promises[1];
    return send(emailOptions, transporter);
  });
};

// build the email
const loadTemplate = props => {
  const { to, token, host, type } = props;
  const year = new Date().getFullYear();
  const DIR = getTemplate(type);
  return ejs.renderFile(DIR, { token, host, year }).then(html => {
    const text = `Welcome in Gastronomycon! \n
    Here your activation link: \n
    ${host || 'https://gcon.matchyourtie.com'}/activate/${token} \n
    Enjoy!`;

    return {
      from: '"Gastronomycon" <noreply@gastronomycon.matchyourtie.com>',
      to: props.to,
      subject: 'Welcome to Gastronomycon',
      text,
      html
    };
  });
};

// util for selecting the specific template
const getTemplate = template => {
  if ((template = 'activation')) {
    return `${__dirname}/template/activate-account.ejs`;
  }
  return `${__dirname}/template/welcome.ejs`;
};

// //  Send email
const send = (mailOptions, transporter) => {
  return new Promise((resolve, reject) => {
    return transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        ({
          status: 500,
          meassage: 'An error occurred by sending email',
          err
        });
      }
      console.log(`EMail sent to ${mailOptions.to}`);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      resolve({
        status: 200,
        message: `EMail sent to ${mailOptions.to}`,
        service: cfg.email_service,
        subject: mailOptions.subject
      });
    });
  });
};

module.exports = sendEmail;
