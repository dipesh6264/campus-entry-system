const express = require('express');
const router = express.Router();
const codeController = require('../controllers/codeController');

router.get('/', codeController.getIndex);
router.post('/run', codeController.runCode);

module.exports = router;
