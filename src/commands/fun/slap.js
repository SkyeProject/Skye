const superagent = require('superagent')
const Command = require('../../config/Command')
const { config } = require('../..')

module.exports = class SlapCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'slap',
      aliases: ['tapa', 'tapao'],
      description: 'De um tapa no seu amigo que pisou na bola com você!',
      example: 'tapa @Demetrius',
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
      const gif = (await superagent.get('https://nekos.life/api/v2/img/slap')).body.url
      const video = (await superagent.post(`https://im2.io/${config.imageOptim}/format=h264/${gif}`)).body.toString('base64')
      const user = await msg.getContact(msg.sender.id)
      if (!args[0]) return await msg.send('Você não mencionou ninguém... Por acaso quer se bater?', { reply: true })
      const mentioned = await msg.getContact(args[0])
      return await this.zap.atizap.sendVideoAsGif(msg.from, `data:video/mp4;base64,${video}`, 'socão', `*${user.username}* deu um tapa em *${mentioned.username}*! 😣`)
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
