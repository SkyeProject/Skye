const Commands = require('../config/commands')

module.exports = class CommandSay extends Commands {
  constructor (zap) {
    super(zap, {
      name: 'hi',
      aliases: ['oi'],
      category: 'fun',
      ownerOnly: false
    })
  }

  execute ({ msg }) {
    msg.send('Oi')
  }
}
