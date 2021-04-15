const { decryptMedia } = require('@open-wa/wa-decrypt')
const Commands = require('../config/commands')

module.exports = class StickerCommand extends Commands {
  constructor (zap) {
    super(zap, {
      name: 'sticker',
      aliases: ['s', 'figurinha'],
      category: 'utils',
      ownerOnly: false
    })
  }

  async execute ({ msg }) {
    if (msg.isMedia === false && !msg.quotedMsg) return msg.send('Oops, mencione ou mande a imagem/gif/vídeo que tu quer e escreva no texto "!s"')
    const msgcrypt = msg.quotedMsg || msg
    const mediaData = await decryptMedia(msgcrypt)
    const Base64 = `data:${msgcrypt.mimetype};base64,${mediaData.toString('base64')}`
    msg.send('Seu sticker está a caminho!!!')
    return msg.sendSticker(Base64, msgcrypt.mimetype !== 'image/jpeg')
  }
}
