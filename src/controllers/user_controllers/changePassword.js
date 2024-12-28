const db = require('../../db/connection.js')
const bcryptjs = require('bcryptjs');

const changePassword = async (req, res) => {
    const uid = req.session.userId;
    const password = req.body.inputPassword;
    const currentPassword = req.body.inputCurrentPassword;

    try {
        // get password 
        const [rows] = await db.query("select password from users where user_id=?", [uid]);
        if (rows.length === 0) {
            return res.status(400).json({ error: "Some error occured" });
        }

        // get hashedPassword 
        let hashedPassword = rows[0].password;

        // check if input password and hashedPassword matches
        const isMatch = await bcryptjs.compare(currentPassword, hashedPassword);

        if (!isMatch) {
            return res.json({ message: 'incorrect password' })
        }

        // password hashing
        const newPassword = await bcryptjs.hash(password, 10);

        await db.query('update users set password=? where user_id=?', [newPassword, uid]);
        return res.status(200).json({ message: 'successfully updated' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Server error' });
    }
}

module.exports = { changePassword };