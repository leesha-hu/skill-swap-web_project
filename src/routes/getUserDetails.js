const express = require('express');

const router = express.Router();

const { getUser } = require('../controllers/getUser.js');
const { getUserId } = require('../controllers/getId.js');
const { getProfile } = require('../controllers/user_controllers/getProfile.js');
const { changeName } = require('../controllers/user_controllers/changeName.js');

router.get('/uid', getUserId);
router.get('/profile', getProfile)
router.get('/', getUser);

router.put('/name', changeName);

module.exports = router;