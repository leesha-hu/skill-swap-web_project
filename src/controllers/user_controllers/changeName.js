const db = require('../../db/connection.js')

const changeName = async (req, res) => {
    const uid = req.session.userId;
    const name = req.body.inputName;

    try {
        await db.query('update users set name=? where user_id=?', [name, uid]);
        return res.status(200).json({ message: 'successfully updated' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Server error' });
    }
}

module.exports = { changeName };