const Command = require('../../config/Command')
const pm2 = require('pm2')
const sleep = require('sleep-promise')

module.exports = class RestartCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'restart',
      aliases: ['reiniciarbot'],
      category: 'dev',
      description: 'Reinicie o bot.',
      example: 'restart',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: true
    })
  }

  async execute ({ msg }) {
    try {
      await msg.send('Beleza, reiniciando bot...')
      global.restart = true
      await sleep(10000)
      pm2.restart('.')
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
