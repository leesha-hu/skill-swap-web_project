const db = require('../../db/connection.js');


const getSkills = async (req, res) => {
    const { latitude, longitude, radius } = req.body;
    if (!radius) {
        radius = 3;
    }

    // Validate input
    if (!latitude || !longitude) {
        return res.status(400).json({ status: 'error', message: 'Latitude and longitude are required' });
    }

    try {
        // query to get skills from database
        const query = 'SELECT s.skill_id, s.name AS skill_name, s.description, u.user_id, u.latitude, u.longitude, (6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(u.latitude)) * COS(RADIANS(u.longitude) - RADIANS(?)) +SIN(RADIANS(?)) * SIN(RADIANS(u.latitude)))) AS distance FROM skills s JOIN users u ON s.user_id = u.user_id HAVING distance <= ? ORDER BY distance ASC;';
        const [skills] = await db.query(query, [latitude, longitude, latitude, radius]);

        // check if skills were found within the given radius 
        if (skills.length === 0) {
            return res.status(200).json({ status: 'success', message: 'no skills found within the given range', skills: skills });
        } else {
            return res.status(200).json({ status: 'success', message: 'successful', skills: skills });
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', message: 'server error' });
    }
}

module.exports = { getSkills };

// function toRadians(degrees) {
//     return degrees * (Math.PI / 180);
// }

// console.log((6371 * Math.acos(Math.cos(toRadians(latitude)) * Math.cos(toRadians(57.34)) * Math.cos(toRadians(23.89) - toRadians(longitude)) +Math.sin(toRadians(latitude)) * Math.sin(toRadians(57.34)))))