/*
* Código original: https://github.com/L0R4/LyaEmbedBuilder.js ^^
*/

const fetch = require('node-fetch')

module.exports = class LyaEmbedBuilder {
  constructor (options = {}) {
    this.EmbedBuilder = options
    this._webhook = options._webhook || null
    this._title = options.title || null
    this._description = options.description || null
    this._fields = options.fields || []
    this._thumbnail = options.icon || null
    this._footer = options.footer || null
    this._url = options.url || null
    this._image = options.image || null
    this._author = options.author || null
    this._video = options.video || null
    this._timestamp = options.timestamp || null
  }

  setWebhook (url) {
    this._webhook = url
    return this
  }

  title (title) {
    if (title.length > 256) throw new Error('O título da embed só pode ter no máximo 256 carácteres!')
    this._title = title
    return this
  }

  description (desc) {
    if (desc.length > 2048) throw new Error('A descrição não pode passar de 2048 carácteres!')
    this._description = desc
    return this
  }

  field (name, value, inline = false) {
    if (this._fields.length >= 25) throw new Error('A embed só pode ter até 25 fields!')
    if (name.length >= 256) throw new Error('O nome do field só pode ter no máximo 256 carácteres!')
    if (name.length >= 1024) throw new Error('A descrição do field não pode passar de 2048 carácteres!')

    this._fields.push({ name, value, inline })
    return this
  }

  author (name, icon, url) {
    this._author = { name: name, icon_url: icon, url: url }
    return this
  }

  thumbnail (icon, options = {}) {
    this._thumbnail = { url: icon, height: options.height, width: options.width }
    return this
  }

  footer (text, icon) {
    if (text.length > 2048) throw new Error('O footer não pode passar de 2048 carácteres!')
    this._footer = { text, icon }
    return this
  }

  url (url) {
    this._url = url
    return this
  }

  timestamp (timestamp = Date.now()) {
    this._timestamp = timestamp
    return this
  }

  image (imgURL, options = {}) {
    this._image = { url: imgURL, height: options.height, width: options.width }
    return this
  }

  color (color) {
    if (typeof color === 'string') {
      if (color.toLowerCase() === 'random') color = Math.floor(Math.random() * (0xffffff + 1))
      else if (color.toLowerCase() === 'default') color = 0
      else color = parseInt(color.replace('#', ''), 16)
    }
    this._color = color
    return this
  }

  video (video) {
    this._video = video
    return this
  }

  send () {
    const embed = {
      embeds: [
        {
          author: this._author,
          title: this._title,
          url: this._url,
          description: this._description,
          color: this._color,
          fields: this._fields,
          thumbnail: this._thumbnail,
          image: this._image,
          footer: this._footer,
          timestamp: this._timestamp
        }
      ]
    }
    fetch(this._webhook, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(embed) })
  }
}
