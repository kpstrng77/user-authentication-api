'use strict';

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const getGameCellSchema = Joi.object({
  id: Joi.objectId().required()
});

module.exports = getGameCellSchema;