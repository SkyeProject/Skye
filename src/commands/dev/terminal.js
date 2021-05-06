const Command = require('../../config/Command')
const { exec } = require('child_process')

module.exports = class RestartCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'terminal',
      aliases: ['t', 'cmd'],
      category: 'dev',
      description: 'terminal',
      example: 'cmd',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: true
    })
  }

  async execute ({ msg, args }) {
    try {
      if (!args[0]) return await msg.send('Você não disse nada')
      const cmd = exec(args.join(' '), async function (error, stdout, stderr) {
        if (error) {
          await msg.send(error.stack)
          await msg.send('Error code: ' + `\`\`\`${error.code}\`\`\``)
          await msg.send('Signal received: ' + `\`\`\`${error.signal}\`\`\``)
        }
        if (stdout) await msg.send('Child Process STDOUT: ' + `\`\`\`${stdout}\`\`\``)
        if (stderr) await msg.send('Child Process STDERR: ' + `\`\`\`${stderr}\`\`\``)
      })

      cmd.on('exit', async function (code) {
        await msg.send('Child process exited with exit code ' + `\`\`\`${code}\`\`\``)
      })
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
