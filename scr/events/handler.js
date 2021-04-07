const { zap, config } = require("../../index");
zap.venom.create().then((client) => start(client))

async function start(client) {

    client.onMessage(async (msg) => {

        const prefix = config.prefix
        if (!msg.body.toLowerCase().startsWith(prefix))
            return;

        const args = msg.body.slice(prefix.length).trim().split(/ +/);
        const cmd = args.shift().toLowerCase();

        if (!zap.commands.has(cmd) && !zap.aliases.has(cmd))
            return;

        msg.send = (options) => {
            client.sendText(msg.from, options)
        }

        const file = zap.commands.get(cmd) || zap.commands.get(zap.aliases.get(cmd))
        if (file) {
            file.execute({ msg, args, prefix })
        }
    })
}