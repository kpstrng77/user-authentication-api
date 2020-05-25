'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characterModel = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  country_of_origin: { type: String, required: true },
  country_image: { type: String, required: true },
  occupation: { type: String, required: false },
  game_role: { type: String, required: false },
  character_details: { type: String, required: false },
  character_image: { type: String, required: false }
});

module.exports = mongoose.model('Character', characterModel);