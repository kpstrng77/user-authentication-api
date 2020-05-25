'use strict';

const Boom = require('boom');
const Reset = require('../../resets/model/Reset');
const postResetSchema = require('../schemas/postReset');
const verifyResetCredentials = require('../../../util/resetFunctions').verifyResetCredentials;
const createToken = require('../../../util/token');

module.exports = {
  method: 'POST',
  path: '/api/resets/authenticate',
  config: {
    auth: false,
    // Check the reset's password against the DB
    pre: [
      { method: verifyResetCredentials, assign: 'reset' }
    ],
    handler: (req, res) => {
      // If the reset's password is correct, we can issue a token.
      // If it was incorrect, the error will bubble up from the pre method
      res({ token: createToken(req.pre.reset) });
    },
    validate: {
      payload: postResetSchema
    }
  }  
}
