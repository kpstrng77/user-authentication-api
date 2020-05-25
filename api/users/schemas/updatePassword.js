'use strict';

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const payloadSchema = Joi.object({
  username: Joi.string().alphanum().min(2).max(30),
  email: Joi.string().email(),
  password: Joi.string(),
  admin: Joi.boolean()
});

const paramsSchema = Joi.object({
  id: Joi.objectId()
});

module.exports = {
  payloadSchema: payloadSchema,
  paramsSchema: paramsSchema
}