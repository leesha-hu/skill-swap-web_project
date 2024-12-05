const db = require('../../db/connection.js'); //connect to database

const getCatSkills = async (req, res) => {
    const cid = req.params.categoryId; //extract id from url
    // extract info from request body 
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const radius = req.body.radius;
    try {
        // get skills within given radius 
        const query = 'SELECT s.skill_id, s.name AS skill_name,s.cat_id, s.description, u.user_id, u.latitude, u.longitude, (6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(u.latitude)) * COS(RADIANS(u.longitude) - RADIANS(?)) +SIN(RADIANS(?)) * SIN(RADIANS(u.latitude)))) AS distance FROM skills s JOIN users u ON s.user_id = u.user_id HAVING distance <= ? ORDER BY distance ASC;';
        const [skills] = await db.query(query, [latitude, longitude, latitude, radius]);

        // get skills belonging to particular category 
        const categorySkills = skills.filter(function (skill) {
            if (skill.cat_id === cid) {
                return true;
            }
        })
        
        return res.json({ message: 'done', skills: categorySkills });
    } catch (error) {
        console.log(error);
        return res.json({ message: 'server error' });
    }
}

module.exports = { getCatSkills };