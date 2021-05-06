const Command = require('../../config/Command')

module.exports = class HiCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'hi',
      aliases: ['oi'],
      category: 'misc',
      description: 'Me manda um oi, e eu mando de volta :)',
      example: 'oi',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false
    })
  }

  async execute ({ msg }) {
    try {
      await msg.send('Oi', { reply: true })
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
