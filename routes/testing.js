const express = require('express');
const { adminMiddleware } = require('../controllers/testing');
const { adminVerify } = require('../helpers/Verify');
const router = express.Router();

router.get('/adminonly', adminVerify, adminMiddleware)

module.exports = router