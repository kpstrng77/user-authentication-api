'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dialogueModel = new Schema({
  char_first_name: { type: String, required: true },
  char_last_name: { type: String, required: true },
  cell_name: { type: String, required: true },
  dialogue_order_num: { type: String, required: true },
  animation_details: { type: String, required: false },
  dialogue_text: { type: String, required: false },
  misc_01: { type: String, required: false },
  misc_02: { type: String, required: false }
});

module.exports = mongoose.model('Dialogue', dialogueModel);