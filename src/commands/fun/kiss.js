const superagent = require('superagent')
const Command = require('../../config/Command')

module.exports = class KissCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'kiss',
      aliases: ['beijo', 'beijar'],
      description: 'De aquele beijo em alguem!',
      example: 'beijo @Demetrius',
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
      const kissimage = (await superagent.get('https://nekos.life/api/v2/img/kiss')).body
      const me = await msg.getContact(msg.sender.id)
      if (!args[0]) {
        msg.send(`Um beijão para o/a ${me.username}! ❤️`, { reply: true })
        return this.zap.atizap.sendImageAsSticker(msg.from, kissimage.url, null)
      } else {
        const args0 = await msg.getContact(args[0].replace('@', ''))
        msg.send(`${me.username} deu aquele beijão no ${args0.username}`, { reply: true })
        this.zap.atizap.sendImageAsSticker(msg.from, kissimage.url, null)
      }
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
