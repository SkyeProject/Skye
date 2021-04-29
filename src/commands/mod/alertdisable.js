const Command = require('../../config/Command')

module.exports = class AlertDisableCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'alert-disable',
      aliases: ['desativar-alerta', 'disable-alert', 'alertdisable', 'disablealert', 'alertadesativar'],
      category: 'mod',
      description: 'Desative o alerta caso não queira mais receber notas de atualizações no seu servidor.',
      example: 'desativar-alerta',
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
      if (!doc.options.alert) return await msg.send(`Os alertas neste grupo já estão desativados!, para ativar novamente use *${prefix}ativar-alerta*`)
      doc.options.alert = false
      await doc.save()
      await msg.send(`Ok, eu desativei os alertas neste grupo, para ativar novamente use *${prefix}ativar-alerta*`)
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
