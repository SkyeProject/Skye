const Command = require('../../config/Command')

module.exports = class ReleasedCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'released',
      aliases: ['liberado', 'pode', 'podenogrupo'],
      category: 'fun',
      onlyGroup: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false
    })
  }

  async execute ({ msg, args }) {
    try {
      const message = args.join(' ')
      const text = require('../../config/games/released.json')
      const randomText = text[this.getRandomInt(0, Object.keys(text).length)]
      if (!message) return msg.send('Não sei se ta liberado, até porquê você não colocou nada (!liberado mensagem)', { reply: true })
      if (!msg.isGroupMsg) msg.send(`Ta liberado *${message}* no pv?\n\nA Resposta é: *${randomText}*!`, { reply: true })
      else msg.send(`Ta liberado *${message}* no grupo?\n\nA Resposta é: *${randomText}*!`, { reply: true })
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
