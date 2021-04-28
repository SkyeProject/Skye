const Command = require('../../config/Command')
const mongocreate = require('../../config/modules/database/mongocreate')

module.exports = class DevBanCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'devban',
      aliases: [],
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
      if (!args[0]) return await msg.send('Seu burro, vou banir quem?')
      const fdpUser = await msg.getContact(args[0])

      let fdp = await this.zap.mongo.Users.findById(fdpUser.number)
      if (!fdp) fdp = mongocreate.createUserDoc(fdpUser.number)

      if (fdp.status.isBanned) return await msg.send(`Você já baniu ele por este motivo:\n\n*${fdp.status.reason}*`)
      this.removeItem(args, args[0])
      const reason = args[0] ? args.join(' ') : 'Motivo não especificado.'

      fdp.status.isBanned = true
      fdp.status.reason = reason

      await fdp.save()
      await msg.send(`Você foi banido de me usar!\n\nMotivo: *${reason}*`, { from: fdp._id })
      await this.zap.atizap.contactBlock(fdp._id)
      await msg.send('Beleza, ele foi banido!')
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
