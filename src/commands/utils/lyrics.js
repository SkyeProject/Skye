const superagent = require('superagent')
const Command = require('../../config/Command')

module.exports = class LyricsCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'lyrics',
      aliases: ['letra', 'letras', 'l'],
      description: 'Descubra a letra de uma musica!',
      example: 'letra rap do minecraft',
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
      const lyric = (await superagent.get(`https://some-random-api.ml/lyrics?title=${args}`)).body
      msg.send('Pesquisando... (Isso pode demorar um pouco)', { reply: true })
      msg.sendImage(lyric.thumbnail.genius, `Nome da musica: *${lyric.title}*\nCantor/banda/grupo: *${lyric.author}*\n\n${lyric.lyrics}`)
    } catch (err) {
      msg.send('Não achei nenhum resultados dessa musica.')
    }
  }
}
