const { zap, config } = require('../index')

zap.atizap.onAddedToGroup(async (group) => {
  await zap.atizap.sendText(group.id, `🤗 | Olaa, muito obrigado por me adicionar! Utilize *${config.bot.prefix}help* para saber os meus comandos!!!`)

  const groupPic = await zap.atizap.getProfilePicFromServer(group.id)
  const owner = await zap.atizap.getContact(group.groupMetadata.owner)
  const bot = await zap.atizap.getMe()
  const picBot = await zap.atizap.getProfilePicFromServer(bot.me._serialized)
  const allGroups = await zap.atizap.getAllGroups()
  const allUsers = []
  allGroups.forEach(group => {
    allUsers.push(group.participantsCount - 1)
  })
  // if (config.discord.enable) {
  //   new DiscordEmbed()
  //     .setWebhook(config.discord.webhookUrlforGroups)
  //     .setThumbnail(groupPic)
  //     .setColor('#7727f4')
  //     .setTitle(`❤ | ${group.name || group.formattedTitle}`)
  //     .addFields(
  //       { name: '👑 Dono do servidor:', value: `\`${owner.verifiedName || owner.pushname || owner.formattedName}\` `, inline: true },
  //       { name: '💻 ID do Servidor:', value: `\`${group.id}\``, inline: false },
  //       { name: '👀 Membros:', value: `**${group.participantsCount}** membros.` })
  //     .setFooter(`Estou em ${allGroups.length} grupos com ${allUsers.reduce((a, b) => a + b)} usuários no total!`, picBot)
  //     .setTimestamp()
  //     .send()
  // }
})
