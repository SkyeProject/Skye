const Commands = require('../../config/commands')

module.exports = class TodCommand extends Commands {
  constructor (zap) {
    super(zap, {
      name: 'tod',
      aliases: ['vddoudsf', 'verdadeoudesafio'],
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
      const members = msg.chat.groupMetadata.participants
      const RandomNumber = getRandomInt(0, (members.length > 0 ? members.length - 1 : members.length))
      let RandomNumberTwo = getRandomInt(0, (members.length > 0 ? members.length - 1 : members.length))
      while (RandomNumber === RandomNumberTwo) {
        RandomNumberTwo = getRandomInt(0, members.length)
      }

      const memberOne = members[RandomNumber]
      const memberTwo = members[RandomNumberTwo]
      const a = `@${memberOne.id.replace(/@c.us/g, '')}`
      const b = `@${memberTwo.id.replace(/@c.us/g, '')}`
      msg.send('Girando a garrafa...')
      this.zap.atizap.sendTextWithMentions(msg.from, `Vejamos, *${a}* pergunta para *${b}*!\n\nEai, vamos brincar de verdade ou desafio? 😈`)
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}
