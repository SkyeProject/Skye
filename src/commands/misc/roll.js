const Command = require('../../config/Command')

module.exports = class RollCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'roll',
      aliases: ['dado', 'rolar'],
      category: 'misc',
      description: 'Gire um dado!',
      example: 'dados 1 a 10',
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
      let firstNumber = 1
      let secondNumber = 6
      if (args[0] && !args[1] && Number(args[0])) secondNumber = Number(args[0])

      if (args[1]) {
        this.removeItem(args, 'a')
        firstNumber = Number(args[0]) ? firstNumber = Number(args[0]) : firstNumber
        secondNumber = Number(args[1]) ? secondNumber = Number(args[1]) : secondNumber
        if (!Number(args[0]) || !Number(args[1])) await msg.send('Você disse algum número inválido, então irei sortear o padrão normal do dado.', { reply: true })
      }
      const dice = Math.floor(Math.random() * (secondNumber + 1 - firstNumber) + firstNumber)
      await msg.send(`Sorteando um numero de ${firstNumber} a ${secondNumber}\n\nO NUMERO SORTEADO É: ${dice}`, { reply: true })
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
