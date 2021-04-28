const Command = require('../../config/Command') // não esqueça de tacar o cmd na pasta de alguma categoria, se não vai dar pau aqui

module.exports = class TemplateCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'template', // nome do comando
      aliases: ['t'], // aliases dele
      category: 'categoriaTop', // categoria
      onlyGroup: false, // comando funciona somente para grupo?
      groupAdmPermission: { // pelamor, não invente de marcar true em alguma dessas 2 opções abaixo sem marcar o onlyGroup como true.
        bot: false, // o bot precisa de ADM no grupo?
        user: false // o usuário precisa de ADM no grupo?
      },
      ownerOnly: false // somente para dev?
    })
  }

  execute ({ msg }) {
    try {
    // codigo do comando...
    } catch (err) {
      msg.zapFail(err) // caso der pau o comando, o bot já vai logo avisar pro usuário que algo de errado aconteceu, e ja vai retornar um erro no seu console.
    }
  }
}
