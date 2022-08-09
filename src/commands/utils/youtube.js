const Command = require('../../config/Command')
const googleIt = require('google-it')

module.exports = class YoutubeCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'youtube',
      aliases: ['video', 'vídeo', 'videos'],
      description: 'Pesquisa algo no youtube.',
      example: 'pesquisar rezeendevil traficando anão',
      category: 'utils',
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
      if (!args[0]) return await msg.send('Você não disse nada pra pesquisar!')

      googleIt({ query: `${args.join(' ')} site:youtube.com/watch`, 'no-display': 1 }).then(async results => {
        if (!results[0]) return msg.send('Não encontrei a sua pesquisa.')
        return await msg.send(`*${results[0].title}*\n\n*Link:* ${results[0].link}`, { youtube: true })
      })
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
