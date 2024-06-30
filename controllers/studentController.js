
const QRCode = require('qrcode');
const Student = require('../models/student');
const Otp = require('../models/otp');


exports.createStudent = async (req, res) => {
  const { name, rollNo, mobileNo, emailId , otp} = req.body;

  const verifyEmailcheck = await Otp.findOne({ email: emailId});

  if (!verifyEmailcheck) {
    return res.status(400).send('please first verify your mail');
  }
  const otpRecord = await Otp.findOne({ email: emailId, otp });
  if (!otpRecord) {
    return res.status(400).send('Invalid OTP');
  }

  await Otp.deleteMany({ email: emailId });
  const newStudent = new Student({ name, rollNo, mobileNo, emailId });
  await newStudent.save();

//   const url = `${req.protocol}://${req.get('host')}/student/${newStudent._id}`;
const qrCodeData = `student:${newStudent._id}`;
const qrCodeUrl = await QRCode.toDataURL(qrCodeData);
  res.render('qrcode', { qrCodeUrl, student: newStudent });
};


exports.getStudent = async (req, res) => {
    res.render('student')
};

exports.getStudentId = async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (!student) {
    return res.status(404).send('Student not found');
    }
    res.send(student);
    };
    