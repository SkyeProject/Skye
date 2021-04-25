/*
* Código original: https://github.com/L0R4/LyaEmbedBuilder.js ^^
*/

const fetch = require('node-fetch')
const config = require('./../../config')

module.exports = class DiscordEmbed {
  constructor (options = {}) {
    this.EmbedBuilder = options
    this._title = options.title || null
    this._description = options.description || null
    this._fields = options.fields || []
    this._thumbnail = options.icon || null
    this._footer = options.footer || null
    this._url = options.url || null
    this._image = options.image || null
    this._author = options.author || null
    this._timestamp = options.timestamp || null
  }

  setTitle (title) {
    this._title = title
    return this
  }

  setDescription (desc) {
    this._description = desc
    return this
  }

  addField (name, value, inline = false) {
    this._fields.push({ name, value, inline })
    return this
  }

  addFields (...fields) {
    fields.forEach(field => {
      this._fields.push({ name: field.name, value: field.value, inline: field.inline })
    })
    return this
  }

  setAuthor (name, icon, url) {
    this._author = { name: name, icon_url: icon, url: url }
    return this
  }

  setThumbnail (icon, options = {}) {
    this._thumbnail = { url: icon, height: options.height, width: options.width }
    return this
  }

  setFooter (text, icon) {
    this._footer = { text, icon_url: icon }
    return this
  }

  setURL (url) {
    this._url = url
    return this
  }

  setTimestamp (timestamp = new Date()) {
    this._timestamp = timestamp
    return this
  }

  setImage (imgURL, options = {}) {
    this._image = { url: imgURL, height: options.height, width: options.width }
    return this
  }

  setColor (color) {
    if (typeof color === 'string') {
      if (color.toLowerCase() === 'random') color = Math.floor(Math.random() * (0xffffff + 1))
      else if (color.toLowerCase() === 'default') color = 0
      else color = parseInt(color.replace('#', ''), 16)
    }
    this._color = color
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
    fetch(config.discord.webhookUrl, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(embed) })
  }
}
