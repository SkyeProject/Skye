const Command = require('../../config/Command')
const gis = require('g-i-s')
const { decryptMedia } = require('@open-wa/wa-decrypt')

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
      if (!args[0]) {
        if (msg.quotedMsg && msg.quotedMsg.type === 'sticker') {
          const base64 = (await decryptMedia(msg.quotedMsg)).toString('base64')
          return await msg.sendImage(`data:${msg.quotedMsg.mimetype};base64,${base64}`)
        } else return await msg.send('Você não citou algo! (Se mencionou uma imagem, eu não irei mandar novamente porque né)')
      }
      const userID = (this.getAllMentionedMembers(args, { limit: 1, str: ['eu', 'me'], number: msg.sender.id }))[0]
      if (userID) {
        const user = await msg.getContact(userID)
        return await msg.sendImage(user.avatar, '🌟 | Foto de ' + '*' + user.username + '*')
      }
      gis(args.join(' '), async (err, results) => {
        if (err || !results[0]) return await msg.send('Não encontrei nenhum resultado.', { reply: true })
        while (true) {
          const link = (this.getRandomValueInArray(results, 1))[0]
          const res = await this.zap.deepai.callStandardApi('nsfw-detector', { image: link.url }).catch(e => { })
          if (res) {
            if (res.output.nsfw_score >= 0.40) return await msg.send('Detectei conteúdo *nsfw* na imagem, procure por outra coisa.', { reply: true })
            return await msg.sendImage(link.url, '*' + args.join(' ') + '*')
          }
        }
      })
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
