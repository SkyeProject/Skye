const Commands = require('../config/commands')

module.exports = class RollCommand extends Commands {
  constructor (zap) {
    super(zap, {
      name: 'roll',
      aliases: ['dado'],
      category: 'fun',
      ownerOnly: false
    })
  }

  async execute ({ msg, args }) {
    if (!args[0]) {
      const dice = Math.floor(Math.random() * 20) + 1
      msg.send(`Como não foi informado um numero, vou sorteador um numero de 0 a 20!\n\nO NUMERO SORTEADO É: ${dice}`)
    } else {
      const args1 = args.join(' ')
      const dice1 = Math.floor(Math.random() * args1) + 1
      msg.send(`Sorteando um numero de 0 a ${args1}\n\nO NUMERO SORTEADO É: ${dice1}`)
    }
  }
}
