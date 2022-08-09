const Command = require('../../config/Command')

module.exports = class AboutmeCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'aboutme',
      aliases: ['sobremim', 'quemsoueu'],
      category: 'misc',
      description: 'Saiba mais que eu sou :)',
      example: 'sobremim',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false,
      isWorking: true
    })
  }

  async execute ({ msg, prefix }) {
    try {
      await msg.send(`Olá! Meu nome é *${msg.botContact.pushname}*, sou uma bot focada em alegrar seu dia 😊

Meu personagem é baseada na *Jibril* de *No Game No Life* (q inclusive a 2 temporada não sai nunca aff) mas ela é mto gatinha né?
Mas enfim, meus criadores estão direto trabalhando desenvolvendo novos comandos para mim, então eu não acho que irei morrer tãão cedo, hehe.

Você pode ver meu repositório e me apoiar de alguma forma clicando neste link:
https://github.com/SkyeProject/Skye

Para ver dados técnicos sobre mim use 
*${prefix}sobreobot*`, { link: true })
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
