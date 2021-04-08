const Commands = require("../config/commands");

module.exports = class calculadoraCommand extends Commands {
    constructor(zap) {
        super(zap, {
            name: 'calcular',
            aliases: ['calculator'],
            category: 'utils',
            ownerOnly: false
        })
    }
    execute({ msg}) {
        msg.send('EM DESENVOLVIMENTO (DEMETRIUS TA COM PREGUIÇA :3)')
}
}