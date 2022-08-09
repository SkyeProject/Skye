/*
*   Comando pedido por Gabe Yata, namoral que comando estranho vei.............. (acho q ela tem um gosto um pouco estranho)
*   N acredito que o demetrius fez isso e ainda esqueceu de lançar no repositório da Skye... tô fazendo esse trabalho por ele
*/

const Command = require('../../config/Command')
const superagent = require('superagent')
const { config } = require('../..')

module.exports = class LickCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'lick',
      aliases: ['lamber', 'lambida'],
      category: 'fun',
      description: 'Dê uma lambida em seu amigo 🥴',
      example: 'lamber @Gabe Yata',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false,
      isWorking: true
    })
  }

  async execute ({ msg, args }) {
    try {
      if (!args[0]) return await msg.send('Você não mencionou ninguém, tu n está esperando q eu vá te lamber né amore?', { reply: true })

      const gif = (await superagent.get('https://purrbot.site/api/img/sfw/lick/gif')).body.link
      const video = (await superagent.post(`https://im2.io/${config.keys.imageOptim}/format=h264/${gif}`)).body.toString('base64')
      const gifSlap = (await superagent.get('https://nekos.life/api/v2/img/slap')).body.url
      const videoSlap = (await superagent.post(`https://im2.io/${config.keys.imageOptim}/format=h264/${gifSlap}`)).body.toString('base64')
      const user = await msg.getContact(msg.sender.id)
      const mentioned = await msg.getContact(args[0])
      const skyeName = args[0].toLowerCase()

      mentioned.number === '5511953532681@c.us' || skyeName === 'skye' ? await this.zap.atizap.sendVideoAsGif(msg.from, `data:video/mp4;base64,${videoSlap}`, 'tapao da skye', 'Você tentou me lamber?! Seu idiota!!!!! 🤬') : await this.zap.atizap.sendVideoAsGif(msg.from, `data:video/mp4;base64,${video}`, 'lambe', `*${user.username}* deu aquela lambida em *${mentioned.username}*! 🤪`)
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
