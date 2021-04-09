const Commands = require("../config/commands");

module.exports = class pingCommand extends Commands {
    constructor(zap) {
        super(zap, {
            name: 'ping',
            aliases: ['ms'],
            category: 'utils',
            ownerOnly: false
        })
    }
    async execute({ msg, atizap }) {
        const oldDate = Date.now()
        atizap.sendText(msg.from, "Pingando...").then(async m => {
            msg.send(Date.now() - oldDate + "ms")
            atizap.deleteMessage(msg.from, m)
        })
    }
}