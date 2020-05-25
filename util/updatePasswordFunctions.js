'use strict';

const Boom = require('boom');
const User = require('../api/users/model/User');
//const bcrypt = require('bcrypt');

function verifyUpdate(req, res) {
  // Find an entry from the database that
  // matches the email
  User.findOne({ email: req.payload.email }, (err, user) => {
    // Check whether the email submitted by the user has requested a rest in the
    // last hour and error out if so
    if (user) {

      if (user.email === req.payload.email) {
          // If everything checks out, send the payload through
          // to the route handler
          console.log(user.email);
          console.log(user.password);
          console.log(req.payload.email);
          console.log(req.payload.password);
          res(req.payload);
            }
    }
  });
}


module.exports = {
  verifyUpdate: verifyUpdate
}