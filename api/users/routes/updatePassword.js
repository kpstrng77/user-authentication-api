'use strict';

const Boom = require('boom');
const User = require('../model/User');
const updatePasswordSchema = require('../schemas/updatePassword');
const verifyUserExists = require('../../../util/userFunctions').verifyUserExists;
const bcrypt = require('bcrypt');

function hashPassword(password, cb) {
  // Generate a salt at level 10 strength
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      return cb(err, hash);
    });
  });
}

module.exports = {
  method: 'PATCH',
  path: '/api/password',
  config: {
    
    pre: [
      { method: verifyUserExists, assign: 'user' }
    ],
    
    /*
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    },   
    */
     
  
   auth: false,
   
    handler: (req, res) => {
      const tempEmail = req.payload.email;    

      var tempPassword = '';
      
      hashPassword(req.payload.password, (err, hash) => {
        if (err) {
          throw Boom.badRequest(err);
        }
        tempPassword = hash;
        User.findOneAndUpdate({ email: tempEmail }, 
          { 
              $set: {'password':tempPassword}
          },
          {
              returnNewDocument: true
          }
      , function( error, result){
          // In this moment, you recive a result object or error
      
          // ... Your code when have result ... //
          res({message: 'Password updated!'});
      });  
      });  
    },
    
    validate: {
      payload: updatePasswordSchema.payloadSchema,
      params: updatePasswordSchema.paramsSchema
    }
  }
  
}