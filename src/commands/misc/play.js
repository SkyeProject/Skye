const Command = require('../../config/Command')
const superagent = require('superagent')
const googleIt = require('google-it')

module.exports = class PlayCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'play',
      aliases: ['tocar', 'música', 'musica', 'musicayoutube', 'p'],
      category: 'misc',
      description: 'Baixe música do youtube.',
      example: 'play galinha pintadinha',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false,
      isWorking: false
    })
  }

  async execute ({ msg, args, prefix }) {
    try {
      if (!args[0]) {
        return await msg.send(`Oiii, digite o nome de alguma música para mim pesquisar no Youtube e baixar para você!
Exemplo:
*${prefix}play abertura jojo*`, true)
      }
      await msg.send('Sua música já está vindo!! :)', { reply: true })

      googleIt({ query: `${args.join(' ')} site:youtube.com/watch`, 'no-display': 1 }).then(async results => {
        if (!results[0]) return msg.send('Não encontrei a música!!', { reply: true })
        const data = await superagent.post('https://st4rz.herokuapp.com/api/yta2?url=' + results[0].link)
        if (data.body.status !== 200) return await msg.send('*A música que você mandou é muito grande, ou muito pesado, ou não está disponível!*', { reply: true })
        await this.zap.atizap.sendPtt(msg.from, data.body.result, msg.id)
      })
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
