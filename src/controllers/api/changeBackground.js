const db = require('../../entites/Database');
const { replaceBackground } = require('backrem');
const fs = require('fs');

module.exports = async (req, res) => {
    const front = req.query.front;
    const back = req.query.back;
    const color = req.query.color;
    const threshold = req.query.threshold;

    if (!front && back && color && threshold) {
        res.status(400).json({ message: "Parameters missing"});
        return;
    }

    if (!(await db.getPicture(front))) {
        res.status(400).json({ message: "Not found picture: " + front});
        return;
    }
    if (!(await db.getPicture(back))) {
        res.status(400).json({ message: "Not found picture: " + back});
        return;
    }

    const frontFile = fs.createReadStream(
        process.cwd() + "/files/" + front + ".jpeg"
    );

    const backFile = fs.createReadStream(
        process.cwd() + "/files/" + back + ".jpeg"
    );
    const arrayColor = color.split(",").map(function (x) {
        return parseInt(x, 10);
    });

    await replaceBackground(frontFile, backFile, arrayColor, parseInt(threshold, 10)).then(
        (readableStream) => {
            readableStream.pipe(res);
        }
    );
};