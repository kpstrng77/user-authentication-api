'use strict';

const Boom = require('boom');
const Destination = require('../model/destinations');
const postDestinationSchema = require('../schemas/postDestination');

module.exports = {
  method: 'POST',
  path: '/api/destinations',
  config: {
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    },
    handler: (req, res) => {

      let destination = new Destination(req.payload);

      destination.save((err, data) => {
        if (err) {
          res(Boom.badRequest(err));
          return;
        }

        res({ message: 'Destination created!', data }).code(201);
      });      

    },
    // Validate the payload against the Joi schema
    validate: {
      payload: postDestinationSchema
    }
  }
}
