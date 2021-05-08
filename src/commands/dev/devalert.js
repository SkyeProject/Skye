const { config } = require('../..')
const Command = require('../../config/Command')

module.exports = class AlertCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'devalert',
      aliases: ['dalert', 'al'],
      category: 'dev',
      description: 'Comando usado para mandar um alerta para todos os grupo.',
      example: 'alerta alo alo alo tão me ouvindo?',
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
      if (!args[0]) return await msg.send('Você não disse nada pra enviar.')
      const allGroups = await this.zap.atizap.getAllGroups()
      const message = args.join(' ')
      await msg.send(`Enviando: \n\n❗ | ${message}`)
      allGroups.forEach(async group => {
        const groupdoc = await this.zap.mongo.Groups.findById(group.id)
        if (!groupdoc || (groupdoc && groupdoc.options.alert)) {
          const prefix = groupdoc ? groupdoc.prefix : config.bot.prefix
          const gmessage = message.replace(/{prefix}/g, prefix)
          await msg.send(`❗ | ${gmessage}\n\nPara desativar os alertas, use *${prefix}desativar alerta*`, { from: group.id })
        }
      })
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
