const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Otp = require('../models/otp');



const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendOtp = async (req, res) => {
  const { emailId } = req.body;
  const otp = crypto.randomInt(1000, 9999).toString();

  const otpRecord = new Otp({ email: emailId, otp });
  await otpRecord.save();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emailId,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending OTP email');
    } else {
        res.status(200).send('OTP sent successfully');
    }
  });
};

