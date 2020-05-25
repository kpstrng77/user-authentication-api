'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const highlightModel = new Schema({
  destination_name: { type: String, required: true },
  highlight_name: { type: String, required: true },
  highlight_location: { type: String, required: true },
  highlight_details: { type: String, required: true },
  highlight_open_street_map: { type: String, required: true },
  highlight_image_details: { type: String, required: true }
});

module.exports = mongoose.model('Highlight', highlightModel);