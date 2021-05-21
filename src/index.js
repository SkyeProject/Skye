const { create, Client } = require('@open-wa/wa-automate')
const AtizapClient = require('./config/AtizapClient')
const config = require('../config.json')
const pm2 = require('./config/pm2')

if (config.bot.pm2.enable === true) pm2.start(config.bot.pm2.restartTime)

create(config.bot.settings).then((atizap) => start(atizap)).catch(err => {
  console.error(err)
  return pm2.restart()
})

const start = async (atizap = new Client()) => {
  const zap = new AtizapClient(atizap)
  zap.start({ events: './src/events/**/*.js', commands: './src/commands/**/*.js' })
  module.exports = {
    zap,
    config
  }
}
