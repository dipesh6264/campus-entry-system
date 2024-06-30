// models/CabDriver.js
const mongoose = require('mongoose');

const cabDriverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobileNo: {
    type: String,
    required: true
  },
  rollNo: {
    type: String,
    required: true
  },
  carName: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('CabDriver', cabDriverSchema);
