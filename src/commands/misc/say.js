const Command = require('../../config/Command')
const googleTTS = require('google-tts-api')

module.exports = class SayCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'say',
      aliases: ['falar', 'diga', 'tts', 'skye', 'skyefalacomigopfv'],
      category: 'misc',
      description: 'Diga alguma coisa pra mim falar :)',
      example: 'waifu',
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
      if (!args[0]) return await msg.send('Você não me disse algo pra falar!', { reply: true })
      if (args.join(' ').length > 200) return await msg.send('Olá, você mandou um texto muito grande! Eu só consigo falar até 200 caracteres!', { reply: true })

      const message = await googleTTS.getAudioBase64(args.join(' '), { lang: 'pt' })
      await this.zap.atizap.sendPtt(msg.from, `data:audio/mp3;base64,${message}`, msg.id)
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
