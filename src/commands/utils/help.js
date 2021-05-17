const Command = require('../../config/Command')

module.exports = class HelpCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'help',
      aliases: ['ajuda', 'menu'],
      category: 'utils',
      description: 'Descubra os comando do bot!',
      example: 'ajuda',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false
    })
  }

  async execute ({ msg, prefix, args }) {
    try {
      let helpText = `Menu de ajuda da *${msg.botContact.pushname}*!!\n\n`
      if (!args[0]) helpText += 'Categorias:\n\n'

      this.zap.commands.forEach(cmd => {
        if (args[0] && cmd.config.category !== 'dev') {
          const param = args[0].toLowerCase()
          if (param === cmd.config.category) {
            helpText += `-> *${prefix}${cmd.config.aliases[0]}*\n`
          }
          if (param === cmd.config.name || cmd.config.aliases.includes(param)) {
            helpText += `=========================
Comando: *${cmd.config.name}*

Descrição: *${cmd.config.description}*

Exemplo de uso: *${prefix}${cmd.config.example}*

Funciona somente para grupo: ${cmd.config.groupOnly ? '*Sim*' : '*Não*'}

O bot precisa de ADM: ${cmd.config.groupAdmPermission.bot ? '*Sim*' : '*Não*'}
E o usuário, precisa de ADM: ${cmd.config.groupAdmPermission.user ? '*Sim*' : '*Não*'}

Outras formas de chamar o comando:
*${cmd.config.name + ', ' + cmd.config.aliases.join(', ')}*
=========================`
          }
          if (param === 'geral' || param === 'all') {
            if (!helpText.includes(cmd.config.category)) helpText += `===============\n*Comandos da categoria: ${cmd.config.category}*\n===============\n`
            helpText += `-> *${prefix}${cmd.config.aliases[0]}*\n`
          }
        } else if (!helpText.includes(cmd.config.category) && cmd.config.category !== 'dev') {
          helpText += `${prefix}ajuda *${cmd.config.category}*\n`
        }
      })
      if (helpText === `Menu de ajuda da *${msg.botContact.pushname}*!!\n\n`) helpText += `Não obtive nenhum resultado com o parâmetro *${args[0]}*.\n`
      helpText += `\nUse *${prefix}ajuda <nome do comando>* para mais detalhes sobre ele.\n`
      helpText += `\nPara visualizar todos os comandos, use *${prefix}ajuda geral*`
      await msg.send(helpText, { reply: true })
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
