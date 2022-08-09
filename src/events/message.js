const { zap, config } = require('../index')
const { createGroupDoc, createUserDoc } = require('../config/modules/database/mongocreate')
const { findBestMatch } = require('string-similarity')
const catchcommand = require('../config/modules/catchcommand')

zap.atizap.onMessage(async (msg) => {
  try {
    msg.content = msg.caption || msg.body
    if (!msg.content) return

    let doc = await zap.mongo.Groups.findById(msg.from) || await zap.mongo.Users.findById(msg.from)

    if (!doc && msg.isGroupMsg) doc = createGroupDoc(msg.from)
    if (!doc) doc = createUserDoc(msg.from)

    const prefix = doc.prefix || config.bot.prefix

    msg.botContact = await zap.atizap.getMe()

    if (!msg.content.toLowerCase().startsWith(prefix) || msg.content.length === prefix.length) {
      if (!msg.isGroupMsg || msg.content === '@' + msg.botContact.me.user) return await zap.atizap.sendText(msg.from, `Olaa, use *${prefix}ajuda* para saber os meus comandos :)`).catch(e => { })
      return
    }

    const args = msg.content.slice(prefix.length).trim().split(/ +/)
    const cmd = args.shift().toLowerCase()

    if (global.restart === true) return await zap.atizap.sendText(msg.from, 'Estou sendo reiniciada, aguarde um pouquinho!!').catch(e => { })
    if (zap.inGame.has(msg.sender.id)) return

    if (!zap.commands.has(cmd) && !zap.aliases.has(cmd)) {
      const allCmdsNames = []
      zap.commands.forEach(cmd => {
        if (cmd.config.category !== 'dev') {
          allCmdsNames.push(cmd.config.name)
          cmd.config.aliases.forEach(alias => allCmdsNames.push(alias))
        }
      })
      const matches = findBestMatch(cmd, allCmdsNames)
      return await zap.atizap.reply(msg.from, `*Eu não encontrei este comando!*\n\nVocê quis dizer: \`\`\`${prefix}${matches.bestMatch.target}\`\`\` ?`, msg.id).catch(e => { })
    }

    let docUser = doc
    if (msg.isGroupMsg) {
      docUser = await zap.mongo.Users.findById(msg.sender.id)
    }

    msg.send = async (message, ...args) => {
      let from = msg.from
      args = args[0]
      if (args) {
        if (args.from) from = args.from
        if (args.reply) return await zap.atizap.reply(from, message, msg.id).catch(e => msg.zapFail(e)) // msg.send('Sua Mensagem', { reply: true })
        if (args.mention) return await zap.atizap.sendTextWithMentions(from, message).catch(e => msg.zapFail(e)) // msg.send('Mensagem mencionando alguem', { mention: true })
        if (args.youtube) return await zap.atizap.sendYoutubeLink(from, message).catch(e => msg.zapFail(e)) // msg.send('Mensagem com um link do youtube', { youtube: true })
        if (args.link) return await zap.atizap.sendLinkWithAutoPreview(from, message).catch(e => msg.zapFail(e)) // msg.send('Mensagem com preview de um link', { link: true })
      }
      return await zap.atizap.sendText(from, message) // Caso não coloque um argumento, a mensagem será enviada normalmente.
    }

    if (docUser && docUser.status.isBanned) return msg.send(`❗ | Você está banido de me usar!\n\nMotivo: *${docUser.status.reason}*`)

    msg.sendImage = (image, message, from) => {
      if (!from) from = msg.from
      zap.atizap.sendImage(from, image, 'file', message).catch(e => msg.zapFail(e))
    }

    msg.sendSticker = (Base64, boolean = false) => {
      const errortext = 'Não foi possível transformar o arquivo em um sticker. Se por acaso você estiver enviando um vídeo, na hora de enviar selecione a opção "gif".\nhttps://is.gd/aJNpv7'
      switch (boolean) {
        case false:
          zap.atizap.sendImageAsSticker(msg.from, Base64, { author: `+${msg.botContact.me.user}`, pack: msg.botContact.pushname, keepScale: true })
            .catch(e => msg.zapFail(errortext + '\n\n' + e))
          break

        case true:
          zap.atizap.sendMp4AsSticker(msg.from, Base64, null, { stickerMetadata: true, author: `+${msg.botContact.me.user}`, pack: msg.botContact.pushname, startTime: '00:00:00.0', endTime: '00:00:06.0' })
            .catch(e => msg.zapFail(errortext + '\n\n' + e))
          break
      }
    }

    msg.getSenderNumber = () => {
      return msg.author ? msg.author.replace('@c.us', '') : msg.from.replace('@c.us', '')
    }

    msg.getContact = async (options) => {
      let number = typeof options === 'string' ? options : options.sender.id
      if (number.startsWith('@')) number = number.replace('@', '')
      if (!number.includes('@c.us')) number = number + '@c.us'
      const contact = await zap.atizap.getContact(number)
      const noPic = 'https://cdn.discordapp.com/attachments/685501923314368513/831934776948555826/nopic.png'
      if (!contact) {
        const alternative = {
          username: number.replace('@c.us', ''),
          number: number,
          avatar: noPic,
          found: false
        }
        return alternative
      }
      const contactPic = await zap.atizap.getProfilePicFromServer(number) || noPic
      if (await zap.atizap.getProfilePicFromServer(number) === 'ERROR: 404' || await zap.atizap.getProfilePicFromServer(number) === 'ERROR: 401') {
        const userNoPic = {
          username: contact.verifiedName || contact.pushname || contact.formattedName,
          number: contact.id,
          avatar: noPic,
          isMe: contact.isMe,
          isMyContact: contact.isMyContact,
          found: true
        }
        if (userNoPic.isMe) userNoPic.username = msg.botContact.pushname
        return userNoPic
      }
      const user = {
        username: contact.verifiedName || contact.pushname || contact.formattedName,
        number: contact.id,
        avatar: contactPic,
        isMe: contact.isMe,
        isMyContact: contact.isMyContact,
        found: true
      }
      if (user.isMe) user.username = msg.botContact.pushname
      return user
    }

    msg.kick = (number) => {
      return new Promise((resolve, reject) => {
        zap.atizap.removeParticipant(msg.from, number).then(e => {
          if (e !== true) reject(e)
          resolve(e)
        })
      })
    }

    msg.findUserInGroup = (member) => {
      return msg.chat.groupMetadata.participants.find(user => user.id === member)
    }

    msg.zapFail = (err) => {
      msg.send(`Ops, algum erro aconteceu!\n\n\`\`\`${err}\`\`\``)
      console.error(`Ooops, rolou um erro no comando: ${file.config.name}.\n` + err)
    }

    msg.developers = []
    const devsNumbers = []
    Object.entries(config.devs.contacts).forEach(dev => {
      msg.developers.push({
        name: dev[0],
        number: dev[1],
        url: `wa.me/${dev[1]}`
      })
      devsNumbers.push(dev[1])
    })

    const file = zap.commands.get(cmd) || zap.commands.get(zap.aliases.get(cmd))
    if (file) {
      if (config.discord.enable) catchcommand(msg)
      if (file.config.ownerOnly && !devsNumbers.includes(msg.getSenderNumber())) return msg.send('Você não tem permissão para usar esse comando.')
      if (file.config.isWorking === false && !devsNumbers.includes(msg.getSenderNumber())) return msg.send('Este comando está desabilitado para reforma.')
      if (file.config.groupOnly && !msg.isGroupMsg) return await msg.send('Este comando só pode ser executado em grupos.')
      if (file.config.groupAdmPermission.user && !msg.findUserInGroup(msg.sender.id).isAdmin) return await msg.send('Você não é um administrador do grupo, que pena!')
      if (file.config.groupAdmPermission.bot && !msg.findUserInGroup(msg.botContact.me._serialized).isAdmin) return await msg.send('Eu preciso ser administradora do grupo para executar este comando!')
      file.amountTimes++
      file.execute({ msg, args, prefix, doc })
    }
  } catch (err) {
    console.error(err)
  }
})
