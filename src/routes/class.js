const express = require('express');
const router = express.Router();

const { addClass } = require('../controllers/class_controllers/addClass.js');
const { deleteClass } = require('../controllers/class_controllers/deleteClass.js');

router.put('/', addClass);
router.delete('/:classId', deleteClass);

module.exports = router;