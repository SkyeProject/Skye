const Commands = require('../config/commands')

module.exports = class ReloadCommand extends Commands {
  constructor (zap) {
    super(zap, {
      name: 'reload',
      aliases: ['r', 'reiniciar'],
      category: 'dev',
      ownerOnly: true
    })
  }

  async execute ({ msg, args }) {
    if (!args[0]) return msg.send('Você não disse o comando burro')
    const cmdfind = args[0].toLowerCase()
    try {
      const cmdreload = this.zap.commands.get(cmdfind)
      delete require.cache[require.resolve(`./${cmdreload.config.name}.js`)]
      this.zap.commands.delete(cmdfind)
      const Cmd = require(`./${cmdreload.config.name}.js`)
      const newcmd = new Cmd(this.zap)
      this.zap.commands.set(newcmd.config.name, newcmd)
    } catch (e) {
      console.log(e)
      return msg.send(`Não foi possível recarregar: *${args[0]}*\n\`\`\`js\n${e}\`\`\``)
    }
    msg.send(`O comando *${args[0]}* foi atualizado com sucesso!`)
  }
}
