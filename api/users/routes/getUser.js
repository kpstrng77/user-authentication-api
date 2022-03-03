'use strict';

const User = require('../model/User');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/api/user/{email}',
  config: {
    auth: {
      strategy: 'jwt'
    },
    handler: (req, res) => {
      
      const _id = req.params.id;

      User
        .findOne({ email })
        // Deselect the password and version fields
        .select('-__v')
        .exec((err, data) => {
          if (err) {
            res(Boom.badRequest(err));
          }
          if (!data) {
            res(Boom.notFound('Email not found!'));
          }
          res(data);
        });
    }
  }
}