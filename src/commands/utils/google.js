const Command = require('../../config/Command')
const googleIt = require('google-it')

module.exports = class YoutubeCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'google',
      aliases: ['pesquisa', 'search', 'pesquisar'],
      description: 'Pesquise algo no Google.',
      example: 'google SchwiBot',
      category: 'utils',
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
      if (!args[0]) return await msg.send('Você não disse nada pra pesquisar!')

      googleIt({ query: `${args.join(' ')}`, 'no-display': 10 }).then(async results => {
        if (!results[0]) return msg.send('Não encontrei a sua pesquisa.')
        let text = '*Resultados que eu obtive:*\n\n'
        for (const result of results) {
          text += '*' + result.title + '*\n'
          text += 'URL: ' + result.link + '\n\n\n'
        }
        return await msg.send(text, { link: true })
      })
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
