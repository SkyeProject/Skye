const Command = require('../../config/Command')

module.exports = class PingCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'ping',
      aliases: ['pingbot', 'ms'],
      category: 'utils',
      description: 'Veja o ping do bot.',
      example: 'ping',
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
      const oldDate = Date.now()
      this.zap.atizap.sendText(msg.from, 'Pingando...').then(async (m) => {
        await msg.send(`${Date.now() - oldDate}ms`, { reply: true })
        await this.zap.atizap.deleteMessage(msg.from, m)
      })
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
