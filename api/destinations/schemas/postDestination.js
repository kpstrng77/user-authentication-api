'use strict';

const Joi = require('joi');

const postDestinationSchema = Joi.object({
  destination_name: Joi.string().required(),
  destination_location: Joi.string().required(),
  destination_details: Joi.string().required(),
  destination_open_street_map: Joi.string().required(),
  destination_image_details: Joi.string().required()

});

module.exports = postDestinationSchema;