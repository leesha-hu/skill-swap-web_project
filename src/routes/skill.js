const express = require('express');
const router = express.Router();

const { addSkill } = require('../controllers/skill_controllers/addSkill.js');
const { getSkills } = require('../controllers/skill_controllers/getAllSkills.js');
const { updateSkill } = require('../controllers/skill_controllers/updateSkill.js');
const { deleteSkill } = require('../controllers/skill_controllers/deleteSkill.js');

router.post('/', addSkill);
router.get('/', getSkills);
router.put('/', updateSkill);
router.delete('/', deleteSkill);

module.exports = router;