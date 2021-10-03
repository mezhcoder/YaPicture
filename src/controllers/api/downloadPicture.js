const db = require('../../entites/Database');

module.exports = async (req, res) => {
    if (!(await db.getPicture(req.params.id))) {
        res.status(400).json({ message: "Not found file"});
        return;
    }
    res.download(process.cwd() + "/files/" + req.params.id + ".jpeg");
};