const Commands = require('../config/commands')
const Canvacord = require('canvacord')
module.exports = class CanvasCommand extends Commands {
  constructor(zap) {
    super(zap, {
      name: 'rainbow',
      aliases: ['lgbt', 'gay'],
      category: 'fun',
      ownerOnly: false
    })
  }

  async execute({ msg, args }) {
    if (!args[0]) {
      const user = await msg.sender.profilePicThumbObj.eurl
      const rainbow = await Canvacord.Canvas.rainbow(user);
      msg.sendImage(`data:image/png;base64,${rainbow.toString('base64')}`)
    } else {
      const userMention = await msg.getContact(args[0].replace('@', '') + '@c.us')
      const rainbow = await Canvacord.Canvas.rainbow(userMention.avatar);
      msg.sendImage(`data:image/png;base64,${rainbow.toString('base64')}`)
    }
  }
}