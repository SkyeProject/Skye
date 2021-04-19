const Commands = require('../config/commands')
const Canvacord = require('canvacord')
module.exports = class CanvasCommand extends Commands {
  constructor (zap) {
    super(zap, {
      name: 'rainbow',
      aliases: ['lgbt', 'gay'],
      category: 'fun',
      ownerOnly: false
    })
  }

  async execute ({ msg, args }) {
    try {
      let usernumber = msg.sender.id
      if (args[0]) usernumber = args[0].replace('@', '') + '@c.us'
      const user = await msg.getContact(usernumber)
      const rainbow = await Canvacord.Canvas.rainbow(user.avatar)
      msg.sendImage(`data:image/png;base64,${rainbow.toString('base64')}`)
    } catch (error) {
      msg.send(`Algo de errado aconteceu, tente novamente! Caso o erro persista, reporte para este número: +5511951746304\n\n\n${error}`)
      console.error(error)
    }
  }
}
