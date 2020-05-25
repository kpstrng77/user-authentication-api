'use strict';

const Boom = require('boom');
const Reset = require('../model/Reset');
const updateResetSchema = require('../schemas/updateReset');
const verifyUniqueReset = require('../../../util/resetFunctions').verifyUniqueReset;

module.exports = {
  method: 'PATCH',
  path: '/api/resets/{id}',
  config: {
    pre: [
      { method: verifyUniqueReset, assign: 'reset' }
    ],
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    },
    handler: (req, res) => {
      const id = req.params.id;
      Reset
        .findOneAndUpdate({ _id: id }, req.pre.reset, (err, reset) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          if (!reset) {
            throw Boom.notFound('Reset not found!');
          }
          res({message: 'Reset updated!'});
        });      
    },
    validate: {
      payload: updateResetSchema.payloadSchema,
      params: updateResetSchema.paramsSchema
    }
  }
  
}