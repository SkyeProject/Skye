const { random } = require("mathjs");
const Commands = require("../config/commands");

module.exports = class ShipCommand extends Commands {
    constructor(zap) {
        super(zap, {
            name: 'ship',
            aliases: ['amor'],
            category: 'test',
            ownerOnly: false
        })
    }
    async execute({ msg, args }) {
        let desc;
        let nothing = 'Coloque o nome das pessoas que querem shippar!'
        let nomeship1 = args[0]
        let nomeship2 = args[1]
        let shipname = nomeship1.slice(0, Math.random() * 10)
        let shipname1 = nomeship2.slice(1, Math.random() * 10)
        const amor = Math.floor(Math.random() * 100);
        const loveIndex = Math.floor(amor / 10);
        const loveLevel = "█".repeat(loveIndex) + ".".repeat(10 - loveIndex);

        if (args.length == 2) {
            if (amor > 90) {
                desc = (`*Hmmm, será que vai ou não?*\n\n*${args[0]}* + *${args[1]}*\n\n*${shipname}${shipname1}*\n\n*Nasceram pra morrer juntos!*`);
            } else if (amor >= 70) {
                desc = (`*Hmmm, será que vai ou não?*\n\n*${args[0]}* + *${args[1]}*\n\n*${shipname}${shipname1}*\n\n*Eles já estão juntos faz tempo!*`);
            } else if (amor >= 45) {
                desc = (`*Hmmm, será que vai ou não?*\n\n*${args[0]}* + *${args[1]}*\n\n*${shipname}${shipname1}*\n\n*Só daria certo se o* *${args[1]}* *querer...*`);
            } else {
                desc = (`*Hmmm, será que vai ou não?*\n\n*${args[0]}* + *${args[1]}*\n\n*${shipname}${shipname1}*\n\n*Xiii... Vai rolar não...*`);
            }
            await msg.send(`${desc}\n\n${loveLevel}`)

        } else return msg.send(nothing)
    }
}