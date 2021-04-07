const Commands = require("../config/commands");

    module.exports = class CommandSay extends Commands{
         constructor(zap) {
             super(zap, {
                 name: 'help',
                 aliases: ['ajuda'],
                 category: 'test',
                 ownerOnly: false
             })
         }
         execute({msg}) {
            msg.send('ATIZAP COMMANDS\n\nOi: ao digitar "oi", irei te responder\n\n!sticker, figurinha, fig: Cria uma figurinha com o conteudo desejado.\nEx.: !sticker Hello World! ou !sticker (foto)')             
         }

    }