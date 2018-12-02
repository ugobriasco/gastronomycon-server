const nodemailer = require('nodemailer');
const cfg = require('../../cfg');
const { templateActivation } = require('./template');
const getTransporter = require('./get-transporter');

const sendEmail = props => {
  const { email, token } = props;

  const transporter = nodemailer.createTransport(
    getTransporter(cfg.email_service)
  );

  const mailOptions = templateActivation({ to: email, token });

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
        service: cfg.email.service,
        subject: mailOptions.subject
      });
    });
  });
};

module.exports = sendEmail;
