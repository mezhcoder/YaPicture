const db = require('../../entites/Database');
const Picture = require('../../entites/Picture');

module.exports = async (req, res, next) => {
    try {
        if (!req.files) {
            res.status(400).json({ message: "Not found file" });
            return;
        }

        const picture = new Picture();
        await picture.saveOriginal(req.files[''].data);

        await db.insert(picture)

        return res.json(await db.getPicture(picture.id));
    } catch (err) {
        return next(err);
    }
};