const superagent = require('superagent')
const Command = require('../../config/Command')
const { config } = require('../..')

module.exports = class PokeCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'poke',
      aliases: ['cutucar', 'dedada'],
      description: 'Irrite seu amigo com umas cutucadinhas!',
      example: 'cutucar @Demetrius',
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
      const gif = (await superagent.get('https://nekos.life/api/v2/img/poke')).body.url
      const video = (await superagent.post(`https://im2.io/${config.keys.imageOptim}/format=h264/${gif}`)).body.toString('base64')
      const user = await msg.getContact(msg.sender.id)
      if (!args[0]) return await this.zap.atizap.sendVideoAsGif(msg.from, `data:video/mp4;base64,${video}`, 'cutucar', `Cutuquei o *${user.username}*! 😊`)
      const mentioned = await msg.getContact(args[0])
      return await this.zap.atizap.sendVideoAsGif(msg.from, `data:video/mp4;base64,${video}`, 'cutucar', `*${user.username}* cutucou *${mentioned.username}*! 😜`)
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
