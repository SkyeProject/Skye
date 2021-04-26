const Command = require('../../config/Command')

module.exports = class PingCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'ping',
      aliases: ['ms'],
      category: 'utils',
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
      const oldDate = Date.now()
      this.zap.atizap.sendText(msg.from, 'Pingando...').then((m) => {
        msg.send(`${Date.now() - oldDate}ms`)
        this.zap.atizap.deleteMessage(msg.from, m)
      })
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
