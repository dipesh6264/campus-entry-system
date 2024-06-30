const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  name: String,
  mobileNo: String,
  rollNo: String,
  emailId: String
});

module.exports = mongoose.model('Visitor', visitorSchema);
