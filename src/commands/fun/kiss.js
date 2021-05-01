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
        return await msg.sendSticker(kissimage.url, false)
      } else {
        const mentioned = await msg.getContact(args[0].replace('@', ''))
        msg.send(`${me.username} deu aquele beijão no ${mentioned.username}`, { reply: true })
        return await msg.sendSticker(kissimage.url, false)
      }
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
