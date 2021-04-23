const Commands = require('../config/commands')

module.exports = class HelpCommand extends Commands {
  constructor (zap) {
    super(zap, {
      name: 'help',
      aliases: ['ajuda'],
      category: 'utils',
      ownerOnly: false
    })
  }
    async execute ({ msg, prefix, args }) {
    let argss = args[0]
    if(argss === 'fun' || argss === 'diversao' || argss === 'diversão'){
      await msg.send(`*_SCHWAP COMMANDS: FUN_*
      

${prefix}amongus, among, impostor: Quem é o impostor?
${prefix}email, e: Mande um email anonimo pra alguem.
${prefix}hi, oi: Vou mandar um oi pra você. :3
${prefix}liberado, pode, podenogrupo: Isso está liberado no grupo/pv?
${prefix}neko, kwaii, gata: Mando uma neko pra você. ≧ω≦ 
${prefix}rainbow, lgbt, gay: Que tal dar uma colorida na sua foto?
${prefix}roll, dado: Sorteio um numéro aleatorio.
${prefix}ship, amor: Calcula o amor de duas pessoas. ≧﹏≦ 


Schwap 😎`)
    }else if(argss === 'utils' || argss === 'util'){
      await msg.send(`*_SCHWAP COMMANDS: UTILS_*
      

${prefix}help, ajuda: Lista dos meus comandos.
${prefix}calcular, math, c, calculator, calculadora: Resolve uma conta MATEMATICA.
${prefix}ping, ms: Pong! Mostra o ping do bot.
${prefix}sticker, s, figurinha: Faz uma figurinha com a foto/gif/video desejado.
${prefix}sugestao, ideia, sug: Mande uma sugestão que pode ajudar no desenvolvimento do bot, sem gracinha. (ban)


Schwap 😎`)
    }else if(argss === 'grupo' || argss === 'mod'){
      await msg.send(`*_SCHWAP COMMANDS: MOD_*
      

${prefix}everyone, all, mention, mentionall: Menciona todos de um grupo.

(Em breve mais comando, tem uma ideia? Não deixe de nos contar no !sugestao (mensagem))
Schwap 😎`)
    }else if(argss === 'dev'){
      await msg.send(`*_SCHWAP COMMANDS: DEV_*
      

${prefix}reload, r, reiniciar: Reinicia um comando. (Somente os desenvolvedores do bot pode usar)


Schwap 😎`)
    } else {
      await msg.send(`*_SCHWAP COMMANDS_*


Use *${prefix}help fun ou ${prefix}diversao* para ter acesso a meus comandos de entreterimento.
Use *${prefix}help utils ou util* para ter acesso a meus comandos utils.
Use *${prefix}help grupo ou adm* para ter acesso a meus comandos de administrador (grupo).
Use *${prefix}help dev* para ter acesso a comandos para os meus desenvolvedores!



Schwap 😎`)
    }
  }
}