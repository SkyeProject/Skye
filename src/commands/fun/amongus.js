const Command = require('../../config/Command')

module.exports = class AmongusCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'amongus',
      aliases: ['impostor', 'among'],
      category: 'fun',
      description: 'Quem é o impostor? Use o comando e eu irei descobrir quem é o impostor do grupo!',
      example: 'amongus',
      groupOnly: true,
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
      const text = require('../../config/modules/API/games/amongus.json')
      let randomText = text[this.getRandomInt(0, Object.keys(text).length)]
      randomText = randomText.replace(/{a}/g, '@' + a)
      randomText = randomText.replace(/{b}/g, '@' + b)
      await msg.send(randomText, { mention: true })
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
