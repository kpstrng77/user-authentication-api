'use strict';

const Highlight = require('../model/highlights');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/api/highlights/{id}',
  config: {
    auth: {
      strategy: 'jwt'
    },
    handler: (req, res) => {
      
      const _id = req.params.id;

      Highlight
        .findOne({ _id })
        // Deselect the password and version fields
        .select('-__v')
        .exec((err, data) => {
          if (err) {
            res(Boom.badRequest(err));
          }
          if (!data) {
            res(Boom.notFound('Highlight not found!'));
          }
          res(data);
        });
    }
  }
}