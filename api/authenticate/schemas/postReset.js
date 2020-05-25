'use strict';

const Joi = require('joi');

const authenticateResetSchema = Joi.alternatives().try(
  /*
  Joi.object({
    reset: Joi.string().alphanum().min(2).max(30).required(),
    password: Joi.string().required()
  }),
  */
  Joi.object({
    reset: Joi.string().email().required()//,
    //password: Joi.string().required()
  })
);

module.exports = authenticateResetSchema;