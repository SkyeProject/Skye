const Command = require('../../config/Command')
const superagent = require('superagent')
const translate = require('@vitalets/google-translate-api')

module.exports = class WaifuCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'waifu',
      aliases: ['esposa', 'waifuu', 'gatinha'],
      category: 'misc',
      description: 'Que tal ver umas waifus?',
      example: 'waifu',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false
    })
  }

  async execute ({ msg }) {
    try {
      const data = (await superagent.get('https://st4rz.herokuapp.com/api/waifu')).body
      const text = `❤---*${data.name}*---❤

${(await translate(data.desc || 'Sem descrição.', { to: 'pt' })).text}`

      await msg.sendImage(data.image, text)
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
