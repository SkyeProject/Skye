module.exports = class Commands {
    constructor(zap, options) {
        this.zap = zap
        this.config = {
            name: options.name || null,
            aliases: options.aliases || [],
            category: options.category || null,
            ownerOnly: options.ownerOnly || false
        }
    }
}