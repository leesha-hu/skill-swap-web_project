const express = require('express');

const router = express.Router();

const { getUser } = require('../controllers/getUser.js');
const { getUserId } = require('../controllers/getId.js');
const { getProfile } = require('../controllers/user_controllers/getProfile.js');
const { changeName } = require('../controllers/user_controllers/changeName.js');
const { changePhone } = require('../controllers/user_controllers/changePhone.js');

router.get('/uid', getUserId);
router.get('/profile', getProfile)
router.get('/', getUser);

router.put('/name', changeName);
router.put('/phone', changePhone);

module.exports = router;