const Command = require('../../config/Command')

module.exports = class PanelCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'panel',
      aliases: ['painel', 'sistemas', 'systems'],
      category: 'mod',
      description: 'Veja as minhas configurações para o seu servidor!',
      example: 'painel',
      onlyGroup: true,
      groupAdmPermission: {
        bot: false,
        user: true
      },
      ownerOnly: false
    })
  }

  async execute ({ msg, doc, prefix }) {
    try {
      return await msg.send(`Painel do bot


Sistema de entrada: ${doc.welcome.activate ? '*ativado.*' : '*desativado.*'}
mensagem: \`\`\`${doc.welcome.message}\`\`\`

Sistema de saída: ${doc.byebye.activate ? '*ativado.*' : '*desativado.*'}
mensagem: \`\`\`${doc.byebye.message}\`\`\`

Prefixo atual: *${prefix}*
Utilize *${prefix}prefix <novoprefixo>* para alterar o prefixo.

Alertas: ${doc.options.alert ? '*ativado.*' : '*desativado.*'}


Parâmetros: *{member}* (Menciona o usuário), 
*{group}* (Diz o nome do grupo), 
*{memberCount}* (Diz a quantidade de membros o grupo tem)

Para ativar ou desativar algum sistema, 
use ${prefix}<nome> ativar

Exemplo: \`\`\`${prefix}entrada ativar\`\`\`
     `)
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
