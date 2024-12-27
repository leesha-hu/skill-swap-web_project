const db = require('../db/connection.js');

const getUserId = (req, res) => {
    console.log(req.session.userId)
    if (req.session.userId) {
        res.json({ userId: req.session.userId });
    } else {

        res.status(401).json({ error: "User not logged in" });
    }

}

module.exports = { getUserId };