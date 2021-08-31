const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const hashing = require('../helpers/Hashing');
const { uploadPhoto } = require('../helpers/Upload');
const { adminVerify, useroradminVerify } = require('../helpers/Verify');

router.get('/', adminVerify, userController.getAllUsers);

router.post('/', adminVerify, uploadPhoto, hashing, userController.addUsers);

router.get('/:user_id', useroradminVerify, userController.getUsersById);

router.patch('/:user_id', useroradminVerify, uploadPhoto, userController.updateUsers);

router.delete('/:user_id', adminVerify, userController.deleteUsers);

module.exports = router;