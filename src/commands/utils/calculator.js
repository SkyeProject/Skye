const Command = require('../../config/Command')
const math = require('mathjs')

module.exports = class CalculatorCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'calculator',
      aliases: ['calcular', 'math', 'c', 'calc', 'calculator', 'calculadora'],
      category: 'utils',
      description: 'Faça cálculos simples! (Cálculos complexos não são suportados!)',
      example: 'calcular 20 x 30',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false,
      isWorking: true
    })
  }

  async execute ({ msg, args }) {
    try {
      if (!args[0]) return await msg.send('Você não especificou uma conta matematica.\n\nUtilize *+* para somar\nUtilize *-* para subtrair\nUtilize *** para multiplicar\nUtilize */* para dividir\nUtilize *%* para porcentagem', { reply: true })
      let c = args.join(' ')
      c = c.replace(/x/g, '*')
      c = c.replace(/÷/g, '/')
      c = c.replace(/×/g, '*')
      try { await msg.send(`${c} = ${math.evaluate(c)}`, { reply: true }) } catch (err) { return await msg.send(`Não foi possível realizar o seu cálculo:\n\n \`\`\`${err}\`\`\``) }
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
