'use strict';

const Boom = require('boom');
const Dialogue = require('../model/Dialogue');
const postDialogueSchema = require('../schemas/postDialogue');

module.exports = {
  method: 'POST',
  path: '/api/dialogues',
  config: {
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    },
    handler: (req, res) => {

      let dialogue = new Dialogue(req.payload);

      dialogue.save((err, data) => {
        if (err) {
          res(Boom.badRequest(err));
          return;
        }

        res({ message: 'Dialogue created!', data }).code(201);
      });      

    },
    // Validate the payload against the Joi schema
    validate: {
      payload: postDialogueSchema
    }
  }
}
