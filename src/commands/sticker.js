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
    if (msg.isMedia === false) return msg.send('Oops, mande a imagem/gif que tu quer e escreva no texto "!s"')
    const mediaData = await decryptMedia(msg)
    const Base64 = `data:${msg.mimetype};base64,${mediaData.toString('base64')}`
    msg.send('Seu sticker está a caminho!!!')
    return msg.sendSticker(Base64, msg.mimetype !== 'image/jpeg')
  }
}
