const Command = require('../../config/Command')

module.exports = class MemberLeaveCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'memberleave',
      aliases: ['saida', 'saída', 'leave', 'byebye', 'goodbye', 'tchau', 'adeus', 'xau'],
      category: 'mod',
      description: 'Defina uma mensagem para que eu dê tchau a uma pessoa que saiu do grupo!',
      example: 'saida',
      onlyGroup: true,
      groupAdmPermission: {
        bot: false,
        user: true
      },
      ownerOnly: false
    })
  }

  async execute ({ msg, args, doc, prefix }) {
    try {
      if (!args[0]) {
        return await msg.send(`Sistema de saída!

Atualmente está: ${doc.byebye.activate ? `*Ativado*\n\nMensagem: \`\`\`${doc.byebye.message}\`\`\`\n\nPara desativar use: *${prefix}saida desativar*` : `*Desativado*\n\nPara ativar use: *${prefix}saida ativar*`}
`)
      }
      const activate = async () => {
        if (doc.byebye.activate) return await msg.send('O sistemas de saída já está ativado!')
        doc.byebye.activate = true
        await doc.save()
        return await msg.send(`Ok, sistema de saída ativado!\n\nUse *${prefix}saida msg* para poder setar a sua mensagem.`)
      }
      const disable = async () => {
        if (!doc.byebye.activate) return await msg.send('O sistema de saída já está desativada!')
        doc.byebye.activate = false
        await doc.save()
        return await msg.send(`Ok, sistema de saída foi desativado!\n\nUse *${prefix}saida ativar* para ativar novamente.`)
      }

      const message = async () => {
        if (!doc.byebye.activate) return await msg.send(`Você primeiro deve habilitar o sistema de saída!\nUse *${prefix}saida ativar*`)
        if (!args[1]) return await msg.send(`Para definir alguma mensagem, basta utilizar\n*${prefix}saida msg <mensagem de saída aqui>*\n\nExemplo: \`\`\`${prefix}saida msg Poxa, o(a) {member} saiu! Agora temos {memberCount} membros no total.\`\`\``)
        const message = args
        this.removeItem(message, args[0])
        if (!message.join(' ').includes('{member}')) return await msg.send(`O parâmetro *{member}* é obrigatório na mensagem!\nUse *${prefix}painel* para saber mais sobre os parâmetros.`)
        doc.byebye.message = message.join(' ')
        await doc.save()
        return await msg.send(`Ok, mensagem alterada para: \`\`\`${doc.byebye.message}\`\`\``)
      }

      switch (args[0]) {
        case 'ativar':
        case 'activate':
          await activate()
          break

        case 'desativar':
        case 'disable':
          await disable()
          break

        case 'mensagem':
        case 'message':
        case 'msg':
          await message()
          break

        default:
          return await msg.send(`Argumento inválido! Use *${prefix}saida* para saber mais.`)
      }
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
