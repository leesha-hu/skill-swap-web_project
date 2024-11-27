const db = require('../db/connection.js');
const bcryptjs = require('bcryptjs'); // module for password encryption

// function for user login 
const userLogin = async (req, res) => {
    // extract email and password from req object 
    const email = req.body.email;
    const password = req.body.password;

    // check if email and password are entered 
    if (!email || !password) {
        return res.status(400).json({ message: "Fill all details" });
    } else {
        try {
            // verify email 
            const [rows] = await db.query("select password from users where email=?", [email]);
            if (rows.length === 0) {
                return res.status(400).json({ message: "Invalid email or password" });
            }

            // get hashedPassword 
            let hashedPassword = rows[0].password;

            // check if input password and hashedPassword matches
            const isMatch = await bcryptjs.compare(password, hashedPassword);
            if (isMatch) {
                return res.status(200).json({ message: "Login successful" });
            } else {
                return res.status(400).json({ message: "Invalid email or password" });
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }

}

// export function
module.exports = { userLogin };




