const Command = require('../../config/Command')

module.exports = class DevPardonCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'devpardon',
      aliases: ['devunban'],
      category: 'dev',
      description: 'Comando utilizado para desbanir algum usuário do bot.',
      example: 'devpardon 551140028922@c.us>',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: true
    })
  }

  async execute ({ msg, args }) {
    try {
      if (!args[0]) return await msg.send('Seu burro, vou desbanir quem?')
      const user = await msg.getContact(args[0])

      const docUser = await this.zap.mongo.Users.findById(user.number)
      if (!docUser) return await msg.send('Este cara nem está no meu banco de dados, imagina banido então')
      if (!docUser.status.isBanned) return await msg.send('Seu animal, este cara não está banido!')

      docUser.status.isBanned = false
      docUser.status.reason = undefined

      await docUser.save()
      await this.zap.atizap.contactUnblock(docUser._id)
      await msg.send('Você foi desbanido e está livre pra me usar de volta!!! :))', { from: docUser._id })
      await msg.send('Beleza, ele foi desbanido!')
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
