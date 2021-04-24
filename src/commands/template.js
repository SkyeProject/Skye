const Commands = require('../../config/commands') // não esqueça de tacar o cmd na pasta de alguma categoria, se não vai dar pau aqui

module.exports = class TemplateCommand extends Commands {
  constructor (zap) {
    super(zap, {
      name: 'template', // nome do comando
      aliases: ['t'], // aliases dele
      category: 'categoriaTop', // categoria
      ownerOnly: false // somente para dev?
    })
  }

  execute ({ msg }) {
    try {
    // codigo dele aqui...
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
