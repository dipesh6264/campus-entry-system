const express = require('express');
const router = express.Router();
const CabDriver = require('../models/cabdriver');
const QRCode = require('qrcode');

// Handle cab driver form submission
router.get('/',(req, res) => {
    res.render('cabdriver');
  });
router.post('/', async (req, res) => {
  const { name, mobileNo, rollNo, carName } = req.body;

  try {
    const newCabDriver = new CabDriver({
      name,
      mobileNo,
      rollNo,
      carName
    });
    await newCabDriver.save();
    const qrCodeData = `cabdriver:${newCabDriver._id}`;
    const qrCodeUrl = await QRCode.toDataURL(qrCodeData);
    res.render('qrcode', { qrCodeUrl, student: newCabDriver });

  } catch (error) {
    console.error('Error saving cab driver information:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
