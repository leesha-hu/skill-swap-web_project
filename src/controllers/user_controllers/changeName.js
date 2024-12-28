const db = require('../../db/connection.js')

const changeName = async (req, res) => {
    const uid = req.session.userId;
    const name = req.body.inputName;
    
    if (!name.match(/(?=.*[a-zA-Z0-9]{3,}).*$/g)) {
        return res.status(400).json({ error: 'Name should be at least 3 chars long' });
    }

    try {
        await db.query('update users set name=? where user_id=?', [name, uid]);
        return res.status(200).json({ message: 'successfully updated' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Server error' });
    }
}

module.exports = { changeName };