const Command = require('../../config/Command')

module.exports = class TodCommand extends Command {
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
      const membros = this.getAllMembersNumbers(msg, true)
      const randomMembers = this.getRandomValueInArray(membros, 2)
      msg.send('Girando a garrafa...')
      this.zap.atizap.sendTextWithMentions(msg.from, `Vejamos, *@${randomMembers[0]}* pergunta para *@${randomMembers[1]}*!\n\nEai, vamos brincar de verdade ou desafio? 😈`)
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
