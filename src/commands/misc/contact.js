const Command = require('../../config/Command')

module.exports = class CommandSay extends Command {
  constructor (zap) {
    super(zap, {
      name: 'contact',
      aliases: ['contato', 'owners', 'donos', 'numeros', 'contatos'],
      category: 'misc',
      onlyGroup: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false
    })
  }

  async execute ({ msg }) {
    try {
      let message = '*Aqui vai o contato dos meus criadores lindos :) ❤*\n\n'
      msg.developers.forEach(dev => {
        if (dev.name.toLowerCase() === 'mrrexd') message += `${dev.name}: ${dev.url} (cola pv gatas)\n`
        else message += `${dev.name}: ${dev.url}\n`
      })
      msg.send(message)
    } catch (err) {
      msg.zapFail(err)
    }
  }
}