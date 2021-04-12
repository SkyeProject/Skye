const Commands = require('../config/commands')

module.exports = class EveryoneCommand extends Commands {
  constructor (zap) {
    super(zap, {
      name: 'everyone',
      aliases: ['all', 'mention', 'mentionall'],
      category: 'mod',
      ownerOnly: false
    })
  }

  async execute ({ msg, args }) {
    if (!msg.isGroupMsg) return msg.send('Este comando só funciona em grupo!')

    const adms = await this.zap.atizap.getGroupAdmins(msg.chat.groupMetadata.id)
    if (!adms.includes(msg.sender.id)) return msg.send('Você não é adm do grupo, que pena!')

    const members = await this.zap.atizap.getGroupMembers(msg.chat.groupMetadata.id)
    let everyoneMessage = args[0] ? `${args.join(' ')}\n\n` : `Marcando todos a pedido de: @${msg.sender.id}` + '\n\n'

    for (let i = 0; i < members.length; i++) everyoneMessage += `- @${members[i].id.replace(/@c.us/g, '')} -\n`
    everyoneMessage += '\n------------BOT SCHWAP 😎------------'

    this.zap.atizap.sendTextWithMentions(msg.from, everyoneMessage)
  }
}
