require("dotenv").config({ path: "../config/config.env" });
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE ?? 'gmail',
  auth: {
    user: process.env.emailFrom,
    pass: process.env.gmailPassword,
  },
});

async function sendCodeToEmail(emailReciever, code, purpose) {
  let emailObject;
  if (purpose === 'register') {
    emailObject = {
      from: process.env.emailFrom, // sender address
      to: emailReciever, // list of receivers
      subject: 'Confirmation code for our monitoring system', // Subject line
      text: `Your code to register at monitoring system is: ${code}`, // plain text body
    };
  } else if (purpose === 'forgetPass') {
    emailObject = {
      from: process.env.emailFrom, // sender address
      to: emailReciever, // list of receivers
      subject: 'Forget password code for our monitoring system', // Subject line
      text: `Your code to reset your password at monitoring system is: ${code}`, // plain text body
    };
  }
  const response = { status: 'success' };

  await transporter.sendMail(emailObject, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });

  return response;
}

async function sendSystemUpdateToEmail(emailReciever, check, purpose) {
  let emailObject;
  if (purpose === 'up') {
    emailObject = {
      from: process.env.emailFrom, 
      to: emailReciever,
      subject: `Update on your ${check.name} monitoring system`, 
      text: `Your ${check.name} is up now with url ${check.url}`, 
    };
  } else if (purpose === 'down') {
    emailObject = {
      from: process.env.emailFrom, 
      to: emailReciever, 
      subject: `Update on your ${check.name} monitoring system`, 
      text: `Your ${check.name} is down now with url ${check.url}`, 
    };
  }
  const response = { status: 'success' };

  await transporter.sendMail(emailObject, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });

  return response;
}

module.exports = {
  sendCodeToEmail,
  sendSystemUpdateToEmail
};


