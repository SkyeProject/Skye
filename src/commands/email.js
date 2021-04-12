const req = require('request')
const Commands = require('../config/commands')

module.exports = class EmailCommand extends Commands {
  constructor (zap) {
    super(zap, {
      name: 'email',
      aliases: ['e'],
      category: 'fun',
      ownerOnly: false
    })
  }

  execute ({ msg, args, prefix }) {
    const emailInfo = args.join(' ').split('/')
    const email = emailInfo[0]
    const subject = emailInfo[1]
    const contents = emailInfo[2]
    if (!email || !subject || !contents) {
      return msg.send(`*Para enviar um email use: ${prefix}email <email da pessoa: / <assunto> / <conteúdo do email.> Exemplo:*
${prefix}email yudibomdiaecia@yahoo.com.br / Yuudi me da play 2 / mano é meu sonho ter um ps2 me da pfvpfv mano :(`)
    }
    req({
      uri: `https://videfikri.com/api/spamemail/?email=${email}&subjek=${subject}&pesan=${contents}`,
      method: 'GET'
    }, (e, r, b) => {
      if (JSON.parse(b).result.status === '404') return msg.send('Ops, algum erro aconteceu. Verifique sua ortografia e tente novamente.')
      msg.send(`*Seu email foi enviado!*
📧: ${email}
🗣: ${subject}
✍️: ${contents}`)
    })
  }
}
