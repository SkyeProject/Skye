const Command = require('../../config/Command')

module.exports = class RemoveCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'remove',
      aliases: ['expulsar', 'ban', 'remover', 'kick', 'expulse'],
      category: 'mod',
      description: 'Expulse alguém do grupo!',
      example: 'expulsar @Demetrius',
      groupOnly: true,
      groupAdmPermission: {
        bot: true,
        user: true
      },
      ownerOnly: false,
      isWorking: true
    })
  }

  async execute ({ msg, args }) {
    try {
      if (!args[0]) return msg.send('Mencione a pessoa que está badernando!', { reply: true })
      const me = await msg.getContact(msg.sender.id)
      const contact = await msg.getContact(args[0].replace('@', ''))
      const member = msg.findUserInGroup(contact.number)

      if (contact.number === `${args[0]}@c.us`) return msg.send('Se tu quer se banir, é melhor sair do servidor por si mesmo!', { reply: true })
      if (contact.isMe) return msg.send('Poxa, por que me banir? Eu sou tão adorável! 😣😢😢', { reply: true })
      if (!member) return msg.send('Esta pessoa não está no grupo ou eu não consegui encontrá-la!', { reply: true })
      if (member.isSuperAdmin) return msg.send('Tá maluco? Acha que eu tenho poder de banir logo o dono do grupo? Quem dera se eu tivesse... 😈', { reply: true })

      await this.zap.atizap.sendFileFromUrl(msg.from, 'https://is.gd/bqw2b6', 'bangif', `*${me.username}* mandou *${contact.username}* pra vala!`)
      return await msg.kick(contact.number)
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
