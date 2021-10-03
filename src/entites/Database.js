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

    async getPictures() {
        const result = [];
        for (let key in this.idToPicture) {
            result.push(await this.getPicture(key));
        }
        return result;
    }

    async getPicture(id) {
        if (!this.idToPicture[id]) return null;
        const obj = {};
        obj["id"] = id;
        obj["createdAt"] = this.idToPicture[id].createdAt;
        obj["size"] = this.idToPicture[id].size;
        return obj;
    }

    async removePicture(id) {
        delete this.idToPicture[id];
        await fs.removeFile(process.cwd() + "/files/" + id + ".jpeg");
        this.emit('changed');
    }

    async initFromDump() {
        if (await exists(process.cwd() + dbDumpFile) === false) {
            return;
        }
        const dump = require(process.cwd() + dbDumpFile);

        if (typeof dump === 'object') {
            this.idToPicture = {};

            for (let id in dump) {
                const picture_obj = dump[id];
                this.idToPicture[id] = new Picture(picture_obj.id, picture_obj.createdAt, picture_obj.size);
            }
        }
    }

    toJSON() {
        return this.idToPicture;
    }
}

const db = new Database();
db.initFromDump();
//
db.on('changed', () => {
    fs.writeFile(process.cwd() + dbDumpFile, prettifyJsonToString(db.toJSON()));
});

module.exports = db;