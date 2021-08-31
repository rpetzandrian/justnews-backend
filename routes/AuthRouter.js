const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const authMiddleware = require('../helpers/authMiddleware');
const hashing = require('../helpers/Hashing')

router.post('/login', authMiddleware, authController.login);
router.post('/register', hashing, authController.register);
// router.get('/login/google', passport.authenticate('google', { session: false }))
// router.get('/login/google/callback', passport.authenticate('google'), (req, res) => {
//   res.send(req.user);
// })

module.exports = router;