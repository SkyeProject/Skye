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
        const link = args[0]
        this.removeItem(args, args[0])
        return await msg.sendSticker(link, false, args[0] ? args.join(' ') : undefined)
      }

      const canvas = createCanvas(512, 512)
      const ctx = canvas.getContext('2d')

      const canvasText = (font, color, lineWidth, v) => {
        const text = args.join(' ')
        if (text.length >= 100) lineWidth = 0
        ctx.fillStyle = color
        ctx.lineWidth = lineWidth
        CanvasTextWrapper(canvas, text, {
          sizeToFill: true,
          font: font,
          textAlign: 'center',
          strokeText: !(text.length >= 60),
          verticalAlign: v
        })
      }

      if ((!msg.isMedia && !msg.quotedMsg) || (!msg.isMedia && !msg.quotedMsg.isMedia && msg.quotedMsg.type !== 'sticker')) {
        if (args[0]) {
          await msg.send('Seu sticker está a caminho!!!', { reply: true })
          canvasText('50px Impact', '#ffffff', 5, 'middle')
          return await msg.sendSticker(`data:image/png;base64,${canvas.toBuffer().toString('base64')}`, false)
        }
        return await msg.send(`Oops, mencione ou mande a imagem/gif/vídeo que tu quer e escreva no texto "${prefix}s"`, { reply: true })
      }
      await msg.send('Seu sticker está a caminho!!!', { reply: true })
      const msgcrypt = msg.quotedMsg && (msg.quotedMsg.isMedia || msg.quotedMsg.type === 'sticker') ? msg.quotedMsg : msg
      let data = (await decryptMedia(msgcrypt)).toString('base64')
      if (args[0]) {
        const background = await loadImage(`data:${msgcrypt.mimetype};base64,${data}`)
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
        canvasText('50px Verdana', '#ffffff', 2, 'bottom')
        data = canvas.toBuffer().toString('base64')
      }
      return await msg.sendSticker(`data:${msgcrypt.mimetype};base64,${data}`, msgcrypt.mimetype === 'video/mp4')
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
