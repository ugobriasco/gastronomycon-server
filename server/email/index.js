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
      type: template
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
  const { html, subject, text } = getTemplate(type);
  return ejs.renderFile(html, { token, host, year }).then(html => {
    return {
      from: '"Gastronomycon" <noreply@gastronomycon.matchyourtie.com>',
      to: props.to,
      subject,
      text,
      html
    };
  });
};

// util for selecting the specific template
const getTemplate = type => {
  if (type == 'activation') {
    return {
      html: `${__dirname}/template/activate-account.ejs`,
      subject: 'Welcome to Gastronomycon',
      text: `Are you ready to use hundreds of gastronomycal terms in 5 languages? Then, follow the link below: \n ${host ||
        'https://gastronomycon.io'}/activate/${token} \n
      Cheers! \n Your Gastronomycon assistant`
    };
  }
  if (type == 'reset-password') {
    return {
      html: `${__dirname}/template/reset-password.ejs`,
      subject: 'Reset your password',
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account. Please click on the following link, or paste this into your browser to complete the process: \n ${host ||
        'https://gastronomycon.io'}/reset/${token} \n
    \nIf you did not request this, please ignore this email and your password will remain unchanged.\n Cheers! \n Your Gastronomycon assistant`
    };
  } else {
    return {
      html: `${__dirname}/template/welcome.ejs`,
      subject: 'This is a welcome',
      text: 'Welcome!'
    };
  }
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
