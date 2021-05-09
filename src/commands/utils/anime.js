const Command = require('../../config/Command')
const Kitsu = require('kitsu')
const kitsu = new Kitsu()
const translate = require('@vitalets/google-translate-api')

module.exports = class AnimeCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'anime',
      aliases: ['anime', 'otaku', 'desenhojaponês'],
      category: 'utils',
      description: 'Pesquise os seus animes favoritoos',
      example: 'anime jujutsu kaisen',
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
      if (!args[0]) return msg.send('Você não digitou o nome de nenhum anime!!!', { reply: true })
      const res = await kitsu.get('anime?filter[text]=' + args.join(' ') + '&page[limit]=5').catch(e => {})
      const dataRes = res.data[0]
      if (!dataRes) return msg.send('Não achei o anime que você mencionou! 😥')

      const image = dataRes.coverImage || dataRes.posterImage
      await msg.sendImage(image.original, `*${dataRes.canonicalTitle || 'Sem título'}*

${(await translate(dataRes.synopsis || 'Sem descrição.', { to: 'pt' })).text}

Avaliação média: *${dataRes.averageRating || 'Sem avaliação média.'}*

Classificação etária: *${dataRes.ageRatingGuide || 'Sem classificação etária.'}*

Quantidade de epsódios: *${dataRes.episodeCount || 'Não definido.'}*

Status: *${(dataRes.status === 'current' ? 'Em lançamento.' : 'Terminado.') || 'Sem status.'}*`)
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
