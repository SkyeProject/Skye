const Command = require('../../config/Command')

module.exports = class HiCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'hi',
      aliases: ['oi'],
      category: 'misc',
      description: 'Me manda um oi, e eu mando de volta :)',
      example: 'oi',
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
