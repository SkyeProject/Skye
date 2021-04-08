/*

    MANO EU IMPLORO, ALGUÉM ME ARRUMA UM CONVERSOR DE MP4 PARA GIF SEM SER O FFMPEG PLS PLS PLS, ESSA MERDA DE WHATSAPP RECEBE OS ARQUIVOS GIF COMO MP4,
    ASSIM NÃO TEM COMO ENVIAR UM STICKER ANIMADO SEM ANTES CONVERTE-LO!!!

*/
const Commands = require("../config/commands");
const mime = require('mime-types');

const mkdirp = require('mkdirp');
const { writeFile, unlinkSync } = require('fs');

module.exports = class StickerCommand extends Commands {
    constructor(zap) {
        super(zap, {
            name: 'sticker',
            aliases: ['figurinha'],
            category: 'utils',
            ownerOnly: false
        })
    }
    async execute({ client, msg }) {
        const buffer = await client.decryptFile(msg);
        const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const archive = `${randomString}.${mime.extension(msg.mimetype)}`
        const path = `.temp/${archive}`;

        await mkdirp(".temp/");
        writeFile(path, buffer, async () => {
            await client.sendImageAsSticker(msg.from, path)
            unlinkSync(path)
        });
    }
};