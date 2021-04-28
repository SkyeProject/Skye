const Command = require('../../config/Command')

module.exports = class ReleasedCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'liberado',
      aliases: ['pode', 'podenogrupo'],
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
      const argss = args.join(' ')
      const quest = ['Sim', 'Não', 'Claro', 'Obvio', 'Claro que não', 'Melhor não', 'Talvez sim', 'Talvez não']
      const randomText = quest[Math.floor((Math.random() * quest.length))]
      if (!argss) return msg.send('Não sei se ta liberado, até porquê você não colocou nada (!liberado mensagem)', { reply: true })
      if (!msg.isGroupMsg) msg.send(`Ta liberado *${argss}* no pv?\n\nA Resposta é: *${randomText}*!`, { reply: true })
      else msg.send(`Ta liberado *${argss}* no grupo?\n\nA Resposta é: *${randomText}*!`, { reply: true })
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
