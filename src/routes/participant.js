const express = require('express');
const router = express.Router();

const { enrollParticipant } = require('../controllers/participant_controllers/enroll_participant.js');

router.post('/:userId/:classId', enrollParticipant);

module.exports = router;