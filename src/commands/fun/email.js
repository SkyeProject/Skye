const req = require('request')
const Command = require('../../config/Command')

module.exports = class EmailCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'email',
      aliases: ['e-mail', 'e'],
      category: 'fun',
      description: 'Mande um email anônimo de verdade para uma pessoa!',
      example: 'email yudibomdiaecia@yahoo.com.br / Yuudi me da play 2 / mano é meu sonho ter um ps2 me da pfvpfv mano :(',
      onlyGroup: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false
    })
  }

  execute ({ msg, args, prefix }) {
    try {
      const emailInfo = args.join(' ').split('/')
      const email = emailInfo[0]
      const subject = emailInfo[1]
      const contents = emailInfo[2]
      if (!email || !subject || !contents) {
        return msg.send(`*Para enviar um email use: ${prefix}email <email da pessoa> / <assunto> / <conteúdo do email.> Exemplo:*
${prefix}email yudibomdiaecia@yahoo.com.br / Yuudi me da play 2 / mano é meu sonho ter um ps2 me da pfvpfv mano :(`, { reply: true })
      }
      req({
        uri: `https://videfikri.com/api/spamemail/?email=${email}&subjek=${subject}&pesan=${contents}`,
        method: 'GET'
      }, (e, r, b) => {
        if (JSON.parse(b).result.status === '404') return msg.send('Ops, algum erro aconteceu. Verifique sua ortografia e tente novamente.', { reply: true })
        msg.send(`*Seu email foi enviado!*
📧: ${email}
🗣: ${subject}
✍️: ${contents}`, { reply: true })
      })
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
