const superagent = require('superagent')
const Command = require('../../config/Command')

module.exports = class SlapCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'slap',
      aliases: ['tapa', 'tapao'],
      description: 'De um tapa no seu amigo que pisou na bola com você!',
      example: 'tapa @Demetrius',
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
      const slapimage = (await superagent.get('https://nekos.life/api/v2/img/slap')).body
      const me = await msg.getContact(msg.sender.id)
      if (!args[0]) {
        msg.send(`${me.username} se bateu! :(`, { reply: true })
        return this.zap.atizap.sendImageAsSticker(msg.from, slapimage.url, null)
      } else {
        const args0 = await msg.getContact(args[0].replace('@', ''))
        msg.send(`${me.username} deu um tapão no ${args0.username}! Essa doeu...`, { reply: true })
        this.zap.atizap.sendImageAsSticker(msg.from, slapimage.url, null)
      }
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
