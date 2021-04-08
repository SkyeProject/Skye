const Commands = require("../config/commands");
const ffmpeg = require('fluent-ffmpeg');
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
        if (msg.isMedia === false) return msg.send("Oops, mande a imagem/gif que tu quer e escreva no texto \"!s\"")
        const buffer = await client.decryptFile(msg);
        const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const archivename = randomString
        let path = `.temp/${archivename}.${mime.extension(msg.mimetype)}`;

        await mkdirp(".temp/");
        writeFile(path, buffer, async () => {
            msg.send("Só um momentinho, seu sticker já está sendo feito!")
            if (mime.extension(msg.mimetype) === "mp4") {
                await new Promise(async (r, s) => {
                    ffmpeg(path).withDuration(4).noAudio().size('?x412').saveToFile(`.temp/${archivename}.gif`).on('end', () => {
                        r()
                    })
                })
                unlinkSync(path)
                path = `.temp/${archivename}.gif`
                await client.sendImageAsStickerGif(msg.from, path)
                return unlinkSync(path);
            }
            await client.sendImageAsSticker(msg.from, path)
            unlinkSync(path)
        });
    }
};






















































































































































































//fiz tudo isso sozinho, rex fez nada :noob:
