const Command = require('../../config/Command')

module.exports = class ReleasedCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'released',
      aliases: ['liberado', 'pode', 'podenogrupo'],
      category: 'fun',
      description: 'Está liberado no grupo???????',
      example: 'liberado hentai',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false,
      isWorking: true
    })
  }

  async execute ({ msg, args }) {
    try {
      const message = args.join(' ')
      const text = require('../../config/modules/API/games/released.json')
      const randomText = text[this.getRandomInt(0, Object.keys(text).length)]
      if (!message) return await msg.send('Não sei se ta liberado, até porquê você não colocou nada (!liberado mensagem)', { reply: true })
      if (!msg.isGroupMsg) await msg.send(`Ta liberado *${message.replace('?', '')}* no pv?\n\nA Resposta é: *${randomText}*!`, { reply: true })
      else await msg.send(`Ta liberado *${message.replace('?', '')}* no grupo?\n\nA Resposta é: *${randomText}*!`, { reply: true })
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
