const db = require('../../entites/Database');

module.exports = async (req, res) => {
    return res.json(await db.toJSON());
};