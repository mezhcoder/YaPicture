const db = require('../../entites/Database');
const Picture = require('../../entites/Picture');

module.exports = async (req, res, next) => {
    try {
        const picture = new Picture();
        await picture.saveOriginal(req.files[''].data);

        await db.insert(picture)

        return res.json(picture.toJSON()['id']);
    } catch (err) {
        return next(err);
    }
};