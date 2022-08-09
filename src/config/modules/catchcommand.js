const { zap, config } = require('../../index')
const DiscordEmbed = require('./DiscordEmbedHook')
module.exports = async (msg) => {
  const groupName = msg.chat.groupMetadata ? msg.chat.name : 'O usuário mandou no privado.'
  const groupPic = msg.chat.groupMetadata ? await zap.atizap.getProfilePicFromServer(msg.from) : ''
  const embed = new DiscordEmbed()
  embed.setWebhook(config.discord.webhookUrlforCommands)
  embed.author(`${msg.sender.pushname || msg.sender.verifiedName || msg.sender.shortName || msg.sender.formattedName || msg.sender.name} | ${msg.sender.id.replace('@c.us', '')}`, msg.sender.profilePicThumbObj.eurl)
  embed.title('Usou o comando:')
  embed.description(msg.content)
  embed.color('#94bae0')
  embed.footer(groupName, groupPic)
  embed.timestamp()
  embed.send()
}
