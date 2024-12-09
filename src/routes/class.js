const express = require('express');
const router = express.Router();

const { addClass } = require('../controllers/class_controllers/addClass.js');
const { deleteClass } = require('../controllers/class_controllers/deleteClass.js');
const { getUserClasses } = require('../controllers/class_controllers/getUserClasses.js');

router.put('/', addClass);
router.delete('/:classId', deleteClass);
router.get('/:userId', getUserClasses)

module.exports = router;