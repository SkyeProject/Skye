const Command = require('../../config/Command')

module.exports = class PrefixCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'prefix',
      aliases: ['prefixo', 'setprefix', 'prefixset', 'setprefixo'],
      category: 'utils',
      description: 'Veja ou mude o prefixo do bot em seu servidor.',
      example: 'prefix $',
      groupOnly: true,
      groupAdmPermission: {
        bot: false,
        user: true
      },
      ownerOnly: false,
      isWorking: true
    })
  }

  async execute ({ msg, args, doc }) {
    try {
      if (!args[0]) return msg.send(`Olá, meu prefixo atual é \`\`\`${doc.prefix}\`\`\`\nPara alterar, use *${doc.prefix}prefix <novo prefixo>.*`)
      if (args[0].length > 3) return msg.send('Prefixo muito grande! Por favor, escolha até 2 caracteres.')
      doc.prefix = args[0].toLowerCase()
      await msg.send(`Muito bem, agora o meu prefixo é *${doc.prefix}* :)`)
      await doc.save()
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
