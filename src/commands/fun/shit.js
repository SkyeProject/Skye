const Command = require('../../config/Command')
const Canvacord = require('canvacord')

module.exports = class ShitCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'shit',
      aliases: ['merda', 'pisei'],
      category: 'fun',
      description: 'Marque um amigo merda seu!',
      example: 'shit @demetrius',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false
    })
  }

  async execute ({ msg, args }) {
    try {
      const user = await msg.getContact(args[0] || msg.sender.id)
      const shit = await Canvacord.Canvas.shit(user.avatar)
      await msg.sendImage(`data:image/png;base64,${shit.toString('base64')}`)
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
