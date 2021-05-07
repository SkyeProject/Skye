/*
*   Comando pedido por Carlos :)
*/
const Command = require('../../config/Command')

module.exports = class ThanksCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'thanks',
      aliases: ['obrigado', 'obrigada', 'obrigadx', 'obr', 'obrigade', 'thank', 'thank-you', 'thx'],
      description: 'De nada meu amigo :)',
      example: 'obrigado',
      category: 'fun',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false
    })
  }

  async execute ({ msg }) {
    try {
      const awsner = ['D-dnada 😳', 'N tem de que amor!', 'dinadinha hihi', 'uwu q nada bobinhu', 'aaaah que fofo, denada!!! ❤❤', 'eu que te agradeço 😜', 'Assim eu fico com vergonha 😳', 'De nada😳👉🏼👈🏻'] // n tem pq criar um json de respostas
      const number = this.getRandomInt(0, awsner.length)
      await msg.send(awsner[number], { reply: true })
      if (number === (awsner.length - 1)) await msg.sendSticker('https://is.gd/OMOhrJ', false)
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
