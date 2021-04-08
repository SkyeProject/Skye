const { zap, config } = require("../index");
zap.venom.create().then((client) => start(client));

async function start(client) {

    client.onMessage(async (msg) => {
        msg.content = msg.caption || msg.body;

        const prefix = config.prefix;
        if (!msg.content.toLowerCase().startsWith(prefix))
            return;

        const args = msg.content.slice(prefix.length).trim().split(/ +/);
        const cmd = args.shift().toLowerCase();

        if (!zap.commands.has(cmd) && !zap.aliases.has(cmd))
            return;

        msg.send = (options) => {
            client.sendText(msg.from, options);
        }

        msg.sendImage = (options, options2) => {
            client.sendImage(msg.from, options, "file", options2);
        }

        const file = zap.commands.get(cmd) || zap.commands.get(zap.aliases.get(cmd));
        if (file) {
            file.execute({ client, msg, args, prefix });
        }
    })
}