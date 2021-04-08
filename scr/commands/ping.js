const Commands = require("../config/commands");

let time = new Date().getTime();
time = (new Date().getTime()) - time

module.exports = class pingCommand extends Commands {
    constructor(zap) {
        super(zap, {
            name: 'ping',
            aliases: ['ms'],
            category: 'utils',
            ownerOnly: false
        })
    }
    execute({ msg }) {
        msg.send(`${time}ms`)
}
}