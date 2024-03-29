const Command = require('../../config/Command')
const { version } = require('../../../package.json')

module.exports = class CommandSay extends Command {
  constructor (zap) {
    super(zap, {
      name: 'botinfo',
      aliases: ['sobreobot', 'bot', 'info', 'infobot'],
      category: 'misc',
      description: 'Vê algumas informações técnicas sobre mim.',
      example: 'botinfo',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false,
      isWorking: true
    })
  }

  async execute ({ msg }) {
    try {
      const mostUsedCommands = []
      this.zap.commands.forEach(command => {
        mostUsedCommands.push({
          name: command.config.name,
          used: command.amountTimes
        })
      })
      mostUsedCommands.sort((a, b) => b.used - a.used)
      const allGroups = await this.zap.atizap.getAllGroups()
      const allUsers = []
      allGroups.forEach(group => {
        allUsers.push(group.participantsCount - 1)
      })
      await msg.send(`*Informações sobre mim!*

😎 | Criadores: MrRexD#0620 & demetrius#0439 (digite !contato para ver o número deles)
👾 | Versão: *${version}*
🐏 | RAM utilizada: *${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB*
🌎 | Grupos: *${allGroups.length}*
🙌 | Usuários: *${allUsers.reduce((a, b) => a + b)}*
💻 | Versão do Node.js: *${process.version}*
👩🏼‍💻 | WA-VERSION: *${await this.zap.atizap.getWAVersion()}*
🌟 | Comando mais utilizado desde o último restart: *${mostUsedCommands[0].name}*
✉️ | Já foram executados *${mostUsedCommands.reduce((a, b) => a + b.used, 0)}* comandos desde a hora que eu acordei!
😴 | Acordada à: *${this.uptime()}*
😁 | Meu GitHub: https://github.com/SkyeProject/Skye`, { link: true })
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
