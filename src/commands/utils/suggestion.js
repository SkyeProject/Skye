const Command = require('../../config/Command')

module.exports = class SuggestionCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'suggestion',
      aliases: ['sugestao', 'sug', 'ideia', 'sugestão'],
      category: 'utils',
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
      const user = await msg.getContact(msg.sender.id)
      if (!message) {
        msg.send('Este comando só funciona se voce colocar uma mensagem. !sugestao (sua sugestao)', { reply: true })
      } else {
        msg.send('Sugestão enviada!', { reply: true })
        msg.send(`Opa! Sugestão nova: *${message}*\n\nSugestão enviada de: ${user.username}`, { from: '5511953532681-1619372110@g.us' })
      }
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
