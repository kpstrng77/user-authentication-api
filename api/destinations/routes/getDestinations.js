'use strict';

const Destination = require('../model/destinations');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/api/destinations',
  config: {
    auth: false,
    /*
    auth: {
      strategy: 'jwt'
    },
    */
    handler: (req, res) => {
      Destination
        .find()
        // Deselect the password and version fields
        .select('-__v')
        .exec((err, data) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          if (!data.length) {
            throw Boom.notFound('No destinations found!');
          }

          res(data);
        });
    }
  }
}