const express = require('express');
const guardController = require('../controllers/guardController');
const router = express.Router();



// Route for handling QR code scanning by the guard
router.post('/scan', guardController.scanQRCode);
router.get('/', (req, res) => {
    res.render('guard');
  });

// POST route for guard login
router.post('/login', guardController.loginGuard);
router.get('/data',guardController.studentData);

module.exports = router;
