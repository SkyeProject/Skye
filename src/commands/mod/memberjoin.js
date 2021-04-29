const Command = require('../../config/Command')

module.exports = class MemberJoinCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'memberjoin',
      aliases: ['entrada', 'boasvindas', 'bemvindo', 'bem-vindo', 'join', 'welcome'],
      category: 'mod',
      description: 'Defina uma mensagem para que eu possa saudar novos membros!',
      example: 'entrada',
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
        return msg.send(`Sistema de boas vindas!

Atualmente está: ${doc.welcome.activate ? `*Ativado*\n\nMensagem: \`\`\`${doc.welcome.message}\`\`\`\n\nPara desativar use: *${prefix}entrada desativar*` : `*Desativado*\n\nPara ativar use: *${prefix}entrada ativar*`}
`)
      }
      const activate = async () => {
        if (doc.welcome.activate) return await msg.send('O sistemas de boas vindas já está ativado!')
        doc.welcome.activate = true
        await doc.save()
        return await msg.send(`Ok, sistema de boas vindas foi ativado!\n\nUse *${prefix}entrada msg* para poder setar a sua mensagem.`)
      }
      const disable = async () => {
        if (!doc.welcome.activate) return await msg.send('O sistema de boas vindas já está desativada!')
        doc.welcome.activate = false
        await doc.save()
        return await msg.send(`Ok, sistema de boas vindas foi desativado!\n\nUse *${prefix}entrada ativar* para ativar novamente.`)
      }

      const message = async () => {
        if (!doc.welcome.activate) return await msg.send(`Você primeiro deve habilitar o sistema de boas vindas!\nUse *${prefix}entrada ativar*`)
        if (!args[1]) return await msg.send(`Para definir alguma mensagem, basta utilizar\n*${prefix}entrada msg <mensagem de saudação aqui>*\n\nExemplo: \`\`\`${prefix}entrada msg Seja bem-vindo(a) {member} ao nosso grupo *{group}*!\`\`\``)
        const message = args
        this.removeItem(message, args[0])
        if (!message.join(' ').includes('{member}')) return await msg.send(`O parâmetro *{member}* é obrigatório na mensagem!\nUse *${prefix}painel* para saber mais sobre os parâmetros.`)
        doc.welcome.message = message.join(' ')
        await doc.save()
        return await msg.send(`Ok, mensagem alterada para: \`\`\`${doc.welcome.message}\`\`\``)
      }

      switch (args[0]) {
        case 'ativar':
          await activate()
          break

        case 'activate':
          await activate()
          break

        case 'desativar':
          await disable()
          break

        case 'disable':
          await disable()
          break

        case 'msg':
          await message()
          break

        case 'mensagem':
          await message()
          break

        case 'message':
          await message()
          break

        default:
          return await msg.send(`Argumento inválido! Use *${prefix}entrada* para saber mais.`)
      }
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
