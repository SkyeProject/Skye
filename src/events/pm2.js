const pm2 = require('pm2')
const { config } = require('../')
const sleep = require('sleep-promise')

if (config.bot.pm2.enable === true) {
  pm2.connect((err) => {
    if (err) throw err
    setInterval(async () => {
      global.restart = true
      await sleep(10000)
      console.log('Reiniciando o bot...')
      pm2.restart('.')
    }, config.bot.pm2.restartTime * 60)
  })
}
