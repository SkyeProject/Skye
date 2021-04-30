const { zap, config } = require('../index')
const catchcommand = require('../config/modules/catchcommand')
const mongocreate = require('../config/modules/database/mongocreate')
// const sleep = require('sleep-promise')
// const cooldown = new Set()

zap.atizap.onMessage(async (msg) => {
  msg.content = msg.caption || msg.body
  if (!msg.content) return

  let doc = await zap.mongo.Groups.findById(msg.from) || await zap.mongo.Users.findById(msg.from)

  if (!doc && msg.isGroupMsg) doc = mongocreate.createGroupDoc(msg.from)
  if (!doc) doc = mongocreate.createUserDoc(msg.from)
  const prefix = doc.prefix || config.bot.prefix
  if (!msg.content.toLowerCase().startsWith(prefix)) return

  const args = msg.content.slice(prefix.length).trim().split(/ +/)
  const cmd = args.shift().toLowerCase()

  if (!zap.commands.has(cmd) && !zap.aliases.has(cmd)) return

  let docUser = doc
  if (msg.isGroupMsg) {
    docUser = await zap.mongo.Users.findById(msg.sender.id)
  }

  msg.botContact = await zap.atizap.getMe()

  msg.send = async (message, ...args) => {
    let from = msg.from
    args = args[0]
    if (args) {
      if (args.from) from = args.from
      if (args.reply) return await zap.atizap.reply(from, message, msg.id)
      if (args.mention) return await zap.atizap.sendTextWithMentions(from, message)
    }
    return await zap.atizap.sendText(from, message)
  }

  if (docUser && docUser.status.isBanned) return msg.send(`❗ | Você está banido de me usar!\n\nMotivo: *${docUser.status.reason}*`)

  msg.sendImage = (image, message) => {
    zap.atizap.sendImage(msg.from, image, 'file', message)
  }

  msg.sendSticker = (Base64, boolean) => {
    const errortext = 'Não foi possível transformar o arquivo por um sticker. Se por acaso você estiver enviando um vídeo, na hora de enviar selecione a opção "gif".\nhttps://is.gd/aJNpv7'
    switch (boolean) {
      case false:
        zap.atizap.sendImageAsSticker(msg.from, Base64, { author: `+${msg.botContact.me.user}`, pack: msg.botContact.pushname, keepScale: true })
          .catch(e => { msg.zapFail(errortext + '\n\n' + e) })
        break

      case true:
        zap.atizap.sendMp4AsSticker(msg.from, Base64, null, { author: `+${msg.botContact.me.user}`, pack: msg.botContact.pushname, startTime: '00:00:00.0', endTime: '00:00:06.0' })
          .catch(e => { msg.zapFail(errortext + '\n\n' + e) })
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
    const noPic = 'https://is.gd/YfUEbP'
    if (!contact) {
      const alternative = {
        username: number.replace('@c.us', ''),
        number: number,
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
    throw new Error(`Ooops, rolou um erro no comando: ${file.config.name}.\n` + err)
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
    // for (const set of cooldown) if (set.name === msg.sender.id || msg.from) return await msg.send(`Aguarde *${Math.floor((set.t - Date.now()) / 1000)}* segundos para poder executar outro comando!`)
    catchcommand(await msg.getContact(msg), msg)
    if (file.config.ownerOnly && !devsNumbers.includes(msg.getSenderNumber())) return
    if (file.config.onlyGroup && !msg.isGroupMsg) return await msg.send('Este comando só pode ser executado em grupos.')
    if (file.config.groupAdmPermission.user && !msg.findUserInGroup(msg.sender.id).isAdmin) return await msg.send('Você não é ADM do grupo, que pena!')
    if (file.config.groupAdmPermission.bot && !msg.findUserInGroup(msg.botContact.me._serialized).isAdmin) return await msg.send('Eu preciso ser ADM do grupo para executar esse comando, pois eu não sou mágica.')
    file.amountTimes++
    file.execute({ msg, args, prefix, doc })
    // cooldown.add({
    //   name: msg.sender.id || msg.from,
    //   t: Date.now() + 5000
    // })
    /*
    await sleep(5000)
    cooldown.forEach(n => n.name === msg.sender.id || msg.from ? cooldown.delete(n) : n)
    */
  }
  msg.sendYoutube = async (message, ...args) => {
    let from = msg.from
    args = args[0]
    if (args) {
      if (args.from) from = args.from
      if (args.reply) return await zap.atizap.reply(from, message, msg.id)
    }
    return await zap.atizap.sendYoutubeLink(from, message)
  }
})
