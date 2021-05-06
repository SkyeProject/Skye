const Command = require('../../config/Command')

module.exports = class GroupCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'group',
      aliases: ['grupo', 'skyegrupo', 'gruposkye'],
      description: 'Entre no grupo oficial da skye!',
      example: 'grupo',
      category: 'misc',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false
    })
  }

  execute ({ msg }) {
    try {
      msg.send('*Você sabia que eu criei um grupo? Você pode entrar agorinha clicando no link!* ❤️ \n_https://chat.whatsapp.com/EL0mvypU06QKiLLfDi3qkw_', { link: true })
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
