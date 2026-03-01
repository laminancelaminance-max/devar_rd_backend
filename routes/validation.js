const express = require('express');
const router = express.Router();
const validationController = require('../controllers/validationController');

router.post('/username', validationController.checkUsername);
router.post('/email', validationController.checkEmail);

module.exports = router;