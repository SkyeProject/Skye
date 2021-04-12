const { create, Client } = require('@open-wa/wa-automate')
const AtizapClient = require('./config/AtizapClient')
const config = require('../config.json')

create().then((atizap) => start(atizap))

const start = async (atizap = new Client()) => {
  const zap = new AtizapClient(atizap)
  zap.start({ events: './src/events/**/*.js', commands: './src/commands/**/*.js' })
  module.exports = {
    zap,
    config
  }
}
