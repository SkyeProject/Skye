module.exports = class Commands {
  constructor (zap, options) {
    this.zap = zap
    this.config = {
      name: options.name || null,
      aliases: options.aliases || [],
      category: options.category || null,
      onlyGroup: options.onlyGroup || false,
      groupAdmPermission: {
        bot: options.groupAdmPermission.bot || false,
        user: options.groupAdmPermission.user || false
      },
      ownerOnly: options.ownerOnly || false
    }
  }
}
