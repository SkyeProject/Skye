const superagent = require('superagent')
const Command = require('../../config/Command')

module.exports = class NekoCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'neko',
      aliases: ['kwaii', 'gata', 'kwai', 'kawaii', 'kawai'],
      category: 'misc',
      description: 'Só use o comando que tu vai ver e.e',
      example: 'neko',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false,
      isWorking: true
    })
  }

  async execute ({ msg }) {
    try {
      const nekoimage = (await superagent.get('https://nekos.life/api/v2/img/neko')).body
      const nekotext = (await superagent.get('https://nekos.life/api/v2/cat')).body
      await msg.sendImage(nekoimage.url, nekotext.cat)
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
