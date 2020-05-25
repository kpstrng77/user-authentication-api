'use strict';

const GameCell = require('../model/gameCells');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/api/gameCells/{id}',
  config: {
    auth: {
      strategy: 'jwt'
    },
    handler: (req, res) => {
      
      const _id = req.params.id;

      GameCell
        .findOne({ _id })
        // Deselect the password and version fields
        .select('-__v')
        .exec((err, data) => {
          if (err) {
            res(Boom.badRequest(err));
          }
          if (!data) {
            res(Boom.notFound('Game Cell not found!'));
          }
          res(data);
        });
    }
  }
}