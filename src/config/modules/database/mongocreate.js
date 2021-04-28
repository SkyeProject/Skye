const { zap, config } = require('../../../index')

const createGroupDoc = (id) => {
  return new zap.mongo.Groups({
    _id: id,
    prefix: config.bot.prefix,
    welcome: {
      activate: false,
      message: 'Bem vindo(a) {member} ao grupo *{group}*! Nós atualmente temos *{memberCount}* membros!'
    },
    byebye: {
      activate: false,
      message: 'Poxa, o(a) {member} saiu do grupo :( Agora nós temos *{memberCount}* membros!'
    },
    options: {
      alert: true
    }
  })
}
const createUserDoc = (id) => {
  return new zap.mongo.Users({
    _id: id,
    status: {
      isBanned: false
    }
  })
}

module.exports = {
  createGroupDoc,
  createUserDoc
}
