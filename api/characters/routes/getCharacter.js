'use strict';

const Character = require('../model/Character');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/api/characters/{id}',
  config: {
    auth: {
      strategy: 'jwt'
    },
    handler: (req, res) => {
      
      const _id = req.params.id;

      Character
        .findOne({ _id })
        // Deselect the password and version fields
        .select('-__v')
        .exec((err, data) => {
          if (err) {
            res(Boom.badRequest(err));
          }
          if (!data) {
            res(Boom.notFound('Character not found!'));
          }
          res(data);
        });
    }
  }
}