/*
* Se tu acha isso cringe, saiba q é obra de Gabe Yata 😎
*/
const Command = require('../../config/Command')
const superagent = require('superagent')
const { config } = require('../..')

module.exports = class BiteCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'bite',
      aliases: ['morder', 'mordida'],
      category: 'fun',
      description: 'Dê uma mordidinha no seu amigo',
      example: 'morder @Gabe Yata',
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
      if (!args[0]) return await msg.send('Você não mencionou ninguém!', { reply: true }) // o Demetrius namoral, a Skye merece lamber ninguém n, muda isso dnv n

      const gif = (await superagent.get('https://purrbot.site/api/img/sfw/bite/gif')).body.link
      const video = (await superagent.post(`https://im2.io/${config.keys.imageOptim}/format=h264/${gif}`)).body.toString('base64')
      const user = await msg.getContact(msg.sender.id)
      const mentioned = await msg.getContact(args[0])

      return await this.zap.atizap.sendVideoAsGif(msg.from, `data:video/mp4;base64,${video}`, 'mordida', `*${user.username}* mordeu *${mentioned.username}*! 😳`)
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
