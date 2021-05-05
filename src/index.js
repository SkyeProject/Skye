const { create, Client } = require('@open-wa/wa-automate')
const AtizapClient = require('./config/AtizapClient')
const config = require('../config.json')
const pm2 = require('pm2')
const sleep = require('sleep-promise')

create(config.bot.settings).then((atizap) => start(atizap))

const start = async (atizap = new Client()) => {
  const zap = new AtizapClient(atizap)
  zap.start({ events: './src/events/**/*.js', commands: './src/commands/**/*.js' })
  module.exports = {
    zap,
    config
  }
}

pm2.connect((err) => {
  if (err) throw err
  setInterval(async () => {
    global.restart = true
    await sleep(20000) // sleep por 20 segundos pra galera vê q vai reiniciar
    pm2.restart('.') // PM2 irá restartar o bot
  }, 60000 * 60) // 1 hora de espera
})
