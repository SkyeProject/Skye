const Command = require('../../config/Command')

module.exports = class CommandSay extends Command {
  constructor (zap) {
    super(zap, {
      name: 'botinfo',
      aliases: ['infobot', 'bot', 'info', 'sobreobot'],
      category: 'misc',
      onlyGroup: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false
    })
  }

  async execute ({ msg }) {
    try {
      const allGroups = await this.zap.atizap.getAllGroups()
      const allUsers = []
      allGroups.forEach(group => {
        allUsers.push(group.participantsCount - 1)
      })
      msg.send(`*Informações sobre mim!*

😎 | Criadores: MrRexD#0620 & demetrius#0620 (digite !contato para ver o número deles)
🌎 | Grupos: *${allGroups.length}*
🙌 | Usuários: *${allUsers.reduce((a, b) => a + b)}*
🔋 | Bateria restante: *${await this.zap.atizap.getBatteryLevel()}%*
💻 | Versão do Node.js: *${process.version}*
👩🏼‍💻 | WA-VERSION: *${await this.zap.atizap.getWAVersion()}*
😴 | Acordado à: *${this.uptime()}*`)
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
