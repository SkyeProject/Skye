const Command = require('../../config/Command')

module.exports = class ReloadCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'reload',
      aliases: ['r', 'reiniciar'],
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
      if (!args[0]) return msg.send('Você não disse o comando burro')
      const cmdfind = args[0].toLowerCase()

      const cmdreload = this.zap.commands.get(cmdfind)
      delete require.cache[require.resolve(`../${cmdreload.config.category}/${cmdreload.config.name}.js`)]
      this.zap.commands.delete(cmdfind)
      const Cmd = require(`../${cmdreload.config.category}/${cmdreload.config.name}.js`)
      const newcmd = new Cmd(this.zap)
      this.zap.commands.set(newcmd.config.name, newcmd)
      msg.send(`O comando *${args[0]}* foi atualizado com sucesso!`)
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
