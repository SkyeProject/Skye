const { create, Client } = require("@open-wa/wa-automate");
const { zap, config } = require("../index");
const sleep = require("sleep-promise")
create().then((client) => start(client));

async function start(atizap = new Client()) {

    atizap.onMessage(async (msg) => {
        msg.content = msg.caption || msg.body;
        if (!msg.content)
            return;

        const prefix = config.bot.prefix;
        if (!msg.content.toLowerCase().startsWith(prefix))
            return;

        const args = msg.content.slice(prefix.length).trim().split(/ +/);
        const cmd = args.shift().toLowerCase();

        if (!zap.commands.has(cmd) && !zap.aliases.has(cmd))
            return;

        const botContact = await atizap.getMe()

        msg.send = async (message, deleteMessage) => {
            atizap.reply(msg.from, message, msg.id).then(async m => {
                if (deleteMessage) {
                    await sleep(deleteMessage)
                    atizap.deleteMessage(msg.from, [m]);
                }
            })
        }

        msg.sendImage = (image, message) => {
            atizap.sendImage(msg.from, image, "file", message);
        }

        msg.sendSticker = (Base64, boolean) => {
            switch (boolean) {
                case false:
                    atizap.sendImageAsSticker(msg.from, Base64, { author: "+" + botContact.me.user, pack: botContact.pushname, keepScale: true })
                    break;

                case true:
                    atizap.sendMp4AsSticker(msg.from, Base64, null, { author: "+" + botContact.me.user, pack: botContact.pushname })
                    break;
            }
        }

        const file = zap.commands.get(cmd) || zap.commands.get(zap.aliases.get(cmd));
        if (file) {
            file.execute({ atizap, msg, args, prefix });
        }
    })
}