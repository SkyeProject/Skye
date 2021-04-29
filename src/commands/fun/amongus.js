const Command = require('../../config/Command')

module.exports = class AmongusCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'amongus',
      aliases: ['impostor', 'among'],
      category: 'fun',
      onlyGroup: true,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false
    })
  }

  async execute ({ msg }) {
    try {
      const membros = this.getAllMembersNumbers(msg, true)
      const randomMembers = this.getRandomValueInArray(membros, 2)
      const a = randomMembers[0]
      const b = randomMembers[1]
      const text = require('../../config/games/amongus.json')
      let randomText = text[this.getRandomInt(0, Object.keys(text).length)]
      randomText = randomText.replace(/{a}/g, '@' + a)
      randomText = randomText.replace(/{b}/g, '@' + b)
      this.zap.atizap.sendTextWithMentions(msg.from, randomText)
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
