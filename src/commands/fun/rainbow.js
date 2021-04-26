const Command = require('../../config/Command')
const Canvacord = require('canvacord')

module.exports = class CanvasCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'rainbow',
      aliases: ['lgbt', 'gay'],
      category: 'fun',
      onlyGroup: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
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
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
