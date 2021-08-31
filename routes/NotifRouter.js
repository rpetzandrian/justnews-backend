const express = require('express');
const router = express.Router();
const notifController = require('../controllers/NotifController');

router.get('/:user_id', notifController.getNotif);
router.patch('/:user_id', notifController.readNotif);
router.post('/', notifController.pushNotif);
router.delete('/', notifController.deleteNotif);

module.exports = router
