const { EventEmitter } = require('events');
const { dbDumpFile } = require('../config');
const { prettifyJsonToString } = require('../utils/prettifyJsonToString');
const { exists } = require('../utils/fs');
const Picture = require('../entites/Picture');


const fs = require('../utils/fs');


class Database extends EventEmitter {
    constructor() {
        super();
        this.idToPicture = {};
    }

    async insert(picture) {
        this.idToPicture[picture.id] = picture;
        this.emit('changed');
    }

    async findPicture(pictureId) {
        return this.idToPicture[pictureId];
    }

    async initFromDump() {
        if (await exists(dbDumpFile) === false) {
            return;
        }

        const dump = require("../" + dbDumpFile);

        if (typeof dump === 'object') {
            this.idToPicture = {};

            for (let id in dump) {
                const picture_obj = dump[id];
                this.idToPicture[id] = new Picture(picture_obj.id, picture_obj.createdAt, picture_obj.size);
            }
        }
    }

    async toJSON() {
        return this.idToPicture;
    }
}

const db = new Database();
db.initFromDump();
//
db.on('changed', () => {
    fs.writeFile(dbDumpFile, prettifyJsonToString(db.toJSON()));
});

module.exports = db;