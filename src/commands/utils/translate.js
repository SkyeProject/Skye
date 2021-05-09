const Command = require('../../config/Command')
const translate = require('@vitalets/google-translate-api')

module.exports = class TranslateCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'translate',
      aliases: ['tradutor', 'traduzir', 'googletradutor'],
      category: 'utils',
      description: 'Traduza uma palavra',
      example: 'tradutor pt hi',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false
    })
  }

  async execute ({ msg, args }) {
    try {
      if (!args[0]) return msg.send('Você não disse nada para traduzir.\nUse !traduzir <para> <texto>. Exemplo: !traduzir en Olá', { reply: true })
      const text = await translate(args.join(' '), { to: args[0] })
      msg.send(`*${text.text}*`, { reply: true })
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
