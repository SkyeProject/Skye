const Commands = require("../config/commands");

module.exports = class HelpCommand extends Commands {
    constructor(zap) {
        super(zap, {
            name: 'help',
            aliases: ['ajuda'],
            category: 'utils',
            ownerOnly: false
        })
    }
    execute({ msg }) {
        msg.send('ATIZAP COMMANDS\n\nOi: ao digitar "oi", irei te responder\n\n!sticker, figurinha, fig: Cria uma figurinha com o conteudo desejado. (em desenvolvimento)\nEx.: !sticker Hello World! ou !sticker (foto)')
    }
}