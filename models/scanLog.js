const mongoose = require('mongoose');

const scanLogSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  rollNumber: { type: String, required: true },
  typeof : {type: String, required: true },
  scanTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ScanLog', scanLogSchema);
