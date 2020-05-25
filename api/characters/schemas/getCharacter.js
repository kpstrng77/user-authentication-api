'use strict';

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const getCharacterSchema = Joi.object({
  id: Joi.objectId().required()
});

module.exports = getCharacterSchema;