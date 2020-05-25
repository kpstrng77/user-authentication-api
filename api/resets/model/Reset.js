'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resetModel = new Schema({
  id: { type: String, required: true},
  email: { type: String, required: true},
  admin: { type: Boolean, required: true },
  time : { type: Number, default: (new Date()).getTime() }
});

module.exports = mongoose.model('Reset', resetModel);