const AtizapClient = require("./config/AtizapClient");
const config = require("../config.json")
const { create, Client } = require("@open-wa/wa-automate");

create().then((atizap) => start(atizap));

const start = async (atizap = new Client()) => {
    const zap = new AtizapClient(atizap)
    zap.start({ events: "./src/events/**/*.js", commands: "./src/commands/**/*.js" })
    module.exports = {
        zap,
        config
    }
}