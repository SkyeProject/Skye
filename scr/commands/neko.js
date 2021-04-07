const Commands = require("../config/commands");
const superagent = require('superagent');

module.exports = class NekoCommand extends Commands {
    constructor(zap) {
        super(zap, {
            name: 'neko',
            aliases: ['kwaii, gata'],
            category: 'fun',
            ownerOnly: false
        })
    }
    async execute({ msg }) {
        const nekoimage = (await superagent.get('https://nekos.life/api/v2/img/neko')).body,
            nekotext = (await superagent.get('https://nekos.life/api/v2/cat')).body
        msg.sendImage(nekoimage.url, nekotext.cat)
    }
};