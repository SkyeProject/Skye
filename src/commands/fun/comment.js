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
      if (!args[0]) return await msg.send('Você precisa mandar algum comentário!', { reply: true })
      let user = await msg.getContact(args[0])
      if (user.found && !args[1]) return await msg.send('Você mencionou alguém mas não escreveu nenhuma mensagem!', { reply: true })
      if (!user.found) user = await msg.getContact(msg.sender.id)
      else this.removeItem(args, args[0])

      const comment = await Canvacord.Canvas.youtube({ username: user.username, content: args.join(' '), avatar: user.avatar, dark: true })
      await msg.sendImage(`data:image/png;base64,${comment.toString('base64')}`)
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
