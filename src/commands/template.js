/*
*       Olá para você que chegou aqui! Bem, se tiver alguma dúvida, pode me chamar no zapzap https://wa.me/553398530288
*       Só vou avisando logo q eu vo ir atrás das pessoas que catarem os meus códigos e não derem os devidos créditos >_>
*
*       Skye desenvolvido por MrRexD & Demetrius.
*/
const Command = require('../../config/Command') // Antes de tudo, escolha a categoria do comando e taque na pasta respectiva a ele.

module.exports = class TemplateCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'nome_bem_legal_pro_comando_iuhul',
      aliases: ['outras', 'formas', 'de', 'chamar', 'o', 'comando', ':)'], // Ah, a primeira aliase sempre deve ser em português! De resto pode ser qualquer lingua que tu quiser
      category: 'categoriaTop', // dev, fun, misc, mod, utils
      description: 'uma descrição bem daora aqui',
      example: 'exemplo de como usa o comando',
      onlyGroup: false, // marque true caso o comando for para grupo
      groupAdmPermission: {
        bot: false, // caso o bot precisa de adm, marque como true
        user: false // ou se o usuário precisar de adm, marque como true tbm
      },
      ownerOnly: false // somente para os dev do bot? Se sim marca true
    })
  }

  async execute ({ msg, args, prefix }) {
    try {
    // Seu código aqui...
      return await msg.send('Olá :)')
    } catch (err) {
      await msg.zapFail(err) // Caso der erro, o bot já irá avisar ao usuário.
    }
  }
}
