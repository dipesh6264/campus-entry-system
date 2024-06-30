// models/student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  mobileNo: String,
  emailId: String
});

module.exports = mongoose.model('Student', studentSchema);
