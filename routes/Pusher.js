const express = require('express');
const router = express.Router();
const pusherController = require('../controllers/Pusher');
const { userwithId } = require('../helpers/Verify');

router.post('/push/notif/interest', pusherController.pushInterest)
router.post('/push/notif/users', pusherController.pushToUser)
router.get('/generate-token', userwithId, pusherController.generateToken)

module.exports = router