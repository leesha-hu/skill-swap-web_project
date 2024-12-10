const express = require('express');
const router = express.Router();

const { enrollParticipant } = require('../controllers/participant_controllers/enroll_participant.js');
const { getParticipatingClasses } = require('../controllers/participant_controllers/getUserParticipation.js')

router.post('/:userId/:classId', enrollParticipant);
router.get('/:userId', getParticipatingClasses);

module.exports = router;