const Command = require('../../config/Command')
const { createCanvas, loadImage } = require('canvas')

module.exports = class ShipCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'ship',
      aliases: ['casal', 'amor'],
      category: 'fun',
      description: 'Deixe eu calcular o amor de duas pessoas que você mencionar e ver se dá um casal perfeito!',
      example: 'ship @MrRexD @Demetrius',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false
    })
  }

  async execute ({ msg, args }) {
    try {
      if (args.includes('+')) args.splice(1, 1)
      if (!args[1]) return msg.send('Coloque o nome ou mencione duas pessoas para shipparem!')
      const shipOne = await msg.getContact(args[0].replace('@', '') + '@c.us')
      const shipTwo = await msg.getContact(args[1].replace('@', '') + '@c.us')

      const texts = {
        loveLevel: {
          0: 'Lamento, mas vai ser só fracasso se tentarem.',
          10: 'Xiii... Vai rolar não...',
          20: 'Sei não heim, as chances são mínimas.',
          30: 'Olha...... Vou deixar pra vocês decidirem kk',
          40: 'Se rolar uma conversa vai',
          50: 'Se eles tiverem um empurrãozinho vai..',
          60: 'Eh, até que vai...',
          70: 'Eles já estão juntos faz tempo!',
          80: 'Umas bitoquinhas podem rolar',
          90: 'Nasceram pra morrer juntos!',
          100: 'Já eram pra ser casal faz cota!'
        }
      }
      const randomName = (nameOne, nameTwo) => {
        nameOne = nameOne.slice(0, Math.random() * (nameOne.length - 2) + 2)
        nameTwo = nameTwo.slice(0, Math.random() * (nameTwo.length - 2) + 2)
        if ((Math.random() * (10 - 5) + 5) > 7) return nameTwo + nameOne.split('').reverse().join('')
        if ((Math.random() * (14 - 3) + 5) < 5) return nameOne + nameTwo.split('').reverse().join('')
        return nameOne + nameTwo
      }
      const approxeq = (a, b) => {
        return a - b < 10 && a - b >= 0
      }
      const coupleName = randomName(shipOne.username, shipTwo.username) + ' ❤'
      const loveXP = Math.floor(Math.random() * 100)
      let loveText
      let loveEmote
      for (const levels in texts.loveLevel) {
        if (approxeq(loveXP, levels)) {
          loveText = texts.loveLevel[levels]
          if (loveXP < 10) loveEmote = 'https://cdn.discordapp.com/emojis/749338180058349669.png'
          if (loveXP > 80) loveEmote = 'https://cdn.discordapp.com/emojis/749325027656073318.png'
          if (loveXP < 30 && loveXP > 10) loveEmote = 'https://cdn.discordapp.com/emojis/760132301731790878.png'
          if (loveXP > 50 && loveXP < 80) loveEmote = 'https://cdn.discordapp.com/emojis/760132761519652884.png'
          if (loveXP < 50 && loveXP > 30) loveEmote = 'https://cdn.discordapp.com/emojis/760142847352897556.png'
          break
        }
      }

      /*
     Aqui começa a parte do Canvas, é a primeira vez que eu uso, vi 999999 tutoriais na internet pra consegui fazer isso. Se você acha que pode melhorar esse código,
     por favor envie uma PR pois irá nos ajudar bastante :))))
    */

      // criando o canvas
      const canvas = createCanvas(1218, 761)
      const ctx = canvas.getContext('2d')
      const background = await loadImage('https://cdn.discordapp.com/attachments/685501923314368513/831923053411827762/shipadora.png')
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

      // Aqui começo a desenhar o XP, começando com o contorno.
      ctx.beginPath()
      ctx.lineWidth = 4
      ctx.strokeStyle = '#ffffff'
      ctx.globalAlpha = 0.2
      ctx.fillStyle = '#000000'
      ctx.fill()
      ctx.globalAlpha = 1
      ctx.strokeRect(200, 600, 770, 65)
      ctx.stroke()

      // Adicionando uma barra preta meio transparente na barra de XP pra ficar bonitim
      ctx.fillStyle = '#000000'
      ctx.globalAlpha = 0.4
      ctx.fillRect(200, 600, 770, 65, 430)

      // Esta é a barra do XP, que sobe conforme o valor do loveXP
      ctx.fillStyle = '#e677a7'
      ctx.globalAlpha = 0.6
      ctx.fillRect(200, 600, loveXP * 7.7, 65, 430)
      ctx.globalAlpha = 1

      // Aqui é a porcentagem que aparece na barra de XP
      ctx.font = '30px Arial'
      ctx.textAlign = 'center'
      ctx.fillStyle = '#ffffff'
      ctx.fillText(loveXP + '%', 600, 645)

      // Aqui e o texto de azar q fica de baixo da barra de XP
      ctx.textAlign = 'center'
      ctx.font = '40px Sans-Serif'
      ctx.fillText(loveText, 600, 730)

      // Aí pra baixo o Canvas irá carregar a imagem do emote, avatar do usuário 1 e do usuário 2, e vai setar nos seus devidos lugares no background.
      const lovemote = await loadImage(loveEmote)
      ctx.drawImage(lovemote, 470, 180, 275, 275)

      const shipOneAvatar = await loadImage(shipOne.avatar)
      ctx.drawImage(shipOneAvatar, 47, 99, 375, 375)

      const shipTwoAvatar = await loadImage(shipTwo.avatar)
      ctx.drawImage(shipTwoAvatar, 796, 99, 375, 375)

      // E por fim irá enviar a imagem pro remetente.
      await msg.sendImage(`data:image/png;base64,${canvas.toBuffer().toString('base64')}`, coupleName)
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
