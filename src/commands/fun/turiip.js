const editly = require('editly')
const fs = require('fs')
const http = require('https')
const Command = require('../../config/Command')

module.exports = class TuriipCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'turiip',
      aliases: ['ipip', 'cantar'],
      category: 'fun',
      description: 'Cante o classico',
      example: 'turiip',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false,
      isWorking: true
    })
  }

  async execute ({ msg, args }) {
    try {
      msg.send('Aguarde enquanto eu faço o seu video!!! (Isso pode demorar um pouco...)', { reply: true })
      const user = await msg.getContact(args[0] || msg.sender.id)
      const download = function (url, outPath, end) {
        const file = fs.createWriteStream(outPath)
        http.get(url, function (response) {
          response.pipe(file)
          file.on('finish', function () {
            file.close(end)
          })
        })
      }
      download(user.avatar, './src/config/modules/API/assets/avatar.png')
      const outPathVideo = './src/config/modules/API/assets/video.mp4'
      const editSpecJson = {
        outPath: outPathVideo,
        width: 800,
        keepSourceAudio: true,
        clips: [
          {
            layers: [
              { type: 'video', path: './src/config/modules/API/assets/templateVideo.mp4' },
              { type: 'image-overlay', path: './src/config/modules/API/assets/avatar.png', position: { x: 0.5, y: 0.3, originX: 'left' }, start: 2.4, width: 0.3 },
              { type: 'audio', path: './src/config/modules/API/assets/audio.m4a', mixVolume: 10 }
            ]
          }
        ]
      }
      await editly(editSpecJson)
      await this.zap.atizap.sendFile(msg.from, outPathVideo, 'turiip', 'Chorei com esta bela cantoria 😭')
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
