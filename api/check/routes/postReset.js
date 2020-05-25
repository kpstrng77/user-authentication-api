'use strict';

const bcrypt = require('bcrypt');
const Boom = require('boom');
const Reset = require('../../resets/model/Reset');
const postResetSchema = require('../schemas/postReset');
const verifyUniqueReset = require('../../../util/resetFunctions').verifyUniqueReset;

module.exports = {
  method: 'POST',
  path: '/api/resets/check',
  config: {
    auth: false,
    pre: [
      { method: verifyUniqueReset, assign: 'reset' }
    ],
    handler: (req, res) => {
      res(req.pre.reset);
    },
    // Validate the payload against the Joi schema
    validate: {
      payload: postResetSchema
    }
  }
}
