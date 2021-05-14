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
      ownerOnly: false
    })
  }

  async execute ({ msg }) {
    try {
      await msg.send(`A Skye cresceu muito nos últimos dias, e por causa disso ela ficou muito lenta por causa da quantidades de grupo e usuários que ela tem que lidar toda hora.
Então a gente teve uma ideia de abrir uma versão Premium da Skye, aonde nós teriamos controle total dos grupo e garantiriamos estabilidade para ela. E também pra nós fazer uns comandos exclusivos hihi

*Qual a vantagem de ter a Skye Premium?*
- Nós garantimos estabilidade total para o bot, então ela não irá ficar lagada que nem a versão Free;
- Você tem o direito de pedir um comando para nós fazer e você escolhe se quer que seja exclusivo do seu grupo ou não;
- Você tem 10 dias para pedir reembolso caso não goste.

Para garantir a versão *Premium* basta contatar um dos meus desenvolvedores abaixo:

MrRexD: wa.me/553398530288
Demetrius: wa.me/5511951746304`)
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
