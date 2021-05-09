const Command = require('../../config/Command')
const gis = require('g-i-s')

module.exports = class ImageCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'image',
      aliases: ['imagem', 'google-imagem', 'img'],
      description: 'Pesquise por uma imagem no Google.',
      example: 'imagem menina bonita',
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
      if (!args[0]) return await msg.send('Você não citou uma imagem!')
      gis(args.join(' '), async (err, results) => {
        if (err || !results[0]) return await msg.send('Não encontrei nenhum resultado.', { reply: true })
        for (const result of results) {
          const res = await this.zap.deepai.callStandardApi('nsfw-detector', { image: result.url }).catch(e => {})
          if (res) {
            if (res.output.nsfw_score >= 0.40) return await msg.send('Foi detectado conteúdo *nsfw* na imagem, portanto eu não irei mostrá-la!', { reply: true })
            await msg.sendImage(result.url, '*' + args.join(' ') + '*')
            break
          }
        }
      })
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
