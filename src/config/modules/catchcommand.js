const { zap, config } = require('../../index')
const DiscordEmbed = require('./DiscordEmbedHook')
module.exports = async (user, msg) => {
  const groupName = msg.chat.groupMetadata ? msg.chat.name : 'O usuário mandou no privado.'
  const groupPic = msg.chat.groupMetadata ? await zap.atizap.getProfilePicFromServer(msg.from) : ''

  new DiscordEmbed()
    .setWebhook(config.discord.webhookUrlforCommands)
    .setAuthor(`${user.username} | ${user.number.replace('@c.us', '')}`, user.avatar)
    .setTitle('Usou o comando:')
    .setDescription(msg.content)
    .setColor('#94bae0')
    .setFooter(groupName, groupPic)
    .setTimestamp()
    .send()
}
