const Commands = require('../config/commands')

module.exports = class AmongusCommand extends Commands {
  constructor (zap) {
    super(zap, {
      name: 'amongus',
      aliases: ['impostor', 'among'],
      category: 'fun',
      ownerOnly: false
    })
  }

  async execute ({ msg, args }) {
    try {
      if (!msg.isGroupMsg) msg.send('Esse comando só funciona em grupo')
      else {
        const members = await this.zap.atizap.getGroupMembers(msg.chat.groupMetadata.id)

        const math = []
        members.forEach(element => {
          math.push(element.id)
        })

        const random = math[Math.floor((Math.random() * math.length))]
        let random2 = math[Math.floor((Math.random() * math.length))]
        const a = `@${random.replace(/@c.us/g, '')}`
        const b = `@${random2.replace(/@c.us/g, '')}`
        while (random === random2) {
          random2 = math[Math.floor((Math.random() * math.length))]
        }
        const text = [`o ${a} é o impostor, eu vi ele em outro grupo... 🤫`, `O ${b} estava comigo, só pode ser o/a ${a}! 🧐`, `Vi o/a ${a} matando a/o ${b}! 💀`, `Acho que vi o/a ${a} entrando na tubulação 😑`, `O/A ${a} tava seguindo o ${b} talvez ele(a) deva ser o impostor 🤔`, `Vi o/a ${a} sabotando a fiação... 😉`, `O/A ${a} viu o corpo e não reportou! 😠`]
        const randomText = text[Math.floor((Math.random() * text.length))]
        this.zap.atizap.sendTextWithMentions(msg.from, randomText)
      }
    } catch (error) {
      msg.send(`Algo deu errado, tente novamente!\n\n${error}`)
    }
  }
}
