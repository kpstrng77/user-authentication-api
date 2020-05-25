'use strict';

const Joi = require('joi');

const checkResetSchema = Joi.object({
  resetname: Joi.string(),
  email: Joi.string()
});

module.exports = checkResetSchema;