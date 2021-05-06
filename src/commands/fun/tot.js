const Command = require('../../config/Command')

module.exports = class TotCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'tot',
      aliases: ['issoouaquilo', 'thisorthat', 'ioa', 'aquiloououtro', 'aquilo'],
      category: 'fun',
      description: 'Diga duas coisas e eu irei sortear um para você!',
      example: 'issoouaquilo gato cachorro',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false
    })
  }

  async execute ({ msg, args, prefix }) {
    try {
      if (!args[1]) return await msg.send(`Faltou você tacar 2 argumentos!\n\nEx: *${prefix}tot Gato Cachorro*. Eu irei sortear os dois e mandar no chat qual foi o sorteado!`, { reply: true })
      this.removeItem(args, '+')
      this.removeItem(args, 'e')
      this.removeItem(args, 'ou')
      const that = this.getRandomValueInArray(args, 1)
      await msg.send(`Entre *${args[0]}* e *${args[1]}*, eu escolho ${that}!`, { reply: true })
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
