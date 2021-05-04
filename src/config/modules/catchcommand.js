const { zap, config } = require('../../index')
const DiscordEmbed = require('./DiscordEmbedHook')
module.exports = async (msg) => {
  const groupName = msg.chat.groupMetadata ? msg.chat.name : 'O usuário mandou no privado.'
  const groupPic = msg.chat.groupMetadata ? await zap.atizap.getProfilePicFromServer(msg.from) : ''
  new DiscordEmbed()
    .setWebhook(config.discord.webhookUrlforCommands)
    .setAuthor(`${msg.sender.pushname || msg.sender.verifiedName || msg.sender.shortName || msg.sender.formattedName || msg.sender.name} | ${msg.sender.id.replace('@c.us', '')}`, msg.sender.profilePicThumbObj.eurl)
    .setTitle('Usou o comando:')
    .setDescription(msg.content)
    .setColor('#94bae0')
    .setFooter(groupName, groupPic)
    .setTimestamp()
    .send()
}
