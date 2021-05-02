const Command = require('../../config/Command')
const Canvacord = require('canvacord')

module.exports = class PhubCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'phub',
      aliases: ['pornhub', 'comentariosexy'],
      category: 'fun',
      description: 'Faça um comentário no Porn Hub ( ͡° ͜ʖ ͡°)',
      example: 'pornhub Ai que vídeo divertido!',
      onlyGroup: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false
    })
  }

  async execute ({ msg, args }) {
    try {
      if (!args[0]) return await msg.send('Você precisa mandar algum comentário!', { reply: true })

      let user = await msg.getContact(args[0])
      if (!user.found) user = await msg.getContact(msg.sender.id)
      else this.removeItem(args, args[0])

      const comment = await Canvacord.Canvas.phub({ username: user.username, message: args.join(' '), image: user.avatar })
      await msg.sendImage(`data:image/png;base64,${comment.toString('base64')}`)
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
