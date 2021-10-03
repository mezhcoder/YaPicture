const path = require('path');

const { nanoid } = require('nanoid');
const { pictureFolder } = require('../config');
const { writeFile, removeFile } = require('../utils/fs');
const fs = require('fs');


module.exports = class Picture {
    constructor(id, createdAt, size) {
        this.id = id || nanoid();
        this.createdAt = createdAt || Date.now();
        this.size = size || -1;
        this.originalFilename = `${this.id}_original.jpeg`;
    }

    async saveOriginal(file) {
        let tmp_path = process.cwd() + "/" + file.path;
        let target_path = process.cwd() + '/files/' + this.id + ".jpeg";
        let src = await fs.createReadStream(tmp_path);
        let dest = await fs.createWriteStream(target_path);
        src.pipe(dest);
        this.size = file.size;
        src.on('end', function() {
            fs.unlink(tmp_path, function() {});
        });
    }

    toJSON() {
        return {
            id: this.id,
            size: this.size,
            createdAt: this.createdAt,
        };
    }
};