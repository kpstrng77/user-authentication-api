'use strict';

const Boom = require('boom');
const Character = require('../model/Character');
const deleteCharacterSchema = require('../schemas/deleteCharacter');

module.exports = {
  method: 'DELETE',
  path: '/api/characters/{id}',
  config: {
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    },
    handler: (req, res) => {

      const _id = req.params.id;

      Instructor
        .findOneAndRemove({ _id })
        .exec((err, data) => {
          if (err) {
            throw Boom.badRequest(err);
          }

          if (!data) {
            throw Boom.notFound('Character not found!');
          }
          
          res({ message: 'Character deleted!' });
        });     

    },
    // Validate the payload against the Joi schema
    validate: {
      params: deleteCharacterSchema
    }
  }
}