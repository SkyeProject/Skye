const Command = require('../../config/Command')

module.exports = class DevPardonCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'devpardon',
      aliases: ['devunban'],
      category: 'dev',
      onlyGroup: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: true
    })
  }

  async execute ({ msg, args }) {
    try {
      if (!args[0]) return msg.send('Seu burro, vou desbanir quem?')
      const exfdpUser = await msg.getContact(args[0])
      const exfdp = await this.zap.mongo.Users.findById(exfdpUser.number)
      if (!exfdp) return await msg.send('Este cara nem está no meu banco de dados, imagina banido então')
      if (!exfdp.status.isBanned) return msg.send('Seu animal, este cara não está banido!')
      exfdp.status.isBanned = false
      exfdp.status.reason = undefined
      await exfdp.save()
      await this.zap.atizap.contactUnblock(exfdp._id)
      await msg.send('Você foi desbanido e está livre pra me usar de volta!!! :))', { from: exfdp._id })
      msg.send('Beleza, ele foi desbanido!')
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
