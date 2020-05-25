'use strict';

const Boom = require('boom');
const Character = require('../model/Character');
const postCharacterSchema = require('../schemas/postCharacter');

module.exports = {
  method: 'POST',
  path: '/api/characters',
  config: {
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    },
    handler: (req, res) => {

      let character = new Character(req.payload);

      character.save((err, data) => {
        if (err) {
          res(Boom.badRequest(err));
          return;
        }

        res({ message: 'Character created!', data }).code(201);
      });      

    },
    // Validate the payload against the Joi schema
    validate: {
      payload: postCharacterSchema
    }
  }
}
