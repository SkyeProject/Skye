const Commands = require("../config/commands");
const moment = require("moment-timezone")
moment.tz.setDefault('America/Sao_Paulo').locale('pt_BR')

module.exports = class pingCommand extends Commands {
    constructor(zap) {
        super(zap, {
            name: 'ping',
            aliases: ['ms'],
            category: 'utils',
            ownerOnly: false
        })
    }
    async execute({ msg }) {
        msg.send(`${moment.duration(moment() - moment(msg.t * 1000)).asSeconds()} segundo(s).`)
    }
}