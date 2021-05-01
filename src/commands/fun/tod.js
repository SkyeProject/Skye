const Command = require('../../config/Command')

module.exports = class TodCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'tod',
      aliases: ['vddoudsf', 'verdadeoudesafio'],
      category: 'fun',
      description: 'Verdade ou desafio? Jogue com seus amigos!',
      example: 'vddoudsf',
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
      await msg.send('Girando a garrafa...', { reply: true })
      await msg.send(`Vejamos, *@${randomMembers[0]}* pergunta para *@${randomMembers[1]}*!\n\nEai, vamos brincar de verdade ou desafio? 😈`, { mention: true })
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
