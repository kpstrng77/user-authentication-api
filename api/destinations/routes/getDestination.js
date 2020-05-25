'use strict';

const Destination = require('../model/destinations');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/api/destinations/{id}',
  config: {
    auth: {
      strategy: 'jwt'
    },
    handler: (req, res) => {
      
      const _id = req.params.id;

      Destination
        .findOne({ _id })
        // Deselect the password and version fields
        .select('-__v')
        .exec((err, data) => {
          if (err) {
            res(Boom.badRequest(err));
          }
          if (!data) {
            res(Boom.notFound('Destination not found!'));
          }
          res(data);
        });
    }
  }
}