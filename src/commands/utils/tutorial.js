const Command = require('../../config/Command')

module.exports = class TutorialCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'tutorial',
      aliases: ['comofunciona', 'como', 'comousar'],
      description: 'Tutorial de como usar a skye.',
      example: 'tutorial',
      category: 'utils',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false,
      isWorking: true
    })
  }

  async execute ({ msg, prefix }) {
    try {
      await msg.send(`Tutorial de como me usar: https://youtu.be/aAH4kGd09AI \nDuvidas use ${prefix}grupo`, { youtube: true })
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
