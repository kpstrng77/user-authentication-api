'use strict';

const Boom = require('boom');
const GameCell = require('../model/gameCells');
const deleteGameCellSchema = require('../schemas/deleteGameCell');

module.exports = {
  method: 'DELETE',
  path: '/api/gameCell/{id}',
  config: {
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    },
    handler: (req, res) => {

      const _id = req.params.id;

      GameCell
        .findOneAndRemove({ _id })
        .exec((err, data) => {
          if (err) {
            throw Boom.badRequest(err);
          }

          if (!data) {
            throw Boom.notFound('Game Cell not found!');
          }
          
          res({ message: 'Game Cell deleted!' });
        });     

    },
    // Validate the payload against the Joi schema
    validate: {
      params: deleteGameCellSchema
    }
  }
}