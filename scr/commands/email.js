const Commands = require("../config/commands");
const req = require('request')
module.exports = class emailCommand extends Commands {
    constructor(zap) {
        super(zap, {
            name: 'email',
            aliases: ['e'],
            category: 'fun',
            ownerOnly: false
        })
    }
    execute({ msg, args, prefix }) {
        const emailInfo = args.join(" ").split("/"),
            email = emailInfo[0],
            subject = emailInfo[1],
            contents = emailInfo[2]
        if (!email || !subject || !contents) return msg.send(`*Para enviar um email use: ${prefix}email <email da pessoa: / <assunto> / <conteúdo do email.> Exemplo:*
${prefix}email yudibomdiaecia@yahoo.com.br / Yuudi me da play 2 / mano é meu sonho ter um ps2 me da pfvpfv mano :(`)
        req({
            uri: `https://videfikri.com/api/spamemail/?email=${email}&subjek=${subject}&pesan=${contents}`,
            method: 'GET'
        }, (e, r, b) => {
            if (!b[0])
                return msg.send(`*Seu email foi enviado!*
📧: ${email}
🗣: ${subject}
✍️: ${contents}`)
            else msg.send("Ops, algum erro aconteceu. Verifique sua ortografia e tente novamente.")
        });
    }
}