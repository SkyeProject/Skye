const Commands = require('../config/commands')

module.exports = class LiberadoCommand extends Commands {
  constructor (zap) {
    super(zap, {
      name: 'liberado',
      aliases: ['pode', 'podenogrupo'],
      category: 'fun',
      ownerOnly: false
    })
  }

  async execute ({ msg, args }) {
    const argss = args.join(' ')
    const quest = ['Sim', 'Não', 'Claro', 'Obvio', 'Claro que não', 'Melhor não', 'Talvez sim', 'Talvez não']
    const randomText = quest[Math.floor((Math.random() * quest.length))]
    if (!argss) {
      await msg.send('Não sei se ta liberado, até porquê você não colocou nada (!liberado mensagem)')
    } if (!msg.isGroupMsg) {
      await msg.send(`Ta liberado *${argss}* no pv?\n\nA Resposta é: *${randomText}*!`)
    } else {
      await msg.send(`Ta liberado *${argss}* no grupo?\n\nA Resposta é: *${randomText}*!`)
    }
  }
}
