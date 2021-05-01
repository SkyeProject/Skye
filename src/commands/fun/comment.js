const Command = require('../../config/Command')
const Canvacord = require('canvacord')

module.exports = class CommentCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'comment',
      aliases: ['comentario', 'comentário', 'youtubecomentario', 'comentárioyoutube'],
      category: 'fun',
      description: 'Faça algum comentário famoso no youtube!',
      example: 'comentario @MrRexD Fala galera beleza?',
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
      if (!args[0]) return await msg.send('Você precisa mencionar alguém!', { reply: true })
      if (!args[1]) return await msg.send('Você precisa mandar algum comentário!', { reply: true })

      let user = await msg.getContact(args[0])
      if (!user.found) user = await msg.getContact(msg.sender.id)
      else this.removeItem(args, args[0])

      const comment = await Canvacord.Canvas.youtube({ username: user.username, content: args.join(' '), avatar: user.avatar, dark: true })
      await msg.sendImage(`data:image/png;base64,${comment.toString('base64')}`)
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
