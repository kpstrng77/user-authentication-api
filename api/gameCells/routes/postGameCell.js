'use strict';

const Boom = require('boom');
const GameCell = require('../model/gameCells');
const postGameCellSchema = require('../schemas/postGameCell');

module.exports = {
  method: 'POST',
  path: '/api/gameCells',
  config: {
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    },
    handler: (req, res) => {

      let gameCell = new GameCell(req.payload);

      gameCell.save((err, data) => {
        if (err) {
          res(Boom.badRequest(err));
          return;
        }

        res({ message: 'Game Cell created!', data }).code(201);
      });      

    },
    // Validate the payload against the Joi schema
    validate: {
      payload: postGameCellSchema
    }
  }
}
