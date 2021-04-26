/*
 Ae Demetrius, agr tá fácil pra tu automatizar isso ai kkkkkk
*/
const Command = require('../../config/Command')

module.exports = class HelpCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'help',
      aliases: ['ajuda'],
      category: 'utils',
      onlyGroup: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false
    })
  }

  async execute ({ msg, prefix, args }) {
    try {
      const argss = args[0]
      if (argss === 'fun' || argss === 'diversao' || argss === 'diversão') {
        await msg.send(`*_SCHWAP COMMANDS: FUN_*
      

${prefix}amongus, among, impostor: Quem é o impostor?
${prefix}email, e: Mande um email anonimo pra alguem.
${prefix}hi, oi: Vou mandar um oi pra você. :3
${prefix}liberado, pode, podenogrupo: Isso está liberado no grupo/pv?
${prefix}neko, kwaii, gata: Mando uma neko pra você. ≧ω≦ 
${prefix}rainbow, lgbt, gay: Que tal dar uma colorida na sua foto?
${prefix}roll, dado: Sorteio um numéro aleatorio.
${prefix}ship, amor: Calcula o amor de duas pessoas. ≧﹏≦ 
${prefix}hug, abraco, abracar: Abrace alguem!
${prefix}tod, vddoudsf, verdadeoudesafio: Verdade ou desafio? Jogue com seus amigos!


Schwap 😎`)
      } else if (argss === 'utils' || argss === 'util') {
        await msg.send(`*_SCHWAP COMMANDS: UTILS_*
      

${prefix}help, ajuda: Lista dos meus comandos.
${prefix}calcular, math, c, calculator, calculadora: Resolve uma conta MATEMATICA.
${prefix}botinfo, infobot: vê mais informações sobre mim.
${prefix}contato, contact: pegue o contato dos meus desenvolvedores!
${prefix}ping, ms: Pong! Mostra o meu ping atual.
${prefix}sticker, s, figurinha: Faz uma figurinha com a foto/gif/video desejado.
${prefix}sugestao, ideia, sug: Mande uma sugestão que pode ajudar no desenvolvimento do bot, sem gracinha. (ban)


Schwap 😎`)
      } else if (argss === 'grupo' || argss === 'adm') {
        await msg.send(`*_SCHWAP COMMANDS: MOD_*
      

${prefix}ban, remover, remove, kick, 'expulsar', 'kick': Bane o engraçadinho do seu grupo.
${prefix}everyone, all, mention, mentionall: Menciona todos de um grupo.

(Em breve mais comando, tem uma ideia? Não deixe de nos contar no !sugestao (mensagem))
Schwap 😎`)
      } else {
        await msg.send(`*_SCHWAP COMMANDS_*


Use *${prefix}help fun ou diversao* para ter acesso a meus comandos de entreterimento.
Use *${prefix}help utils ou util* para ter acesso a meus comandos utils.
Use *${prefix}help grupo ou adm* para ter acesso a meus comandos de administrador (grupo).



Schwap 😎`)
      }
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
