const Commands = require("../config/commands");
const math = require('mathjs')

module.exports = class CalculatorCommand extends Commands {
    constructor(zap) {
        super(zap, {
            name: 'calcular',
            aliases: ['math, c'],
            category: 'utils',
            ownerOnly: false
        })
    }
    async execute({ msg, args }) {
        if (args.length == 0) return msg.send('Você não especificou uma conta matematica.\n\nUtilize "+" para somar\nUtilize "-" para subtrair\nUtilize "*" para multiplicar\nUtilize "/" para dividir\nUtilize "%" para porcentagem')
        let mtk = args.join("")
        if (mtk.includes('x')) mtk = mtk.replace('x', '*')
        if (mtk.includes('÷')) mtk = mtk.replace('÷', '/')
        if (typeof math.evaluate(mtk) !== "number") {
            await msg.send(`Você definiu mesmo uma conta? Isso não parece uma.`)
        } else {
            await msg.send(`${mtk} = ${math.evaluate(mtk)}`)
        }
    }
}