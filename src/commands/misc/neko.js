const superagent = require('superagent')
const Command = require('../../config/Command')

module.exports = class NekoCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'neko',
      aliases: ['kwaii', 'gata'],
      category: 'misc',
      onlyGroup: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false
    })
  }

  async execute ({ msg }) {
    try {
      const nekoimage = (await superagent.get('https://nekos.life/api/v2/img/neko')).body
      const nekotext = (await superagent.get('https://nekos.life/api/v2/cat')).body
      msg.sendImage(nekoimage.url, nekotext.cat)
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
