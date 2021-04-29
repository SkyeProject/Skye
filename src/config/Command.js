module.exports = class Commands {
  constructor (zap, options) {
    this.zap = zap
    this.config = {
      name: options.name || null,
      aliases: options.aliases || [],
      category: options.category || null,
      description: options.description || null,
      example: options.example || null,
      onlyGroup: options.onlyGroup || false,
      groupAdmPermission: {
        bot: options.groupAdmPermission.bot || false,
        user: options.groupAdmPermission.user || false
      },
      ownerOnly: options.ownerOnly || false
    }
    this.amountTimes = 0
  }

  uptime () {
    const uptime = process.uptime()
    const upDays = Math.floor((uptime % 31536000) / 86400)
    const upHours = Math.floor((uptime % 86400) / 3600)
    const upMinutes = Math.floor((uptime % 3600) / 60)
    const upSeconds = Math.round(uptime % 60)

    const days = upDays === 1 ? 'dia' : 'dias'
    const hours = upHours === 1 ? 'hora' : 'horas'
    const minutes = upMinutes === 1 ? 'minuto' : 'minutos'
    const seconds = upSeconds === 1 ? 'segundo' : 'segundos'

    return (upDays > 0 ? upDays + ` ${days}, ` : '') + (upHours > 0 ? upHours + ` ${hours}, ` : '') + (upMinutes > 0 ? upMinutes + ` ${minutes} e ` : '') + (upSeconds > 0 ? upSeconds + ` ${seconds}` : '')
  }

  getAllMembersNumbers (msg, options = false) {
    if (!msg.isGroupMsg) throw new Error('getAllMembersNumbers: esta função só pode ser executada em grupos')
    const usersNumber = []
    msg.chat.groupMetadata.participants.forEach(user => {
      if (user.id !== msg.botContact.me._serialized) {
        if (options) usersNumber.push(user.id.replace('@c.us', ''))
        else usersNumber.push(user.id)
      }
    })
    return usersNumber
  }

  getRandomValueInArray (arr, n) {
    const result = new Array(n)
    let len = arr.length
    const taken = new Array(len)
    if (n > len) throw new RangeError('getRandomValueInArray: mais elementos tomados do que disponíveis')
    while (n--) {
      const x = Math.floor(Math.random() * len)
      result[n] = arr[x in taken ? taken[x] : x]
      taken[x] = --len in taken ? taken[len] : len
    }
    return result
  }

  removeItem (arr, value) {
    const index = arr.indexOf(value)
    if (index > -1) {
      arr.splice(index, 1)
    }
    return arr
  }

  getRandomInt (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  }
}
