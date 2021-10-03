const path = require('path');

const { nanoid } = require('nanoid');
const { pictureFolder } = require('../config');
const { writeFile, removeFile } = require('../utils/fs');


module.exports = class Picture {
    constructor(id, createdAt, size) {
        this.id = id || nanoid();
        this.createdAt = createdAt || Date.now();
        this.size = size || -1;
        this.originalFilename = `${this.id}_original.jpeg`;
    }

    async saveOriginal(data) {
        this.size = Buffer.byteLength(data);
        await writeFile(path.resolve(pictureFolder, this.originalFilename), data);
    }

    async removeOriginal() {
        await removeFile(path.resolve(pictureFolder, this.originalFilename));
    }

    toJSON() {
        return {
            id: this.id,
            size: this.size,
            createdAt: this.createdAt,
        };
    }
};