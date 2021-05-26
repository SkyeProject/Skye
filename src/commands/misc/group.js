const Command = require('../../config/Command')

module.exports = class GroupCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'group',
      aliases: ['grupo', 'skyegrupo', 'gruposkye', 'grp', 'convite'],
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

  async execute ({ msg }) {
    try {
      await msg.send('*Você sabia que eu criei um grupo? Você pode entrar agorinha clicando no link!* ❤️ \n_https://chat.whatsapp.com/L70jEfsiymuKNg9JBiVvES_', { link: true })
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
