const Command = require('../../config/Command')

module.exports = class AlertDisableCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'alert',
      aliases: ['alerta'],
      category: 'mod',
      description: 'Ative ou desative os alertas em seu servidor.',
      example: 'alerta ativar',
      groupOnly: true,
      groupAdmPermission: {
        bot: false,
        user: true
      },
      ownerOnly: false
    })
  }

  async execute ({ msg, args, prefix, doc }) {
    try {
      if (!args[0]) return await msg.send(`O sistema de alerta atualmente está ${doc.options.alert ? `*ativado*. Para desativar utilize *${prefix}alerta desativar*.` : `*desativado*. Para ativar utilize *${prefix}alerta ativar*.`}`)
      const disable = ['desativar', 'disable', 'desative', 'off']
      const enable = ['ativar', 'enable', 'ative', 'on']
      let option = args[0].toLowerCase()

      if (disable.includes(option)) option = false
      else if (enable.includes(option)) option = true
      else return await msg.send(`Não entendi o seu argumento! Utilize *${prefix}alert* para saber mais!`)

      doc.options.alert = option
      console.log(doc.options)
      await doc.save()
      await msg.send(`Ok, os alertas foram ${option === true ? 'ativados com sucesso!' : 'desativados com sucesso!'}`)
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
