'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationModel = new Schema({
  destination_name: { type: String, required: true },
  destination_location: { type: String, required: true },
  destination_details: { type: String, required: true },
  destination_open_street_map: { type: String, required: true },
  destination_image_details: { type: String, required: true }
});

module.exports = mongoose.model('Destination', destinationModel);