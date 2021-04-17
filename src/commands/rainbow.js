const Commands = require('../config/commands')
const Canvacord = require('canvacord')
module.exports = class CanvasCommand extends Commands {
  constructor(zap) {
    super(zap, {
      name: 'rainbow',
      aliases: ['lgbt', 'gay'],
      category: 'fun',
      ownerOnly: false
    })
  }

  async execute({ msg, args }) {
    try {
      if (!args[0]) {
        const user = await msg.sender.profilePicThumbObj.eurl
        const rainbow = await Canvacord.Canvas.rainbow(user);
        msg.sendImage(`data:image/png;base64,${rainbow.toString('base64')}`)
      } else {
        const userMention = await msg.getContact(args[0].replace('@', '') + '@c.us')
        const rainbow = await Canvacord.Canvas.rainbow(userMention.avatar);
        msg.sendImage(`data:image/png;base64,${rainbow.toString('base64')}`)
      }
    } catch (error) {
      msg.send(`Algo deu errado, talvez você não tem foto ou ela esta privada. Se não é nenhum dos dois, peça para alguem fazer pra você, se o erro ainda insistir, contate o +5511951746304, Infelizmente a API do whatsapp é um lixo e as vezes me impede de pegar a foto de alguns... :(\n\n\n${error}`)
    }
  }
}
