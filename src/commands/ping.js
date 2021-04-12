const Commands = require('../config/commands')

module.exports = class PingCommand extends Commands {
  constructor (zap) {
    super(zap, {
      name: 'ping',
      aliases: ['ms'],
      category: 'utils',
      ownerOnly: false
    })
  }

  execute ({ msg }) {
    const oldDate = Date.now()
    this.zap.atizap.sendText(msg.from, 'Pingando...').then((m) => {
      msg.send(`${Date.now() - oldDate}ms`)
      this.zap.atizap.deleteMessage(msg.from, m)
    })
  }
}
