/*
*   Comando pedido por Gabe Yata :)
*/

const Command = require('../../config/Command')

module.exports = class KickCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'kick',
      aliases: ['chutar', 'bicuda', 'chute', 'chutao'],
      category: 'fun',
      description: 'Chute alguém!',
      example: 'kick @demetrius',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false
    })
  }

  async execute ({ msg, args }) {
    try {
      if (!args[0]) return await msg.send('Você precisa mencionar alguem que queira chutar!', { reply: true })

      const user = await msg.getContact(msg.sender.id)
      const mentioned = await msg.getContact(args[0])

      const kicks = require('../../config/modules/API/kick/kicks.json')
      const defenses = require('../../config/modules/API/kick/defenses.json')
      const kick = kicks[this.getRandomInt(0, Object.keys(kicks).length)]
      const defense = defenses[this.getRandomInt(0, Object.keys(defenses).length)]

      const numberDrawn = this.getRandomInt(0, 10)
      if (numberDrawn === 5) return await this.zap.atizap.sendVideoAsGif(msg.from, defense, 'block', `*${mentioned.username}* segurou o chute de *${user.username}*! 😮`)
      else return await this.zap.atizap.sendVideoAsGif(msg.from, kick, 'chutao', `*${user.username}* deu um chutão em *${mentioned.username}*`)
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
