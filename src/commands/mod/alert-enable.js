const Command = require('../../config/Command')

module.exports = class EveryoneCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'alert-enable',
      aliases: ['ativar-alerta', 'enable-alert', 'alertenable', 'enablealert', 'alertaativar'],
      category: 'mod',
      onlyGroup: true,
      groupAdmPermission: {
        bot: false,
        user: true
      },
      ownerOnly: false
    })
  }

  async execute ({ msg, prefix, doc }) {
    try {
      if (doc.options.alert) return await msg.send(`Os alertas neste grupo já estão ativados!, para desativar use *${prefix}desativar-alerta*`)
      doc.options.alert = true
      await doc.save()
      await msg.send(`Ok, eu ativei os alertas neste grupo, para desativar use *${prefix}desativar-alerta*`)
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
