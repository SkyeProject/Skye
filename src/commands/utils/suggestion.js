const Command = require('../../config/Command')

module.exports = class SuggestionCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'suggestion',
      aliases: ['sugestao', 'sug', 'ideia', 'sugestão'],
      category: 'utils',
      description: 'Mande uma sugestão para os nossos devs!',
      example: 'sugestão Faz comando de ship ai admirrrrrrr!',
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
        await msg.send('Este comando só funciona se voce colocar uma mensagem. !sugestao (sua sugestao)', { reply: true })
      } else {
        await msg.send('Sugestão enviada!', { reply: true })
        await msg.send(`Opa! Sugestão nova: *${message}*\n\nSugestão enviada de: ${user.username}`, { from: '5511953532681-1619372110@g.us' })
      }
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
