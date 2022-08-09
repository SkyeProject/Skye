const Command = require('../../config/Command')
const Canvacord = require('canvacord')

module.exports = class TriggeredCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'triggered',
      aliases: ['bolado', 'puto', 'raiva', 'grrrrr', 'trigged'],
      category: 'fun',
      description: 'Está puto? Deixe eu fazer umas alterações em sua foto então.',
      example: 'bolado @demetrius',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false,
      isWorking: true
    })
  }

  async execute ({ msg, args }) {
    try {
      const user = await msg.getContact(args[0] || msg.sender.id)
      const trigger = await Canvacord.Canvas.trigger(user.avatar)
      await msg.sendImage(`data:image/png;base64,${trigger.toString('base64')}`)
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
