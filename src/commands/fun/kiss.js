const superagent = require('superagent')
const Command = require('../../config/Command')
const { config } = require('../..')

module.exports = class KissCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'kiss',
      aliases: ['beijo', 'beijar'],
      description: 'De aquele beijo em alguem!',
      example: 'beijo @Demetrius',
      category: 'fun',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false
    })
  }

  async execute ({ msg, args }) {
    try {
      const gif = (await superagent.get('https://nekos.life/api/v2/img/kiss')).body.url
      const video = (await superagent.post(`https://im2.io/${config.keys.imageOptim}/format=h264/${gif}`)).body.toString('base64')
      const user = await msg.getContact(msg.sender.id)
      if (!args[0]) return await this.zap.atizap.sendVideoAsGif(msg.from, `data:video/mp4;base64,${video}`, 'beijão', `*${msg.botContact.pushname}* beijou *${user.username}*! ❤️`)
      const mentioned = await msg.getContact(args[0])
      return await this.zap.atizap.sendVideoAsGif(msg.from, `data:video/mp4;base64,${video}`, 'beijão', `*${user.username}* deu aquele beijão em *${mentioned.username}*! ❤️`)
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
