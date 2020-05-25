'use strict';

const Character = require('../model/Character');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/api/characters',
  config: {
    auth: {
      strategy: 'jwt'
    },
    handler: (req, res) => {
      Character
        .find()
        // Deselect the password and version fields
        .select('-__v')
        .exec((err, data) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          if (!data.length) {
            throw Boom.notFound('No characters found!');
          }

          res(data);
        });
    }
  }
}