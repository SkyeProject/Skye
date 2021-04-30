const googleIt = require('google-it')
const Command = require('../../config/Command')

module.exports = class YoutubeCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'youtube',
      aliases: ['pesquisar'],
      description: 'Pesquisa algo no youtube.',
      example: 'pesquisar rezeendevil traficando anão',
      category: 'utils',
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
      if (!args[0]) return await msg.send('Você não disse nada pra pesquisar!')

      googleIt({ query: `${args.join(' ')} site:youtube.com/watch`, 'no-display': 1 }).then(results => {
        if (!results[0]) return msg.send('Não encontrei a sua pesquisa.')
        msg.sendYoutube(`*${results[0].title}*\n\n*Link:* ${results[0].link}`)
      })
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
