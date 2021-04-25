const math = require('mathjs')
const Commands = require('../../config/commands')

module.exports = class CalculatorCommand extends Commands {
  constructor (zap) {
    super(zap, {
      name: 'calcular',
      aliases: ['math', 'c', 'calculator', 'calculadora'],
      category: 'utils',
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
      if (!args[0]) {
        return msg.send(`Você não especificou uma conta matematica.\n
Utilize "*+*" para somar
Utilize "*-*" para subtrair
Utilize "***" para multiplicar
Utilize "*/*" para dividir
Utilize "*%*" para porcentagem`)
      }
      let c = args.join('')
      c = c.includes('x') ? c.replace(/x/g, '*') : c
      c = c.includes('÷') ? c.replace(/÷/g, '/') : c
      c = c.includes('×') ? c.replace(/×/g, '*') : c
      msg.send(`${c} = ${math.evaluate(c)}`)
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
