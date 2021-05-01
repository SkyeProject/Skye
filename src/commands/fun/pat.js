const superagent = require('superagent')
const Command = require('../../config/Command')

module.exports = class PatCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'pat',
      aliases: ['carinho', 'acariciar'],
      category: 'fun',
      description: 'Dê um carinho bem fofinho em alguém!',
      example: 'carinho @MrRexD',
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
      const patGif = (await superagent.get('https://nekos.life/api/v2/img/pat')).body
      const me = msg.sender.pushname
      if (!args[0]) {
        await msg.send(`Quer carinho ${me}? Eu dou! ❤️`, { reply: true })
        return await msg.sendSticker(patGif.url, false)
      } else {
        const mentioned = await msg.getContact(args[0].replace('@', ''))
        await msg.send(`${me} deu aquele carinho fofinho em ${mentioned.username}! :3`, { reply: true })
        await msg.sendSticker(patGif.url, false)
      }
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
