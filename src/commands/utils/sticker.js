const Command = require('../../config/Command')
const { decryptMedia } = require('@open-wa/wa-decrypt')
const { createCanvas, loadImage } = require('canvas')
const { CanvasTextWrapper } = require('canvas-text-wrapper')

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

      const canvas = createCanvas(512, 512)
      const ctx = canvas.getContext('2d')

      const canvasText = (font, color, v) => {
        ctx.font = font
        ctx.fillStyle = color
        CanvasTextWrapper(canvas, args.join(' '), {
          sizeToFill: true,
          textAlign: 'center',
          verticalAlign: v
        })
      }

      if ((msg.isMedia === false && msg.quotedMsg === null) || (msg.isMedia === false && msg.quotedMsg.isMedia === false && msg.quotedMsg.type !== 'sticker')) {
        if (args[0]) {
          canvasText('100px Impact', '#d9dadb', 'middle')
          return await msg.sendSticker(`data:image/png;base64,${canvas.toBuffer().toString('base64')}`, false)
        }
        return await msg.send(`Oops, mencione ou mande a imagem/gif/vídeo que tu quer e escreva no texto "${prefix}s"`, { reply: true })
      }
      await msg.send('Seu sticker está a caminho!!!', { reply: true })
      const msgcrypt = msg.quotedMsg || msg
      let data = (await decryptMedia(msgcrypt)).toString('base64')
      if (args[0]) {
        const background = await loadImage(`data:${msgcrypt.mimetype};base64,${data}`)
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
        canvasText('100px Arial', '#effa23', 'bottom')
        data = canvas.toBuffer().toString('base64')
      }
      const Base64 = `data:${msgcrypt.mimetype};base64,${data}`
      return await msg.sendSticker(Base64, msgcrypt.mimetype === 'video/mp4')
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
