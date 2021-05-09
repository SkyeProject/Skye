const { decryptMedia } = require('@open-wa/wa-decrypt')
const Command = require('../../config/Command')

module.exports = class StickerCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'sticker',
      aliases: ['figurinha', 's', 'fig'],
      category: 'utils',
      description: 'Deixe-me fazer um sticker com alguma foto/gif/vídeo que tu me mandar! (As vezes pode bugar!)',
      example: 'sticker <arquivo>',
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
      const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi
      if (args[0] && args[0].match(regex)) return await msg.sendSticker(args[0], false)
      if ((msg.isMedia === false && msg.quotedMsg === null) || (msg.isMedia === false && msg.quotedMsg.isMedia === false)) return await msg.send('Oops, mencione ou mande a imagem/gif/vídeo que tu quer e escreva no texto "!s"', { reply: true })
      const msgcrypt = msg.quotedMsg || msg
      await msg.send('Seu sticker está a caminho!!!', { reply: true })
      const mediaData = await decryptMedia(msgcrypt)
      const Base64 = `data:${msgcrypt.mimetype};base64,${mediaData.toString('base64')}`
      return await msg.sendSticker(Base64, msgcrypt.mimetype !== 'image/jpeg')
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
