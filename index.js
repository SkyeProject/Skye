const AtizapClient = require("./scr/config/AtizapClient");
const config = require("./config.json")
const zap = new AtizapClient()

zap.loadEvents("./scr/events/**/*.js")
zap.loadCommands("./scr/commands/**/*.js")

module.exports = {
    zap,
    config
}