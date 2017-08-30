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

  runJob (job) {

    this.mailOptions.to = job.to;
    this.mailOptions.subject = job.subject;
    this.mailOptions.html = job.html;
    this.mailOptions.text = job.text;

    this.transporter.sendMail(this.mailOptions, (error, result) => {
      if(error) {
        console.log(error);
      }
      console.log(result);
    });


  }


}

module.exports = SendEmail;

