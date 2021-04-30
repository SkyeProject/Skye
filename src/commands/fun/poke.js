const superagent = require('superagent')
const Command = require('../../config/Command')

module.exports = class PokeCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'poke',
      aliases: ['cutucar', 'dedada'],
      description: 'Irrite seu amigo com umas cutucadinhas!',
      example: 'cutucar @Demetrius',
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
      const pokeimage = (await superagent.get('https://nekos.life/api/v2/img/poke')).body
      const me = await msg.getContact(msg.sender.id)
      if (!args[0]) {
        msg.send(`${me.username} se cutucou!`, { reply: true })
        return this.zap.atizap.sendImageAsSticker(msg.from, pokeimage.url, null)
      } else {
        const args0 = await msg.getContact(args[0].replace('@', ''))
        msg.send(`${me.username} cutucou ${args0.username}!`, { reply: true })
        this.zap.atizap.sendImageAsSticker(msg.from, pokeimage.url, null)
      }
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
