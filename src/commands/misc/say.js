const Command = require('../../config/Command')
const googleTTS = require('google-tts-api')

module.exports = class SayCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'say',
      aliases: ['falar', 'diga', 'tts', 'skye', 'skyefalacomigopfv'],
      category: 'misc',
      description: 'Diga alguma coisa pra mim falar :)',
      example: 'say opa fala galerinha',
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
      if (!args[0]) return await msg.send('Você não me disse algo pra falar!', { reply: true })
      let message = args.join(' ')
      if (message.length > 200) return await msg.send('Olá, você mandou um texto muito grande! Eu só consigo falar até 200 caracteres!', { reply: true })

      const users = this.getAllMentionedMembers(args)
      for (let number of users) {
        number = number.replace('@c.us', '')
        const user = await msg.getContact(number)
        message = message.replace('@' + number, user.username)
      }
      const audio = await googleTTS.getAudioBase64(message, { lang: 'pt' })
      await this.zap.atizap.sendPtt(msg.from, `data:audio/mp3;base64,${audio}`, msg.id)
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
