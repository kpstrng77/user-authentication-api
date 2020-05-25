'use strict';

const GameCell = require('../model/gameCells');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/api/gameCells',
  config: {
    auth: {
      strategy: 'jwt'
    },
    handler: (req, res) => {
      GameCell
        .find()
        // Deselect the password and version fields
        .select('-__v')
        .exec((err, data) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          if (!data.length) {
            throw Boom.notFound('No game cells found!');
          }

          res(data);
        });
    }
  }
}