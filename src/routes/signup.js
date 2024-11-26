const express = require('express');
const path = require('path');

const router = express.Router();

const { signupUser } = require('../controllers/addUser.js');

// routes 
router.post('/signup', signupUser);

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
})

module.exports = router;