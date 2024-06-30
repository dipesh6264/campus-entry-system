const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController');

router.get('/:id', visitorController.getVisitorId);
router.get('/', visitorController.getVisitor);
router.post('/', visitorController.createVisitor);

module.exports = router;
