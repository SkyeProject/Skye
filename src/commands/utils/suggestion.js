const Commands = require('../../config/commands')

module.exports = class SuggestionCommand extends Commands {
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
      const name = msg.sender.pushname
      if (!message) {
        msg.send('Você enviou uma sugestão, espera, acho que não... ')
      } else {
        msg.send('Sugestão enviada!')
        await this.zap.atizap.sendText('5511953532681-1619372110@g.us', `Opa! Sugestão nova: *${message}*\n\nSugestão enviada de: ${name}`)
      }
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
