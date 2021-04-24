const sleep = require('sleep-promise')
const { zap, config } = require('../index')

zap.atizap.onMessage(async (msg) => {
  msg.content = msg.caption || msg.body
  if (!msg.content) return

  const { prefix } = config.bot
  if (!msg.content.toLowerCase().startsWith(prefix)) return

  const args = msg.content.slice(prefix.length).trim().split(/ +/)
  const cmd = args.shift().toLowerCase()

  if (!zap.commands.has(cmd) && !zap.aliases.has(cmd)) return

  const botContact = await zap.atizap.getMe()

  msg.send = async (message, deleteMessage) => {
    zap.atizap.reply(msg.from, message, msg.id).then(async (m) => {
      if (deleteMessage) {
        await sleep(deleteMessage)
        zap.atizap.deleteMessage(msg.from, [m])
      }
    })
  }

  msg.sendImage = (image, message) => {
    zap.atizap.sendImage(msg.from, image, 'file', message)
  }

  msg.sendSticker = (Base64, boolean) => {
    const errortext = 'Não foi possível transformar o arquivo por um sticker. Se por acaso você estiver enviando um vídeo, na hora de enviar selecione a opção "gif".\nhttps://is.gd/aJNpv7'
    switch (boolean) {
      case false:
        zap.atizap.sendImageAsSticker(msg.from, Base64, { author: `+${botContact.me.user}`, pack: botContact.pushname, keepScale: true })
          .catch(e => { msg.zapFail(errortext + '\n\n' + e) })
        break

      case true:
        zap.atizap.sendMp4AsSticker(msg.from, Base64, null, { author: `+${botContact.me.user}`, pack: botContact.pushname, startTime: '00:00:00.0', endTime: '00:00:06.0' })
          .catch(e => { msg.zapFail(errortext + '\n\n' + e) })
        break
    }
  }

  msg.getSenderNumber = () => {
    return msg.author ? msg.author.replace('@c.us', '') : msg.from.replace('@c.us', '')
  }

  msg.getContact = async (number) => {
    const contact = await zap.atizap.getContact(number)
    const noPic = 'https://cdn.discordapp.com/attachments/685501923314368513/831934776948555826/nopic.png'
    if (!contact) {
      const alternative = {
        username: number.replace('@c.us', ''),
        avatar: noPic
      }
      return alternative
    }
    const contactPic = await zap.atizap.getProfilePicFromServer(number) || noPic
    const user = {
      username: contact.pushname || contact.formattedName,
      number: contact.id,
      avatar: contactPic,
      isMe: contact.isMe,
      isMyContact: contact.isMyContact
    }
    if (user.isMe) user.username = botContact.pushname
    return user
  }

  msg.zapFail = (err) => {
    msg.send(`Ops, algum erro aconteceu!\n\n\`\`\`${err}\`\`\``)
    throw new Error(`Ooops, rolou um erro no comando: ${file.config.name}.\n` + err)
  }

  const file = zap.commands.get(cmd) || zap.commands.get(zap.aliases.get(cmd))
  if (file) {
    if (file.config.ownerOnly && !config.dev.numbers.includes(msg.getSenderNumber())) return
    file.execute({ msg, args, prefix })
  }
})
