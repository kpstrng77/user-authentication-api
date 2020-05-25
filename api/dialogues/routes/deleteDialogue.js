'use strict';

const Boom = require('boom');
const Dialogue = require('../model/Dialogue');
const deleteDialogueSchema = require('../schemas/deleteDialogue');

module.exports = {
  method: 'DELETE',
  path: '/api/dialogues/{id}',
  config: {
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    },
    handler: (req, res) => {

      const _id = req.params.id;

      Dialogue
        .findOneAndRemove({ _id })
        .exec((err, data) => {
          if (err) {
            throw Boom.badRequest(err);
          }

          if (!data) {
            throw Boom.notFound('Dialogue not found!');
          }
          
          res({ message: 'Dialogue deleted!' });
        });     

    },
    // Validate the payload against the Joi schema
    validate: {
      params: deleteDialogueSchema
    }
  }
}