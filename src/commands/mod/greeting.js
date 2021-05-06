const Command = require('../../config/Command')

module.exports = class GreetingCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'greeting',
      aliases: ['saudação', 'saudacao', 'saudaçao'],
      description: 'Que tão eu mandar um bom dia, ou um boa noite no seu grupo eim eim?',
      example: 'saudação dia ativar',
      category: 'mod',
      groupOnly: true, // por enquanto
      groupAdmPermission: {
        bot: false,
        user: true
      },
      ownerOnly: false
    })
  }

  async execute ({ msg, doc, prefix, args }) {
    try {
      if (!args[0]) {
        return await msg.send(`Bem vindo ao menu de saudação! Se liga na lista:

*${prefix}saudação dia* (Para eu dar bom dia no grupo)
*${prefix}saudação tarde* (Para eu dar boa tarde no grupo)
*${prefix}saudação noite* (Para eu dar boa noite no grupo)

Para ativar qualquer um deles, você digita o comando dele no chat, e bota "ativar" no final, olha um exemplo ai:
*${prefix}saudação tarde ativar*

Viu como é fácil? Para desativar é a mesma coisa, só que invés de "ativar" você escreve "desativar" xD`, { reply: true })
      }

      const config = async (option, phrase) => {
        if (!args[1]) {
          return await msg.send(`Olaaa, faltou você especificar se você queria *ativar* ou *desativar*! 

Exemplo: *${prefix}saudação noite ativar*`, { reply: true })
        }

        switch (args[1]) {
          case 'ativar':
          case 'activate':
            doc.greeting[option] = true
            await doc.save()
            await msg.send(`Ok, todo dia eu irei dar ${phrase} então :)`, { reply: true })
            break
          case 'desativar':
          case 'disable':
            doc.greeting[option] = false
            await doc.save()
            await msg.send(`Ahhhh de boa, não irei dar ${phrase} mais então :C`, { reply: true })
            break
          default: await msg.send(`Não entendi o que você quis dizer, digite *${prefix}saudação* para ver as opções!`, { reply: true })
        }
      }
      switch (args[0]) {
        case 'dia':
        case 'manhã':
        case 'day':
        case 'morning':
          await config('morning', 'bom dia')
          break

        case 'tarde':
        case 'afternoon':
          await config('afternoon', 'boa tarde')
          break

        case 'noite':
        case 'night':
          await config('night', 'boa noite')
          break

        default: await msg.send(`Não entendi o que você quis dizer, digite *${prefix}saudação* para ver as opções!`, { reply: true })
      }
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
