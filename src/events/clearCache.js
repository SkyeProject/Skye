const { zap } = require('../index')

setInterval(async () => {
  const amountOfLoadedMessages = await zap.atizap.getAmountOfLoadedMessages()
  if (amountOfLoadedMessages >= 5000) {
    await zap.atizap.cutMsgCache()
  }
}, 5000 * 60)
