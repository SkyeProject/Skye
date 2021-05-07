const { Collection } = require('@open-wa/wa-automate/dist/structures/Collector')
const glob = require('glob')
const path = require('path')
const Spinnies = require('spinnies')
const MongoDB = require('./modules/database/Mongodb')
const { mongouri } = require('../../config.json')

const spinnies = new Spinnies({ color: 'red', succeedColor: 'blue' })

module.exports = class AtizapClient {
  constructor (atizap) {
    this.atizap = atizap
    this.inGame = new Set()
    this.mongo = new MongoDB(mongouri)
    this.commands = new Collection()
    this.aliases = new Collection()
  }

  start ({ events, commands }) {
    spinnies.add('starting', { text: 'Iniciando o bot...' })

    glob(events, (err, files) => {
      spinnies.add('events', { text: 'Carregando eventos...' })
      if (err) spinnies.fail('events', { text: err })
      files.forEach((file, i) => {
        require(path.resolve(file))
        spinnies.update('events', { text: `Evento ${file} carregado!` })
        i++
        if (files.length === i) spinnies.succeed('events', { text: `${i} Eventos foram carregados` })
      })
    })

    glob(commands, (err, files) => {
      spinnies.add('commands', { text: 'Carregando comandos...' })
      if (err) spinnies.fail('commands', { text: err })
      files.forEach((file, i) => {
        if (file === './src/commands/template.js') return
        const Cm = require(path.resolve(file))
        const cmd = new Cm(this)
        this.commands.set(cmd.config.name, cmd)
        cmd.config.aliases.forEach((alias) => {
          this.aliases.set(alias, cmd.config.name)
        })
        i++
        if (files.length === i) {
          spinnies.succeed('commands', { text: `${i - 1} Comandos foram carregados` })
          spinnies.succeed('starting', { text: 'Bot está pronto' })
        }
      })
    })
  }
}
