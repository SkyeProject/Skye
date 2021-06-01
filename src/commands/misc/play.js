const Command = require('../../config/Command')
const youtubedl = require('youtube-dl-exec')
const googleIt = require('google-it')
const { unlinkSync } = require('fs')

module.exports = class PlayCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'play',
      aliases: ['tocar', 'música', 'musica', 'musicayoutube', 'p'],
      category: 'misc',
      description: 'Baixe música do youtube.',
      example: 'play galinha pintadinha',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false
    })
  }

  async execute ({ msg, args, prefix }) {
    try {
      if (!args[0]) {
        return await msg.send(`Oiii, digite o nome de alguma música para mim pesquisar no Youtube e baixar para você!
Exemplo:
*${prefix}play abertura jojo*`, true)
      }
      await msg.send('Sua música já está vindo!! :)', { reply: true })

      googleIt({ query: `${args.join(' ')} site:youtube.com/watch`, 'no-display': 1 }).then(async results => {
        if (!results[0]) return msg.send('Não encontrei a música!!')
        try {
          await youtubedl(results[0].link, {
            noWarnings: true,
            noCallHome: true,
            noCheckCertificate: true,
            preferFreeFormats: true,
            youtubeSkipDashManifest: true,
            matchFilter: 'filesize < 150M',
            x: true,
            audioFormat: 'mp3',
            o: `./.temp/music_${msg.id}.mp3`
          })
          await this.zap.atizap.sendPtt(msg.from, `./.temp/music_${msg.id}.mp3`, msg.id)
          unlinkSync(`./.temp/music_${msg.id}.mp3`)
        } catch (err) {
          await msg.send('Ocorreu um erro. Provavelmente você mandou eu procurar um vídeo muito longo ou ocorreu um erro interno.')
        }
      })
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
