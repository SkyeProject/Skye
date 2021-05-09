const superagent = require('superagent')
const Command = require('../../config/Command')
const { config } = require('../..')

module.exports = class PatCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'pat',
      aliases: ['carinho', 'acariciar'],
      category: 'fun',
      description: 'Dê um carinho bem fofinho em alguém!',
      example: 'carinho @MrRexD',
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
      const gif = (await superagent.get('https://nekos.life/api/v2/img/pat')).body.url
      const video = (await superagent.post(`https://im2.io/${config.keys.imageOptim}/format=h264/${gif}`)).body.toString('base64')
      const user = await msg.getContact(msg.sender.id)
      if (!args[0]) return await this.zap.atizap.sendVideoAsGif(msg.from, `data:video/mp4;base64,${video}`, 'carinhu', `Quer carinho *${user.username}*? Eu dou! ❤️`)
      const mentioned = await msg.getContact(args[0])
      return await this.zap.atizap.sendVideoAsGif(msg.from, `data:video/mp4;base64,${video}`, 'carinhu', `*${user.username}* fez carinho em *${mentioned.username}*! ❤️`)
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
