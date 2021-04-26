const Command = require('../../config/Command')

module.exports = class EveryoneCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'everyone',
      aliases: ['all', 'mention', 'mentionall'],
      category: 'mod',
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

      this.zap.atizap.sendTextWithMentions(msg.from, everyoneMessage)
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
