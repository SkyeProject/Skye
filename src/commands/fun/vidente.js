const Command = require('../../config/Command')

module.exports = class VidenteCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'vidente',
      aliases: ['pergunta'],
      category: 'fun',
      onlyGroup: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false
    })
  }

  execute ({ msg, args }) {
    try {
      const answer = ['Sim',
        'Não',
        'Talvez',
        'Claro',
        'Obvio!',
        'Nunca',
        'Jamais',
        'Sei não em... Me parece marmelada',
        'Melhor não',
        'Claro que sim!',
        'Obviamente Óbvio'
      ]
      if (!args[0]) return msg.send('Eita, você não fez nenhuma pergunta meu caro amigo!', { reply: true })
      const quest = args.join(' ')
      const randomAnswer = answer[Math.floor((Math.random() * answer.length))]
      msg.send(`_Pergunta_: *${quest}*\n_Resposta_: *${randomAnswer}*\n\n🔮 | Afonso, o vidente.`, { reply: true })
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
