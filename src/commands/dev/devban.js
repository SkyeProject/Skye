const Command = require('../../config/Command')
const mongocreate = require('../../config/modules/database/mongocreate')

module.exports = class DevBanCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'devban',
      aliases: [],
      category: 'dev',
      description: 'Comando usar para banir usuários indesejados do bot.',
      example: 'devban 551140028922@c.us>',
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
      if (!args[0]) return await msg.send('Seu burro, vou banir quem?')
      const user = await msg.getContact(args[0])

      let docUser = await this.zap.mongo.Users.findById(user.number)
      if (!docUser) docUser = mongocreate.createUserDoc(user.number)
      if (docUser.status.isBanned) return await msg.send(`Você já baniu ele por este motivo:\n\n*${docUser.status.reason}*`)

      this.removeItem(args, args[0])
      const reason = args[0] ? args.join(' ') : 'Motivo não especificado.'

      docUser.status.isBanned = true
      docUser.status.reason = reason

      await docUser.save()
      await msg.send(`Você foi banido de me usar!\n\nMotivo: *${reason}*`, { from: docUser._id })
      await this.zap.atizap.contactBlock(docUser._id)
      await msg.send('Beleza, ele foi banido!')
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
