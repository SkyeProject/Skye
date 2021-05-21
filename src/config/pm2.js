const pm2 = require('pm2')
const sleep = require('sleep-promise')

pm2.connect((err) => {
  if (err) console.error(err)
})

const start = async (time) => {
  await sleep(time * 60)
  global.restart = true
  await sleep(10000)
  console.log('Reiniciando o bot...')
  pm2.restart('.')
}

const restart = () => {
  console.log('Tudo bem, reiniciando o bot...')
  pm2.restart('.')
}
module.exports = {
  start,
  restart
}
