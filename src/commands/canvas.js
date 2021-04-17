const Commands = require('../config/commands')
const Canvacord = require('canvacord')
module.exports = class CanvasCommand extends Commands {
  constructor (zap) {
    super(zap, {
      name: 'trige',
      aliases: ['t'],
      category: 'utils',
      ownerOnly: true
    })
  }

  async execute ({ msg }) {
    //const shipOne = await msg.getContact(args[0].replace('@', '') + '@c.us') ISSO É PRA PEGAR A FOTO DO USUARIO MENCIONADO 

    if(!msg.isGroupMsg){
    const user = await msg.getContact(msg.from, msg.getSenderNumber())
    const teste = await Canvacord.Canvas.rainbow(user.avatar);
    msg.sendImage(`data:image/png;base64,${teste.toString('base64')}`)
    } else{
      const user1 = await msg.sender.profilePicThumbObj.eurl
      console.log(msg.sender.profilePicThumbObj.eurl)
      const teste1 = await Canvacord.Canvas.rainbow(user1);
    msg.sendImage(`data:image/png;base64,${teste1.toString('base64')}`)
    }
  } 
}