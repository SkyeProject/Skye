const Command = require('../../config/Command')

module.exports = class PrefixCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'prefix',
      aliases: ['setprefix', 'prefixo', 'prefixset', 'setprefixo'],
      category: 'utils',
      onlyGroup: true,
      groupAdmPermission: {
        bot: false,
        user: true
      },
      ownerOnly: false
    })
  }

  async execute ({ msg, args, doc }) {
    try {
      if (!args[0]) return msg.send(`Olá, meu prefixo atual é \`\`\`${doc.prefix}\`\`\`\nPara alterar, use *${doc.prefix}prefix <novo prefixo>.*`)
      if (args[0].length > 3) return msg.send('Prefixo muito grande! Por favor, escolha até 2 caracteres.')
      doc.prefix = args[0].toLowerCase()
      await msg.send(`Muito bem, agora o meu prefixo é *${doc.prefix}* :)`)
      doc.save()
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
