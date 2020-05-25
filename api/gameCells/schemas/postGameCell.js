'use strict';

const Joi = require('joi');

const postGameCellSchema = Joi.object({
  highlight_name: Joi.string().required(),
  cell_name: Joi.string().required(),
  cell_type: Joi.string().required(),
  cell_details: Joi.string().required(),
  cell_image_details: Joi.string().required(),
  cell_column: Joi.string().required(),
  cell_row: Joi.string().required(),
  cell_misc_01: Joi.string().required(),
  cell_misc_02: Joi.string().required(),
  cell_misc_03: Joi.string().required(),
  cell_top_connector: Joi.string().required(),
  cell_bottom_connector: Joi.string().required(),
  cell_left_connector: Joi.string().required(),
  cell_right_connector: Joi.string().required()
});

module.exports = postGameCellSchema;