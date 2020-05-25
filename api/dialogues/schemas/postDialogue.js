'use strict';

const Joi = require('joi');

const postDialogueSchema = Joi.object({
  char_first_name: Joi.string().required(),
  char_last_name: Joi.string().required(),
  cell_name: Joi.string().required(),
  dialogue_order_num: Joi.string().required(),
  animation_details: Joi.string().required(),
  dialogue_text: Joi.string().required(),
  misc_01: Joi.string().required(),
  misc_02: Joi.string().required()
});

module.exports = postDialogueSchema;