const express = require('express');
const router = express.Router();

const { addSkill } = require('../controllers/skill_controllers/addSkill.js');
const { getSkills } = require('../controllers/skill_controllers/getAllSkills.js');
const { updateSkill } = require('../controllers/skill_controllers/updateSkill.js');
const { deleteSkill } = require('../controllers/skill_controllers/deleteSkill.js');
const { getCatSkills } = require('../controllers/skill_controllers/getCategorySkills.js');
const { getUserSkills } = require('../controllers/skill_controllers/getUserSkills.js');

router.get('/:categoryId', getCatSkills);
router.get('/user/:userId', getUserSkills);
router.get('/', getSkills);
router.post('/', addSkill);
router.put('/', updateSkill);
router.delete('/', deleteSkill);

module.exports = router;