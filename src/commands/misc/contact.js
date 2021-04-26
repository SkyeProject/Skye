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
      msg.send(`*Aqui vai o contato dos meus criadores lindos :)*

${msg.developers.join('\n')}`)
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
