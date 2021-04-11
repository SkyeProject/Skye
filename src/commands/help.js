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
    execute({ msg, prefix }) {
     
        msg.send(`SCHWAP COMMANDS\n\n${prefix}Oi: Irei te responder (?)\n\n${prefix}sticker, figurinha, s: Cria uma figurinha com o conteudo desejado.\nEx.: ${prefix}sticker Hello World! ou !sticker (foto)\n\n${prefix}neko, kwaii, gata: Busca uma neko pra você :3\n\n\ ${prefix}ping, ms: Calcula a latência\n\n${prefix}everyone, mentionall: Menciona todos os membros de um grupo\n\n${prefix}calcular, math, c: Calcula dois valores que voce desejar`)
    }
}
