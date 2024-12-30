const express = require('express');
const router = express.Router();

const { enrollParticipant } = require('../controllers/participant_controllers/enroll_participant.js');
const { getParticipatingClasses } = require('../controllers/participant_controllers/getUserParticipation.js');
const { deleteParticipant } = require('../controllers/participant_controllers/delete_participant.js');

router.post('/:userId/:classId', enrollParticipant);
router.get('/', getParticipatingClasses);
router.delete('/:classId', deleteParticipant)

module.exports = router;