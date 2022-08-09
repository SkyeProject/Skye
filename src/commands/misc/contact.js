const Command = require('../../config/Command')

module.exports = class CommandSay extends Command {
  constructor (zap) {
    super(zap, {
      name: 'contact',
      aliases: ['contato', 'owners', 'donos', 'numeros', 'contatos'],
      category: 'misc',
      description: 'Veja o contato dos meus desenvolvedores!',
      example: 'contato',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false,
      isWorking: true
    })
  }

  async execute ({ msg }) {
    try {
      let message = '*Aqui vai o contato dos meus criadores lindos :) ❤*\n\n'
      msg.developers.forEach(dev => {
        if (dev.name.toLowerCase() === 'mrrexd') message += `${dev.name}: ${dev.url} (cola pv gatas)\n`
        else message += `${dev.name}: ${dev.url}\n`
      })
      await msg.send(message, { reply: true })
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
