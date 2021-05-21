const Command = require('../../config/Command')
const { decryptMedia } = require('@open-wa/wa-decrypt')

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

  async execute ({ msg, args, prefix }) {
    try {
      const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi
      if (args[0] && args[0].match(regex)) {
        await msg.send('Seu sticker está a caminho!!!', { reply: true })
        return await msg.sendSticker(args[0], false)
      }

      if ((msg.isMedia === false && msg.quotedMsg === null) || (msg.isMedia === false && msg.quotedMsg.isMedia === false && msg.quotedMsg.type !== 'sticker')) return await msg.send(`Oops, mencione ou mande a imagem/gif/vídeo que tu quer e escreva no texto "${prefix}s"`, { reply: true })
      await msg.send('Seu sticker está a caminho!!!', { reply: true })
      const msgcrypt = msg.quotedMsg || msg
      const mediaData = await decryptMedia(msgcrypt)
      const Base64 = `data:${msgcrypt.mimetype};base64,${mediaData.toString('base64')}`
      return await msg.sendSticker(Base64, msgcrypt.mimetype === 'video/mp4')
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
