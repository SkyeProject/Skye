const AtizapClient = require("./config/AtizapClient");
const config = require("../config.json")
const { create, Client } = require("@open-wa/wa-automate");

create().then((atizap) => start(atizap));

const start = (atizap = new Client()) => {
    const zap = new AtizapClient(atizap)
    zap.loadEvents("./src/events/**/*.js")
    zap.loadCommands("./src/commands/**/*.js")

    module.exports = {
        zap,
        config
    }
}