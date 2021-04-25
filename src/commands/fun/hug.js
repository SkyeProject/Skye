/* eslint-disable */

const superagent = require('superagent')
const Commands = require('../../config/commands')

module.exports = class HugCommand extends Commands {
  constructor (zap) {
    super(zap, {
      name: 'hug',
      aliases: ['abraçar', 'abraço', 'abraco', 'abracar'],
      category: 'fun',
      onlyGroup: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false
    })
  }

  async execute ({ msg, args }) {
    try {
        const nekoimage = (await superagent.get('https://nekos.life/api/v2/img/hug')).body
        let me = msg.sender.pushname
        if(!args[0]){
            msg.send(`Abraçei bem forte o ${me}! ❤️`)
            return this.zap.atizap.sendImageAsSticker(msg.from, nekoimage.url, null)
        }else {
        let args0 = await msg.getContact(args[0].replace('@', ''))
        msg.send(`${me} deu aquele abraço em ${args0.username}`)
        this.zap.atizap.sendImageAsSticker(msg.from, nekoimage.url, null)
    }
    } catch (err) {
      msg.zapFail(err)
    }
  }
}
