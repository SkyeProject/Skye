const { zap, config } = require('../index')

zap.atizap.onAddedToGroup((group) => {
  zap.atizap.sendText(group.id, `🤗 | Olaa, muito obrigado por me adicionar! Utilize *${config.bot.prefix}help* para saber os meus comandos!!!`)
})
