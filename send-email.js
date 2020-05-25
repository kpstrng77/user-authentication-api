var nodemailer = require('nodemailer');
require('dotenv').config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
	user: `${process.env.MLAB_EMAIL}`,
	pass: `${process.env.MLAB_EMAILPASSWORD}`
  }
});


var mailOptions = {
  from: `${process.env.MLAB_EMAIL}`,
  to: 'kpstrng77@gmail.com',
  subject: 'Password Reset Test',
  text: 'Second test of Password Reset Email'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
	console.log(error);
  }else {
	console.log('Email sent: ' + info.response);
  }
});
