'use strict';

const Dialogue = require('../model/Dialogue');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/api/dialogues',
  config: {
    auth: {
      strategy: 'jwt'
    },
    handler: (req, res) => {
      Dialogue
        .find()
        // Deselect the password and version fields
        .select('-__v')
        .exec((err, data) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          if (!data.length) {
            throw Boom.notFound('No dialogues found!');
          }

          res(data);
        });
    }
  }
}