'use strict';

const Dialogue = require('../model/Dialogue');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/api/dialogues/{id}',
  config: {
    auth: {
      strategy: 'jwt'
    },
    handler: (req, res) => {
      
      const _id = req.params.id;

      Dialogue
        .findOne({ _id })
        // Deselect the password and version fields
        .select('-__v')
        .exec((err, data) => {
          if (err) {
            res(Boom.badRequest(err));
          }
          if (!data) {
            res(Boom.notFound('Dialogue not found!'));
          }
          res(data);
        });
    }
  }
}