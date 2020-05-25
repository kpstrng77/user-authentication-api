'use strict';

const Boom = require('boom');
const Highlight = require('../model/highlights');
const deleteHighlightSchema = require('../schemas/deleteHighlight');

module.exports = {
  method: 'DELETE',
  path: '/api/highlight/{id}',
  config: {
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    },
    handler: (req, res) => {

      const _id = req.params.id;

      Highlight
        .findOneAndRemove({ _id })
        .exec((err, data) => {
          if (err) {
            throw Boom.badRequest(err);
          }

          if (!data) {
            throw Boom.notFound('Highlight not found!');
          }
          
          res({ message: 'Highlight deleted!' });
        });     

    },
    // Validate the payload against the Joi schema
    validate: {
      params: deleteHighlightSchema
    }
  }
}