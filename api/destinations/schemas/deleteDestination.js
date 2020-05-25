'use strict';

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const deleteDestinationSchema = Joi.object({
  id: Joi.objectId().required()
});

module.exports = deleteDestinationSchema;