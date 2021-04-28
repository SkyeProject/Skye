const superagent = require('superagent')
const Command = require('../../config/Command')

module.exports = class PatCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'pat',
      aliases: ['carinho', 'acariciar'],
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
      const patGif = (await superagent.get('https://nekos.life/api/v2/img/pat')).body
      const me = msg.sender.pushname
      if (!args[0]) {
        msg.send(`Quer carinho ${me}? Eu dou! ❤️`, { reply: true })
        return this.zap.atizap.sendImageAsSticker(msg.from, patGif.url, null)
      } else {
        const args0 = await msg.getContact(args[0].replace('@', ''))
        msg.send(`${me} deu aquele carinho fofinho em ${args0.username}! :3`, { reply: true })
        this.zap.atizap.sendImageAsSticker(msg.from, patGif.url, null)
      }
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
