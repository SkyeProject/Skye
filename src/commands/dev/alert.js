// fiz esse comando em 3 minutos pq o demetrius pediu, então não sei se ta funfando pq eu não cheguei a testar só fiz mesmo e lancei
const { config } = require('../..')
const Command = require('../../config/Command')

module.exports = class AlertCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'alert',
      aliases: ['alerta'],
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
      if (!args[0]) return await msg.send('Você não disse nada pra enviar.')
      const allGroups = await this.zap.atizap.getAllGroups()
      await msg.send(`Enviando: \n\n❗ *| ${args.join(' ')}*`)
      allGroups.forEach(async group => {
        const groupdoc = await this.zap.mongo.Groups.findById(group.id)
        if (!groupdoc || (groupdoc && groupdoc.options.alert)) {
          await msg.send(`❗ *| ${args.join(' ')}*\n\nPara desativar os alertas, use *${groupdoc ? groupdoc.prefix : config.bot.prefix}desativar-alerta*`, { from: group.id })
        }
      })
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
