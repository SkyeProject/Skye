const Command = require('../../config/Command')

module.exports = class ReloadCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'reload',
      aliases: ['r', 'reiniciar'],
      category: 'dev',
      description: 'Comando usado para reiniciar algum comando.',
      example: 'reload ship',
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
      if (!args[0]) return await msg.send('Você não disse o comando burro', { reply: true })
      const cmdfind = args[0].toLowerCase()

      const cmdreload = this.zap.commands.get(cmdfind) || this.zap.commands.get(this.zap.aliases.get(cmdfind))
      if (!cmdreload) return msg.send('Pai, não achei esse comando!', { reply: true })
      delete require.cache[require.resolve(`../${cmdreload.config.category}/${cmdreload.config.name}.js`)]
      this.zap.commands.delete(cmdfind)
      const Cmd = require(`../${cmdreload.config.category}/${cmdreload.config.name}.js`)
      const newcmd = new Cmd(this.zap)
      this.zap.commands.set(newcmd.config.name, newcmd)
      await msg.send(`O comando *${newcmd.config.name}* foi atualizado com sucesso!`, { reply: true })
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
