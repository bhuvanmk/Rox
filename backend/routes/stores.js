const express = require('express');
const router = express.Router();
const { list, create } = require('../controllers/storeController');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/role');
const { createStore } = require('../validators/storeValidator');
const { validate } = require('../middleware/validator');

// USER can list stores
router.get('/', authenticate, authorize('USER'), list);
// ADMIN can create stores
router.post('/', authenticate, authorize('ADMIN'), validate([createStore]), create);

module.exports = router;
