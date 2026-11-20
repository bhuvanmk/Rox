const express = require('express');
const router = express.Router();
const { login, me } = require('../controllers/authController');
const { login: loginValidator } = require('../validators/authValidator');
const { validate } = require('../middleware/validator');
const { authenticate } = require('../middleware/auth');

router.post('/login', validate([loginValidator]), login);
router.get('/me', authenticate, me);

module.exports = router;
