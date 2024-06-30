const QRCode = require('qrcode');
const Visitor = require('../models/visitor');
const Otp = require('../models/otp');


exports.createVisitor = async (req, res) => {
  const { name,  mobileNo, rollNo, emailId , otp} = req.body;

  const verifyEmailcheck = await Otp.findOne({ email: emailId});

  if (!verifyEmailcheck) {
    return res.status(400).send('please first verify your mail');
  }
  const otpRecord = await Otp.findOne({ email: emailId, otp });
  if (!otpRecord) {
    return res.status(400).send('Invalid OTP');
  }

  await Otp.deleteMany({ email: emailId });
  const newVisitor = new Visitor({ name, mobileNo,rollNo, emailId });
  await newVisitor.save();

//   const url = `${req.protocol}://${req.get('host')}/student/${newStudent._id}`;
const qrCodeData = `visitor:${newVisitor._id}`;
const qrCodeUrl = await QRCode.toDataURL(qrCodeData);
  res.render('qrcode', { qrCodeUrl, student:newVisitor });
};


exports.getVisitor = async (req, res) => {
    res.render('visitor')
};

exports.getVisitorId = async (req, res) => {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) {
    return res.status(404).send('Visitor not found');
    }
    res.send(visitor);
};
    