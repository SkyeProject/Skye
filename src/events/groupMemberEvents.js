const { zap } = require('../index')

zap.atizap.onGlobalParticipantsChanged(async (participantChangedEvent) => {
  const doc = await zap.mongo.Groups.findById(participantChangedEvent.chat)
  if (!doc) return
  const participant = participantChangedEvent.who.replace('@c.us', '')
  const groupMembers = await zap.atizap.getGroupMembers(participantChangedEvent.chat)
  const { title } = await zap.atizap.getGroupInfo(participantChangedEvent.chat)
  const replaceAllParameters = (arr) => {
    arr = arr.replace(/{member}/g, ('@' + participant))
    arr = arr.replace(/{group}/g, title)
    arr = arr.replace(/{memberCount}/g, groupMembers.length)
    return arr
  }
  if (participantChangedEvent.action === 'add') {
    if (!doc.welcome.activate) return
    const message = replaceAllParameters(doc.welcome.message)
    await zap.atizap.sendTextWithMentions(doc._id, message)
  }
  if (participantChangedEvent.action === 'remove') {
    if (!doc.byebye.activate) return
    const message = replaceAllParameters(doc.byebye.message)
    await zap.atizap.sendTextWithMentions(doc._id, message)
  }
})
