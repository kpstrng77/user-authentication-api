'use strict';

const Highlight = require('../model/highlights');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/api/highlights',
  config: {
    auth: {
      strategy: 'jwt'
    },
    handler: (req, res) => {
      Highlight
        .find()
        // Deselect the password and version fields
        .select('-__v')
        .exec((err, data) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          if (!data.length) {
            throw Boom.notFound('No highlights found!');
          }

          res(data);
        });
    }
  }
}