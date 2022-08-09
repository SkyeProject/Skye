const Command = require('../../config/Command')

module.exports = class SuggestionCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'suggestion',
      aliases: ['sugestao', 'sug', 'ideia', 'sugestão'],
      category: 'utils',
      description: 'Mande uma sugestão para os nossos devs!',
      example: 'sugestão Faz comando de ship ai admirrrrrrr!',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false,
      isWorking: false
    })
  }

  async execute ({ msg, args }) {
    try {
      if (!args[0]) return await msg.send('Você não deu nenhuma sugestão!')
      const user = await msg.getContact(msg.sender.id)
      const text = `🚨 *Nova sugestão* 🚨 
      
👀 | Mensagem: *${args.join(' ')}*

Enviado por: *${user.username}* 
Contato: wa.me/${user.number.replace('@c.us', '')}`

      await msg.send(`Sugestão enviada!\n\n*${args.join(' ')}*`, { reply: true })

      if (msg.botContact.me.user === '5511953532681') return await msg.send(text, { from: '5511953532681-1619372110@g.us' })
      msg.developers.forEach(async dev => {
        await msg.send(text, { from: dev.number + '@c.us' })
      })
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
