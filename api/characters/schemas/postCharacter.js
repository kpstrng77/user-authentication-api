'use strict';

const Joi = require('joi');

const postCharacterSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  country_of_origin: Joi.string().required(),
  country_image: Joi.string().required(),
  occupation: Joi.string().required(),
  game_role: Joi.string().required(),
  character_details: Joi.string().required(),
  character_image: Joi.string().required()
});

module.exports = postCharacterSchema;