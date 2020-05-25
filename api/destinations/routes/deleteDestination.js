'use strict';

const Boom = require('boom');
const Destination = require('../model/destinations');
const deleteDestinationSchema = require('../schemas/deleteDestination');

module.exports = {
  method: 'DELETE',
  path: '/api/destination/{id}',
  config: {
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    },
    handler: (req, res) => {

      const _id = req.params.id;

      Destination
        .findOneAndRemove({ _id })
        .exec((err, data) => {
          if (err) {
            throw Boom.badRequest(err);
          }

          if (!data) {
            throw Boom.notFound('Destination not found!');
          }
          
          res({ message: 'Destination deleted!' });
        });     

    },
    // Validate the payload against the Joi schema
    validate: {
      params: deleteDestinationSchema
    }
  }
}