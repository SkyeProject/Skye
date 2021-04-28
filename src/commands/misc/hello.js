const Command = require('../../config/Command')

module.exports = class CommandSay extends Command {
  constructor (zap) {
    super(zap, {
      name: 'hi',
      aliases: ['oi'],
      category: 'misc',
      onlyGroup: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false
    })
  }

  execute ({ msg }) {
    try {
      msg.send('Oi', { reply: true })
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
