'use strict';

const bcrypt = require('bcrypt');
const Boom = require('boom');
const Reset = require('../model/Reset');
const User = require('../../users/model/User');

const postResetSchema = require('../schemas/postReset');
const verifyUniqueReset = require('../../../util/resetFunctions').verifyUniqueReset;
const verifyUserExists = require('../../../util/userFunctions').verifyUserExists;
const createToken = require('../../../util/token');
var nodemailer = require('nodemailer');
require('dotenv').config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
	user: `${process.env.MLAB_EMAIL}`,
	pass: `${process.env.MLAB_EMAILPASSWORD}`
  }
});

//var tempUser = Math.random().toString(36).substr(2, 15);
var tempPassword = Math.random().toString(36).substr(2, 15);

var tempToken = '';

function hashPassword(password, cb) {
  // Generate a salt at level 10 strength
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      return cb(err, hash);
    });
  });
}

module.exports = {
  method: 'POST',
  path: '/api/resets',
  config: {
    auth: false,
    // Before the route handler runs, verify that the user requesting a reset hasn't submitted
    // a reset request in the last hour.  Also, check to see if the email is associated with a
    //registered Mochileros player.
    pre: [
      { method: verifyUniqueReset },
      { method: verifyUserExists }
    ],
    handler: (req, res) => {
      var tempEmail = req.payload.email;
      var tempUserID = 'dummy';
      User
        .find({email: tempEmail})
        // Deselect the password and version fields
        .select('_id')
        .exec((err, data) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          if (!data.length) {
            throw Boom.notFound('Email address not found!');
          }

          tempUserID=JSON.stringify(data[0]);
          tempUserID = tempUserID.slice(8, 32);
      
          console.log('Found email adress kpstrng77@gmail.com with id of '+tempUserID);

          let reset = new Reset();
      reset.id = tempUserID;
      reset.email = req.payload.email;
      reset.admin = req.payload.admin || false;
      hashPassword(tempPassword, (err, hash) => {
        if (err) {
          throw Boom.badRequest(err);
        }
        //reset.password = hash;
        reset.save((err, reset) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          // If reset is saved successfully, issue a JWT, send reset email with link and reset type token
          res({ token: createToken(reset) });
          tempToken = { token: createToken(reset) };
          //console.log(tempToken);

          tempToken = JSON.stringify({ token: createToken(reset) });
          tempToken = tempToken.slice(10);
          tempToken = tempToken.slice(0, -2);
          var tempEmail = req.payload.email;

          var tempURL = `Sixth test of Password Reset Email 
          Click the Link Below to reset your password for Mochileros the Game.
          *This link will expire in one hour.

          http://localhost:4200/auth/reset_password?token=` + tempToken;

          console.log(tempURL);

          var mailOptions = {
            from: `${process.env.MLAB_EMAIL}`,
            to: tempEmail,
            subject: 'Mochileros the Game Password Reset',
            text: tempURL
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            }else {
            console.log('Email sent: ' + info.response);
            }
          });
          
        });
      });
      
          //return data;
          //res(data);
        });

    },
    // Validate the payload against the Joi schema
    validate: {
      payload: postResetSchema
    }
  }
}
