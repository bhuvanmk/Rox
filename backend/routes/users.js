const express = require('express');
const router = express.Router();
// Placeholder – real implementations are in src/controllers/*
router.get('/', (req, res) => res.json({ message: 'User routes placeholder' }));
module.exports = router;
