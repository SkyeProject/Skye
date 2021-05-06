const { zap } = require('../index')
const CronJob = require('cron').CronJob

const greetings = async (option) => {
  const archives = require(`../config/modules/API/${option}.json`)
  const doc = await zap.mongo.Groups.find()

  doc.forEach(async group => {
    let phrase
    if (option === 'morning') phrase = 'Bom dia ❤'
    if (option === 'afternoon') phrase = 'Boa tarde ❤'
    if (option === 'night') phrase = 'Boa noite ❤'

    if (group.greeting && group.greeting[option] === true) {
      const checkGroup = await zap.atizap.getGroupInfo(group._id)
      if (typeof checkGroup !== 'object') return

      const randomNumber = Math.floor(Math.random() * (Object.keys(archives).length))
      const archive = archives[randomNumber]

      if (archive.type === 'gif') await zap.atizap.sendVideoAsGif(group._id, archive.link, '❤', phrase).catch(e => {})
      else zap.atizap.sendFileFromUrl(group._id, archive.link, '❤', phrase)
    }
  })
}

const day = new CronJob('0 6 * * *', () => {
  greetings('morning')
}, null, true, 'America/Sao_Paulo')

const evening = new CronJob('0 12 * * *', () => {
  greetings('afternoon')
}, null, true, 'America/Sao_Paulo')

const night = new CronJob('0 18 * * *', () => {
  greetings('night')
}, null, true, 'America/Sao_Paulo')

day.start()
evening.start()
night.start()
