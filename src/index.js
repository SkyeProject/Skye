const AtizapClient = require("./config/AtizapClient");
const config = require("../config.json")
const zap = new AtizapClient()

zap.loadEvents("./src/events/**/*.js")
zap.loadCommands("./src/commands/**/*.js")

module.exports = {
    zap,
    config
}