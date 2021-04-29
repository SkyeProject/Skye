const Command = require('../../config/Command')

module.exports = class EveryoneCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'everyone',
      aliases: ['todos', 'mention', 'mentionall', 'allmention'],
      category: 'mod',
      description: 'Marque todo mundo do seu grupo!',
      example: 'todos',
      onlyGroup: true,
      groupAdmPermission: {
        bot: false,
        user: true
      },
      ownerOnly: false
    })
  }

  async execute ({ msg, args }) {
    try {
      const members = await this.zap.atizap.getGroupMembers(msg.chat.groupMetadata.id)
      let everyoneMessage = args[0] ? `${args.join(' ')}\n\n` : `Marcando todos a pedido de: @${msg.sender.id}` + '\n\n'

      for (let i = 0; i < members.length; i++) everyoneMessage += `- @${members[i].id.replace(/@c.us/g, '')} -\n`
      everyoneMessage += '\n------------BOT SCHWAP 😎------------'

      msg.send(everyoneMessage, { mention: true })
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
