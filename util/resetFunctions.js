'use strict';

const Boom = require('boom');
const Reset = require('../api/resets/model/Reset');
//const bcrypt = require('bcrypt');

function verifyUniqueReset(req, res) {
  // Find an entry from the database that
  // matches the email
  Reset.findOne({ email: req.payload.email }, (err, reset) => {
    // Check whether the email submitted by the user has requested a rest in the
    // last hour and error out if so
    if (reset) {

      if (reset.email === req.payload.email) {
          res(Boom.badRequest('Email taken'));
          return;
      }
    }
    // If everything checks out, send the payload through
    // to the route handler
    res(req.payload);
  });
}

function verifyUniqueReset(req, res) {
      Reset.findOne({ email: req.payload.email }, (err, reset) => {
        // Check whether the resetname or email
        // is already taken and error out if so
        if (reset) {

          var tempTime = reset.time;
          var currTime = new Date().getTime();
          currTime = currTime - (1000*3600);
          if (reset.email === req.payload.email) {
            console.log(reset.time);
            console.log(currTime);
            if(currTime<tempTime){
              res(Boom.badRequest('User has already requested a reset in the past hour.'));
              return;
            }
          }
        }
        // If everything checks out, send the payload through
        // to the route handler
        res(req.payload);
      }).sort({ field: 'asc', _id: -1 }).limit(1);
};

function verifyResetCredentials(req, res) {
  
  // Find an entry from the database that
  // matches either the email or resetname
  Reset.findOne({ email: req.payload.reset }, (err, reset) => {
    if (reset) {
          res(reset);
  }});
}

module.exports = {
  verifyUniqueReset: verifyUniqueReset,
  verifyResetCredentials: verifyResetCredentials
}