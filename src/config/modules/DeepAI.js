const deepai = require('deepai')

module.exports = class DeepAI {
  constructor (apikey) {
    deepai.setApiKey(apikey)
    return deepai
  }
}
