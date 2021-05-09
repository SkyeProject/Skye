const superagent = require('superagent')
const Command = require('../../config/Command')
const { config } = require('../..')

module.exports = class HugCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'hug',
      aliases: ['abraçar', 'abraço', 'abraco', 'abracar'],
      category: 'fun',
      description: 'Dê um abraço bem apertado em alguém!',
      example: 'abraçar @MrRexD',
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
      const gif = (await superagent.get('https://nekos.life/api/v2/img/hug')).body.url
      const video = (await superagent.post(`https://im2.io/${config.keys.imageOptim}/format=h264/${gif}`)).body.toString('base64')
      const user = await msg.getContact(msg.sender.id)
      if (!args[0]) return await this.zap.atizap.sendVideoAsGif(msg.from, `data:video/mp4;base64,${video}`, 'abraço', `*${msg.botContact.pushname}* abraçou *${user.username}*! ❤️`)
      const mentioned = await msg.getContact(args[0])
      return await this.zap.atizap.sendVideoAsGif(msg.from, `data:video/mp4;base64,${video}`, 'abraço', `*${user.username}* abraçou bem forte *${mentioned.username}*! ❤️`)
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
