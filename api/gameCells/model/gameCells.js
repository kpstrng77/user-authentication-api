'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameCellModel = new Schema({
  highlight_name: { type: String, required: true },
  cell_name: { type: String, required: true },
  cell_type: { type: String, required: true },
  cell_details: { type: String, required: true },
  cell_image_details: { type: String, required: true },
  cell_column: { type: String, required: true },
  cell_row: { type: String, required: true },
  cell_misc_01: { type: String, required: true },
  cell_misc_02: { type: String, required: true },
  cell_misc_03: { type: String, required: true },
  cell_top_connector: { type: String, required: true },
  cell_bottom_connector: { type: String, required: true },
  cell_left_connector: { type: String, required: true },
  cell_right_connector: { type: String, required: true }
});

module.exports = mongoose.model('GameCell', gameCellModel);