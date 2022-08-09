const Command = require('../../config/Command')
const translate = require('@vitalets/google-translate-api')

module.exports = class TranslateCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'translate',
      aliases: ['tradutor', 'traduzir', 'googletradutor', 't'],
      category: 'utils',
      description: 'Traduza uma palavra',
      example: 'traduzir pt MrRexD is very beautiful',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false,
      isWorking: true
    })
  }

  async execute ({ msg, args, prefix }) {
    try {
      const language = args[0]
      const languages = 'af, sq, am, ar, hy, az, eu, be, bn, bs, bg, ca, ceb, ny, zh-CN, zh-TW, co, hr, cs, da, nl, en, eo, et, tl, fi, fr, fy, gl, ka, de, el, gu, ht, ha, haw, he, iw, hi, hmn, hu, is, ig, id, ga, it, ja, jw, kn, kk, km, ko, ku, ky, lo, la, lv, lt, lb, mk, mg, ms, ml, mt, mi, mr, mn, my, ne, no, ps, fa, pl, pt, pa, ro, ru, sm, gd, sr, st, sn, sd, si, sk, sl, so, es, su, sw, sv, tg, ta, te, th, tr, uk, ur, uz, vi, cy, xh, yi, yo, zu'

      if (!languages.includes(language)) {
        if (language === 'linguagens' || language === 'languages') return await msg.send(`*Todos os idiomas disponíveis:*\n\n${languages}`)
        return await msg.send(`Não encontrei este idioma que você disse! 🤔

Para traduzir você faz assim 
*${prefix}traduzir <linguagem abreviada> <seu texto aqui>*

Exemplo:
*${prefix}traduzir pt MrRexD is beautiful*
Aí você está traduzindo uma frase em inglês para português, e português abreviado é pt.

Agora um exemplo de como traduzir uma frase para o inglês:
*${prefix}traduzir en MrRexD é um cara muito bonito*
Como você está vendo, eu utilizei o "en", pois en é a abreviação de english.

Para ver todas as linguágens disponíveis, use *${prefix}traduzir linguagens*`)
      }
      if (!args[1]) return msg.send('Você não disse nada para traduzir!', { reply: true })
      this.removeItem(args, args[0])
      const t = await translate(args.join(' '), { to: language })
      msg.send(`🗺️ | ${t.text}`, { reply: true })
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
