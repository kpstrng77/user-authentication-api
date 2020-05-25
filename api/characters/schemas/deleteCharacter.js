'use strict';

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const deleteCharacterSchema = Joi.object({
  id: Joi.objectId().required()
});

module.exports = deleteCharacterSchema;