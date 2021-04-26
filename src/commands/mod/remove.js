const Command = require('../../config/Command')

module.exports = class RemoveCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'remove',
      aliases: ['ban', 'expulsar', 'remover', 'kick'],
      category: 'mod',
      onlyGroup: true,
      groupAdmPermission: {
        bot: true,
        user: true
      },
      ownerOnly: false
    })
  }

  async execute ({ msg, args }) {
    try {
      if (!args[0]) return msg.send('Mencione a pessoa que está badernando!')
      const contact = await msg.getContact(args[0].replace('@', ''))
      const member = msg.findUserInGroup(contact.number)
      if (contact.number === `${args[0]}@c.us`) return msg.send('Se tu quer se banir, é melhor sair do servidor por si mesmo!')
      if (contact.isMe) return msg.send('Poxa, por que me banir? Eu sou tão adorável! 😣😢😢')
      if (!member) return msg.send('Esta pessoa não está no grupo ou eu não consegui encontrá-la!')
      if (member.isSuperAdmin) return msg.send('Tá maluco? Acha que eu tenho poder de banir logo o dono do grupo? Quem dera se eu tivesse... 😈')
      await msg.kick(contact.number)
      msg.send(`Beleza, ${contact.username} foi pra vala.`)
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
