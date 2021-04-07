
const venom = require("venom-bot");
const Collection = require("object-collection");

const glob = require("glob");
const path = require("path");

// let Client
// venom.create().then((client) => { Client = client})

module.exports = class AtizapClient {
    constructor(options) {
        this.commands = new Collection();
        this.aliases = new Collection();
        this.venom = venom
    }

    loadEvents(options) {
        glob(options, function (err, files) {
            if (err) console.warn(err)
            files.forEach((file, i) => {
                require(path.resolve(file));
                if (i === 0) console.log(`Carregando todos os eventos...`)
                console.log(i + 1, `| Evento ${file} carregado!`)
            });
        })
    }

    loadCommands(options) {
        glob.sync(options).forEach((file, i) => {
            const cmds = require(path.resolve(file))
            const cmd = new cmds(this)
            this.commands.set(cmd.config.name, cmd)
            if (i === 0) console.log(`Carregando todos os comandos...`)
            console.log(i + 1, `| Comando ${cmd.config.name} carregado!`)
            cmd.config.aliases.forEach(alias => {
                this.aliases.set(alias, cmd.config.name)
            });
        })

    }
}
