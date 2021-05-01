const superagent = require('superagent')
const Command = require('../../config/Command')

module.exports = class HugCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'hug',
      aliases: ['abraçar', 'abraço', 'abraco', 'abracar'],
      category: 'fun',
      description: 'Dê um abraço bem apertado em alguém!',
      example: 'abraçar @MrRexD',
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
      const nekoimage = (await superagent.get('https://nekos.life/api/v2/img/hug')).body
      const me = (await msg.getContact(msg.sender.id)).username
      if (!args[0]) {
        await msg.send(`Abraçei bem forte o ${me}! ❤️`, { reply: true })
        return await msg.sendSticker(nekoimage.url, false)
      } else {
        const mentioned = await msg.getContact(args[0].replace('@', ''))
        await msg.send(`${me} deu aquele abraço em ${mentioned.username}`, { reply: true })
        await msg.sendSticker(nekoimage.url, false)
      }
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
