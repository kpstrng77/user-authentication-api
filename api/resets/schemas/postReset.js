'use strict';

const Joi = require('joi');

const createResetSchema = Joi.object({
  email: Joi.string().email().required(),
  admin: Joi.boolean()
});

module.exports = createResetSchema;
