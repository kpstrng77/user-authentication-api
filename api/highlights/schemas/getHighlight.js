'use strict';

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const getHighlightSchema = Joi.object({
  id: Joi.objectId().required()
});

module.exports = getHighlightSchema;