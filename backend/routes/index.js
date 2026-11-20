const express = require('express');
const router = express.Router();

// Import sub‑routers
router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/stores', require('./stores'));
router.use('/ratings', require('./ratings'));
router.use('/dashboard', require('./dashboard'));

module.exports = router;
