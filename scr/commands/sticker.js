const Commands = require("../config/commands");
const ffmpeg = require('fluent-ffmpeg-extended');
const mime = require('mime-types');
const mkdirp = require('mkdirp');
const { writeFile, unlinkSync } = require('fs');

module.exports = class StickerCommand extends Commands {
    constructor(zap) {
        super(zap, {
            name: 'sticker',
            aliases: ['s', 'figurinha'],
            category: 'utils',
            ownerOnly: false
        })
    }
    async execute({ client, msg }) {
        const buffer = await client.decryptFile(msg);
        const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const archivename = randomString
        let path = `.temp/${archivename}.${mime.extension(msg.mimetype)}`;

        await mkdirp(".temp/");
        writeFile(path, buffer, async () => {
            if (mime.extension(msg.mimetype) === "mp4") {
                return ffmpeg({ source: path }).saveToFile(`.temp/${archivename}.gif`, async () => {
                    unlinkSync(path)
                    path = `.temp/${archivename}.gif`
                    await client.sendImageAsStickerGif(msg.from, path)
                    unlinkSync(path)
                });
            }
            await client.sendImageAsSticker(msg.from, path)
            unlinkSync(path)
        });
    }
};