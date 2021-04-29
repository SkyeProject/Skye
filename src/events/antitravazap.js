/*
        Fui obrigado a fazer uma espécie de anti travazap, pois travaram o zap do bot ontem 😭😭😭
        Não sei se é eficiente, mas tá ai.
*/
const { zap, config } = require('../index')
const delay = new Set()
const mongocreate = require('../config/modules/database/mongocreate')

zap.atizap.onMessage(async (msg) => {
  if (msg.isGroupMsg) return
  msg.content = msg.caption || msg.body
  for (const user of delay) {
    if (user.number === msg.from) {
      const t = Date.now()
      if (t - user.t <= 3000 && msg.content.length >= 100) user.warns++
      user.t = t
      if (user.warns === 4) {
        const zapNumber = []
        Object.entries(config.devs.contacts).forEach(dev => {
          zapNumber.push('wa.me/' + dev[1])
        })
        await zap.atizap.sendText(msg.from, `===  *ANTI TRAVA ALERT* ===
você foi bloqueado por suspeitas de travazap, se o block foi injusto, favor contatar um dos nossos donos.\n\n` + zapNumber.join('\n'))
        await zap.atizap.contactBlock(msg.from)
        await zap.atizap.deleteChat(msg.from)
        let doc = await zap.mongo.Users.findById(msg.from)
        if (!doc) doc = await mongocreate.createUserDoc()
        doc.status.isBanned = true
        doc.status.reason = 'Tentou me mandar trava.'
        await doc.save()
        delay.delete(user)
      }
      return
    }
  }
  delay.add({
    number: msg.from,
    t: Date.now(),
    warns: 0
  })
})
