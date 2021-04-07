const Commands = require("../config/commands");
const client = require('nekos.life');
const neko = new client();

async function test() {
    console.log(await neko.sfw.hug());
  }
   
  test();
  

module.exports = class CommandSay extends Commands {
    constructor(zap) {
        super(zap, {
            name: 'loli',
            aliases: ['neko'],
            category: 'test',
            ownerOnly: false
        })
    }
    execute({ msg }) {
        msg.file('')
    }
}; 
 
