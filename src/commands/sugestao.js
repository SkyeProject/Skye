const Commands = require('../config/commands')

module.exports = class SugestaoCommand extends Commands {
  constructor (zap) {
    super(zap, {
      name: 'sugestao',
      aliases: ['sug', 'ideia', 'sugestão'],
      category: 'utils',
      ownerOnly: false
    })
  }

  async execute ({ msg, args }) {
    const message = args.join(' ')
    const name = msg.sender.pushname
    if (!message) {
      msg.send('Você enviou uma sugestão, espera, acho que não... ')
    } else {
      msg.send('Sugestão enviada!')
      await this.zap.atizap.sendText('5511953532681-1619128440@g.us', `Opa! Sugestão nova: *${message}*\n\nSugestão enviada de: ${name}`)
    }
  }
}
