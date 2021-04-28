const Command = require('../../config/Command')

module.exports = class TotCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'tot',
      aliases: ['thisorthat', 'issoouaquilo', 'ioa', 'aquiloououtro', 'aquilo'],
      category: 'fun',
      onlyGroup: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false
    })
  }

  async execute ({ msg, args }) {
    try {
      if (!args[1]) return msg.send('Como funciona esse comando: Basicamente, você manda dois argumentos, Ex.: !tot Gato Cachorro. Eu irei sortear os dois e mandar no chat qual foi o sorteado!', { reply: true })
      this.removeItem(args, '+')
      this.removeItem(args, 'e')
      this.removeItem(args, 'ou')
      const that = this.getRandomValueInArray(args, 1)
      msg.send(`Entre *${args[0]}* e *${args[1]}*, eu escolho ${that}!`, { reply: true })
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
