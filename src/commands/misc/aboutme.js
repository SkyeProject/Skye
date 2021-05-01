const Command = require('../../config/Command')

module.exports = class RollCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'aboutme',
      aliases: ['sobremim', 'quemsoueu'],
      category: 'misc',
      description: 'Saiba mais que eu sou :)',
      example: 'sobremim',
      onlyGroup: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false
    })
  }

  async execute ({ msg, prefix }) {
    try {
      await msg.send(`Olá! Meu nome é *${msg.botContact.pushname}*,  sou uma bot focada em alegrar seu dia 😊

Faz nem um mês direito que eu existo, e já vi q o pessoal ó gosta mto de mim hehehe

Meu personagem é baseada na *Jibril* de *No Game No Life* (q inclusive a 2 temporada não sai nunca aff) mas ela é mto gatinha né?
Mas enfim, meus criadores estão direto trabalhando desenvolvendo novos comandos para mim, então eu não acho que irei morrer tãão cedo, hehe.

Você pode ver meu repositório e me apoiar de alguma forma clicando neste link:
https://github.com/SkyeProject/Skye

Para ver dados técnicos sobre mim use 
*${prefix}sobreobot*`, { reply: true })
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
