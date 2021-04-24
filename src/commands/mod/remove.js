const Commands = require('../../config/commands')

module.exports = class RemoveCommand extends Commands {
  constructor (zap) {
    super(zap, {
      name: 'remove',
      aliases: ['kick', 'expulsar', 'ban'],
      category: 'mod',
      ownerOnly: false
    })
  }

  async execute ({ msg, args }) {
    try {
      const adms = await this.zap.atizap.getGroupAdmins(msg.chat.groupMetadata.id)
      if (!args[0]) return msg.send('Mencione alguem que queira banir/expulsar!')
      if (!msg.isGroupMsg) await msg.send('Este comando só funciona em grupo.')
      if (!adms.includes(msg.sender.id)) await msg.send('Você não é adm do grupo, que pena!')
      if (!adms.includes(msg.botContact.me.user + '@c.us')) {
        msg.send('Eu preciso ser administradora do grupo para executar esse comando, alias, não sou magica.')
      } else {
        const contact = await msg.getContact(args[0].replace('@', '') + '@c.us')
        await this.zap.atizap.removeParticipant(msg.from, contact.number)
        msg.send(`Usuario ${contact.username} foi expulso do grupo.`)
      }
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
