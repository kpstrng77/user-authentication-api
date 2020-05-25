'use strict';

const Joi = require('joi');

const postHighlightSchema = Joi.object({
  destination_name: Joi.string().required(),
  highlight_name: Joi.string().required(),
  highlight_location: Joi.string().required(),
  highlight_details: Joi.string().required(),
  highlight_open_street_map: Joi.string().required(),
  highlight_image_details: Joi.string().required()

});

module.exports = postHighlightSchema;