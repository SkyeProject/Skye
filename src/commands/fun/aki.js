const Command = require('../../config/Command')
const { Aki } = require('aki-api')
const isPlaying = new Set()

module.exports = class AkiCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'aki',
      aliases: ['akinator'],
      category: 'fun',
      description: 'Bora jogar um akinator?',
      example: 'akinator iniciar',
      onlyGroup: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false
    })
  }

  async execute ({ msg, prefix, args }) {
    try {
      if (isPlaying.has(msg.from)) {
        return msg.send(msg.isGroupMsg ? 'Já está rolando uma partida neste grupo!' : `Você já está jogando, para cancelar use *${prefix}parar*`)
      }

      if (args[0] !== 'start' && args[0] !== 'iniciar') {
        return await msg.send(`🔮 Akinator 🔮

Duvida que eu adivinho o que você está pensando? Venha jogar comigo então e veja só!

Use *${prefix}akinator iniciar*!
`)
      }
      isPlaying.add(msg.from)
      const aki = new Aki('pt')

      await aki.start()

      const akisend = async (...args) => {
        if (args[0] && args[0].back) {
          if (aki.currentStep === 0) {
            return await msg.send(`🔮 Akinator 🔮
  
Você está na rodada *1*, portanto não tem como voltar!`)
          }
          await aki.back()
        }
        await msg.send(`🔮 Akinator 🔮

Rodada: *${aki.currentStep + 1}*

✏️ Pergunta: *${aki.question}*

Escolha uma das opções abaixo: 
> *${prefix}sim* 
> *${prefix}não* 
> *${prefix}não sei*
> *${prefix}provavelmente sim*
> *${prefix}provavelmente não*
> *${prefix}voltar* (Volte uma questão atrás.)
> *${prefix}parar* (Encerre o jogo.)

(Se por acaso eu não responder, é porque deu erro, ai é só digitar novamente o que vc tinha mandado)`)
      }
      const answers = {
        y: [`${prefix}sim`, `${prefix}y`, `${prefix}yes`],
        n: [`${prefix}não`, `${prefix}nao`, `${prefix}no`, `${prefix}nop`],
        idk: [`${prefix}não sei`, `${prefix}nao sei`, `${prefix}eu nao sei`, `${prefix}eu não sei`, `${prefix}idk`, `${prefix}i do not know`],
        probablyy: [`${prefix}provavelmente sim`, `${prefix}provavelmente s`, `${prefix}probably yes`, ` ${prefix}probably y`],
        probablyn: [`${prefix}provavelmente não`, `${prefix}provavelmente nao`, `${prefix}provavelmente n`, `${prefix}probably not`, `${prefix}probably n`],
        back: [`${prefix}voltar`, `${prefix}back`],
        stop: [`${prefix}parar`, `${prefix}stop`]
      }
      const filter = (m) => {
        return m.sender.id === msg.sender.id
      }
      const collector = this.zap.atizap.createMessageCollector(msg.from, filter, { time: 60000 * 15 })

      await akisend()

      collector.on('collect', async (message) => {
        if (!message.content.startsWith(prefix)) return
        let akiasnwer
        for (const answer in answers) {
          if (answers[answer].includes(message.content.toLowerCase())) {
            if (answer === 'y') akiasnwer = 0
            if (answer === 'n') akiasnwer = 1
            if (answer === 'idk') akiasnwer = 2
            if (answer === 'probablyy') akiasnwer = 3
            if (answer === 'probablyn') akiasnwer = 4
            if (answer === 'back' || answer === 'stop') akiasnwer = answer
          }
        }
        if (aki.progress >= 70 || aki.currentStep >= 78) {
          if (akiasnwer === 0) {
            await msg.send(`🔮 Akinator 🔮

*Sou foda, eu sabia que era o(a) ${aki.answers[0].name} desde o início 😎😎😎*`)
            return collector.stop()
          } else if (akiasnwer === 1) {
            await msg.send(`🔮 Akinator 🔮

*Ahhhhhhh droga, eu sou muito ruim foi maaal :C*`)
            return collector.stop()
          } else return msg.send(`Não entendi, diga *${prefix}sim* ou *${prefix}não*!`)
        }
        if (akiasnwer === 'back') return await akisend({ back: true })
        if (akiasnwer === 'stop') {
          await msg.send(`🔮 Akinator 🔮

*Mas já? Nem deu tempo de adivinhar ainda...* 😥`)
          return collector.stop()
        }
        if (isNaN(akiasnwer)) return msg.send('Não entendi, digite uma das opções que eu citei acima!')

        await aki.step(akiasnwer)

        if (aki.progress >= 70 || aki.currentStep >= 78) {
          await aki.win()
          await msg.sendImage(aki.answers[0].absolute_picture_path, `🔮 Akinator 🔮

Eu acho que é o(a): *${aki.answers[0].name}* 😋

Eu acertei?

Escolha uma das opções abaixo: 
> *${prefix}sim*
> *${prefix}não*`)
        } else await akisend()
      })

      collector.on('end', () => isPlaying.delete(msg.from))
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
