const Command = require('../../config/Command')

module.exports = class PremiumCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'pro',
      aliases: ['premium', 'skyesemlag', 'doar', 'skyepremium', 'donate'],
      category: 'misc',
      description: 'Adquira a versão premium da Skye!',
      example: '!premium',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: true,
      isWorking: true
    })
  }

  async execute ({ msg, prefix }) {
    try {
      await msg.send(`*Skye Premium ❤*

*Quais as vantagens de ter a Skye Premium?*

- Nós garantimos estabilidade total para o bot, então ela não irá ficar lagada que nem a versão Free;

- Você tem o direito de pedir um comando para nós fazer e você escolhe se quer que seja exclusivo do seu grupo ou não;

- Skye Premium tem mais de 10 comandos exclusivos que a Skye normal não possuí, sendo vários delas bastante úteis;

- Você tem 10 dias para pedir reembolso caso não goste.


Para adquirir, ver o preço, ou saber mais sobre a *Skye Premium*, contacte um dos meus desenvolvedores abaixo:

MrRexD: wa.me/553398530288
Demetrius: wa.me/5511951746304

Ou se preferir, pode testar ela entrando em nosso grupo! Use *${prefix}grupo*`)
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
