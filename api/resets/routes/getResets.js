'use strict';

const Reset = require('../model/Reset');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/api/resets',
  config: {
    auth: false,
    handler: (req, res) => {
      Reset
        .find()
        // Deselect the password and version fields
        .select('-password -__v')
        .exec((err, resets) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          if (!resets.length) {
            throw Boom.notFound('No resets found!');
          }
          res(resets);
        })
    }    
  }
}