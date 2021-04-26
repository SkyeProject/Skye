const Command = require('../../config/Command')

module.exports = class AmongusCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'amongus',
      aliases: ['impostor', 'among'],
      category: 'fun',
      onlyGroup: true,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false
    })
  }

  async execute ({ msg }) {
    try {
      const membros = this.getAllMembersNumbers(msg, true)
      const randomMembers = this.getRandomValueInArray(membros, 2)
      const a = randomMembers[0]
      const b = randomMembers[1]
      const text = [`o @${a} é o impostor, eu vi ele em outro grupo... 🤫`, `O @${b} estava comigo, só pode ser o/a @${a}! 🧐`, `Vi o/a @${a} matando a/o @${b}! 💀`, `Acho que vi o/a @${a} entrando na tubulação 😑`, `O/A @${a} tava seguindo o @${b} talvez ele(a) deva ser o impostor 🤔`, `Vi o/a @${a} sabotando a fiação... 😉`, `O/A @${a} viu o corpo e não reportou! 😠`]
      const randomText = text[Math.floor((Math.random() * text.length))]
      this.zap.atizap.sendTextWithMentions(msg.from, randomText)
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
