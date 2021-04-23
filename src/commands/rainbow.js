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
    let usernumber = msg.sender.id
    if (args[0]) usernumber = args[0].replace('@', '') + '@c.us'
    const user = await msg.getContact(usernumber)
    const rainbow = await Canvacord.Canvas.rainbow(user.avatar)
    msg.sendImage(`data:image/png;base64,${rainbow.toString('base64')}`)
  }
}
