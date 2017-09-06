'use strict';

const nodemailer =  require('nodemailer');

class SendEmail {

  constructor () {

    this.transporter = nodemailer.createTransport({
      host : 'smtp.ethereal.email',
      port : 587,
      secure : false,
      auth : {
        user: 'nodemailer.p0mepxmtjkkg.5vwx@ethereal.email',
        pass: 'sNy>j)_[#4T.W,12'
      }
    });

    this.mailOptions = {
      from: '"Some Email" <nodemailer.p0mepxmtjkkg.5vwx@ethereal.email>',
      to: '',
      subject: '',
      text: '',
      html: ''
    };

  }

  runJob (payload) {

    this.mailOptions.to = payload.to;
    this.mailOptions.subject = payload.subject;
    this.mailOptions.html = payload.html;
    this.mailOptions.text = payload.text;

    // if doesn't have callback with return a promise
    return this.transporter.sendMail(this.mailOptions);

  }

}

module.exports = SendEmail;

