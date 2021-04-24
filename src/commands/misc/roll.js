const Commands = require('../../config/commands')

module.exports = class RollCommand extends Commands {
  constructor (zap) {
    super(zap, {
      name: 'roll',
      aliases: ['dado', 'dados'],
      category: 'misc',
      ownerOnly: false
    })
  }

  async execute ({ msg, args }) {
    try {
      let firstNumber = 1
      let secondNumber = 6
      if (args[1]) {
        removeItem(args, 'a')
        firstNumber = Number(args[0]) ? firstNumber = Number(args[0]) : firstNumber
        secondNumber = Number(args[1]) ? secondNumber = Number(args[1]) : secondNumber
        if (!Number(args[0]) || !Number(args[1])) msg.send('Você disse algum número inválido, então irei sortear o padrão normal do dado.')
      }
      const dice = Math.floor(Math.random() * (secondNumber + 1 - firstNumber) + firstNumber)
      msg.send(`Sorteando um numero de ${firstNumber} a ${secondNumber}\n\nO NUMERO SORTEADO É: ${dice}`)
    } catch (err) {
      msg.zapFail(err)
    }
  }
}

const removeItem = (arr, value) => {
  const index = arr.indexOf(value)
  if (index > -1) {
    arr.splice(index, 1)
  }
  return arr
}
