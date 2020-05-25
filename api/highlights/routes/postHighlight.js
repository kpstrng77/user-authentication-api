'use strict';

const Boom = require('boom');
const Highlight = require('../model/highlights');
const postHighlightSchema = require('../schemas/postHighlight');

module.exports = {
  method: 'POST',
  path: '/api/highlights',
  config: {
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    },
    handler: (req, res) => {

      let highlight = new Highlight(req.payload);

      highlight.save((err, data) => {
        if (err) {
          res(Boom.badRequest(err));
          return;
        }

        res({ message: 'Highlight created!', data }).code(201);
      });      

    },
    // Validate the payload against the Joi schema
    validate: {
      payload: postHighlightSchema
    }
  }
}
