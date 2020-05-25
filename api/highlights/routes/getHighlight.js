'use strict';

const Highlight = require('../model/highlights');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/api/destHighlights',
  config: {
    //auth: false,
    
    auth: {
      strategy: 'jwt'
    },

    
    handler: (req, res) => {
      
      const destination = req;
      console.log(destination);


      Highlight
        //.find({ destination_name: destination } )
        .find()
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