const mongoose = require('mongoose')

module.exports = class AtizapDB {
  constructor (uri) {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true
    }).catch(console.error)

    this.Groups = mongoose.model('Groups', new mongoose.Schema({
      _id: String,
      prefix: String,
      welcome: {
        activate: false,
        message: String
      },
      byebye: {
        activate: false,
        message: String
      },
      greeting: {
        morning: false,
        afternoon: false,
        night: false
      },
      options: {
        alert: Boolean
      }
    }))
    this.Users = mongoose.model('Users', new mongoose.Schema({
      _id: String,
      status: {
        isBanned: Boolean,
        reason: String
      }
    }))
  }
}
