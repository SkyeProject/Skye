const Command = require('../../config/Command')

module.exports = class EveryoneCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'everyone',
      aliases: ['todos', 'mention', 'mentionall', 'allmention'],
      category: 'mod',
      description: 'Marque todo mundo do seu grupo!',
      example: 'todos',
      groupOnly: true,
      groupAdmPermission: {
        bot: false,
        user: true
      },
      ownerOnly: false,
      isWorking: true
    })
  }

  async execute ({ msg, args }) {
    try {
      const members = this.getAllMembersNumbers(msg, true)
      let everyoneMessage = args[0] ? `${args.join(' ')}\n\n` : `Marcando todos a pedido de: @${msg.sender.id}` + '\n\n'
      for (let i = 0; i < members.length; i++) everyoneMessage += `- @${members[i]} -\n`
      everyoneMessage += `\n------------ ${msg.botContact.pushname} 😎 ------------`
      await msg.send(everyoneMessage, { mention: true })
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
