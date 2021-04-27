// fiz esse comando em 3 minutos pq o demetrius pediu, então não sei se ta funfando pq eu não cheguei a testar só fiz mesmo e lancei
const Command = require('../../config/command')

module.exports = class TemplateCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'alert',
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
      const allGroups = await this.zap.atizap.getAllGroups()
      allGroups.forEach(async group => {
        await msg.send(`❗ *| ${args.join(' ')}*`, { from: group.id })
      })
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
