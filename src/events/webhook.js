const fetch = require('node-fetch')
const { zap, config } = require('../index')

module.exports = async (user, msg) => {
  const { webhookUrl } = config.discord
  const groupName = msg.chat.groupMetadata ? msg.chat.name : 'O usuário mandou no privado.'
  const groupPic = msg.chat.groupMetadata ? await zap.atizap.getProfilePicFromServer(msg.from) : ''

  const embed = {
    embeds: [
      {
        author: {
          name: `${user.username} | ${user.number.replace('@c.us', '')}`,
          icon_url: user.avatar
        },
        title: 'Usou o comando:',
        description: msg.content,
        color: 9381575,
        footer: {
          text: groupName,
          icon_url: groupPic
        }
      }
    ]
  }
  fetch(webhookUrl, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(embed) })
}
