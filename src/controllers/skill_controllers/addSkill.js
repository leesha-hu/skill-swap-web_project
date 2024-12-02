const db = require('../../db/connection.js'); // database connection

const addSkill = async (req, res) => {
    const sname = req.body.name;
    const description = req.body.description;
    const uid = req.body.uid;
    const cid = req.body.cid;

    if (!sname || !uid || !cid) {
        return res.status(400).json({ status: 'error', message: 'incomplete form' });
    } else {
        try {
            // check if user exists
            const [users] = await db.query('select * from users where user_id=?', [uid]);
            if (users.length == 0) {
                return res.status(400).json({ status: 'error', message: 'invalid user' });
            }

            // check if category exists
            const [category] = await db.query('select * from category where cat_id=?', [cid]);
            if (category.length == 0) {
                return res.status(400).json({ status: 'error', message: 'invalid category' });
            }

            // insert into database
            await db.query('insert into skills (user_id,cat_id,name,description)values (?,?,?,?)', [uid, cid, sname, description]);
            return res.status(201).json({ status: 'success', message: 'skill added successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 'error', message: 'Server error' });
        }

    }
}

module.exports = { addSkill };