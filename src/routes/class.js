const express = require('express');
const router = express.Router();

const { addClass } = require('../controllers/class_controllers/addClass.js');

router.put('/', addClass);

module.exports = router;