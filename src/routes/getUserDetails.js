const express = require('express');

const router = express.Router();

const { getUser } = require('../controllers/getUser.js');
const { getUserId } = require('../controllers/getId.js');

router.get('/uid', getUserId);
router.get('/', getUser);

module.exports = router;