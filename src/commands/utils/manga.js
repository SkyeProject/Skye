const Command = require('../../config/Command')
const Kitsu = require('kitsu')
const kitsu = new Kitsu()
const translate = require('@vitalets/google-translate-api')

module.exports = class MangaCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'manga',
      aliases: ['mangá', 'otangu', 'literaturajaponesa'],
      category: 'utils',
      description: 'Pesquise os seus mangás favoritoos',
      example: 'mangá attack on titan',
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
      if (!args[0]) return msg.send('Você não digitou o nome de nenhum mangá!!!', { reply: true })
      const res = await kitsu.get('manga?filter[text]=' + args.join(' ') + '&page[limit]=5').catch(e => {})
      const dataRes = res.data[0]
      if (!dataRes) return msg.send('Não achei o mangá que você mencionou! 😥')

      const image = dataRes.coverImage || dataRes.posterImage
      await msg.sendImage(image.original, `*${dataRes.canonicalTitle || 'Sem título'}*

${(await translate(dataRes.synopsis || 'Sem descrição.', { to: 'pt' })).text}

Avaliação média: *${dataRes.averageRating || 'Sem avaliação média.'}*

Classificação etária: *${dataRes.ageRatingGuide || 'Sem classificação etária.'}*

Capítulos: *${dataRes.chapterCount || 'Em lançamento'}*

Status: *${(dataRes.status === 'current' ? 'Em lançamento.' : 'Terminado.') || 'Sem status.'}*`)
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
