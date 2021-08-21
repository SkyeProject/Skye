# Skye Bot ❤

Um simples bot desenvolvido para deixar o seu grupo do WhatsApp mais animado!

Quer me adicionar? Tome aqui o meu número!
- [+55 11 95353-2681](https://wa.me/5511953532681)

Entre no nosso grupo do WhatsApp para sermos amigos!
- [Clique aqui](https://chat.whatsapp.com/Hhng0Nc2rM3HAtwGsLJOfo)

<p align="center">
<img src="https://cdn.discordapp.com/attachments/685501923314368513/837858198610247730/jibril.png" width="70%">
<br>

### Dependências

- [NodeJS](https://nodejs.org/en/) - Utilizar a versão Current v16!
- [FFmpeg](https://ffmpeg.org)
- [Libwebp](https://developers.google.com/speed/webp/download)
- [MongoDB](https://www.mongodb.com)
- [ImageOptim](https://imageoptim.com/api) - Usado para converter GIF em MP4. Se não tiver, os comandos como **hug, kiss...** não irão funcionar.
- [DeepAI](https://deepai.org/apis) - Até então usado para detectar nudez em imagens.
- [Google Chrome](https://www.google.com/intl/pt-BR/chrome/)
- Dois webhooks do [Discord](https://discord.com) (Opcional, você pode desativá-los no config.json)
- Caso você não queria usar o Mongo no seu bot, te recomendo o [Lowdb](https://github.com/typicode/lowdb),
um banco de dados JSON bem simples e fácil de usar.

> ⚠ **Sem essas dependências a Skye pode não funcionar!**</p>
> ⚠ **A Skye não é compatível com o Termux!**

## Como usar
Caso tenha dúvidas, eu fiz um breve [tutorial para instalar no Windows](https://www.youtube.com/watch?v=E2Xh7setG84)
- Clone o repositório:
```
$ git clone https://github.com/SkyeProject/Skye.git
```
- Instale as dependências:
```
$ npm install
```
- Instale o PM2:
```
$ npm install -g pm2
```
- Renomeie o arquivo `config.example.json` para `config.json` e preencha tudo que está lá
- E a Skye já estará pronta para ser ligada! :)
```
$ pm2 start .
```
## Contribuições
- Você está livre para fazer novos comandos para a Skye, para isso existe um [template](https://github.com/SkyeProject/Skye/blob/main/src/commands/template.js) para você entender melhor como funciona.
- Caso você encontre uma falha ou algo que possa ser melhorado, não hesite em melhorar e nos mandar um **pull request**! 
Nós estamos sempre buscando por melhorias e estabilidade para a Skye.

## Suporte
Você está com dificuldades de usar a Skye ou com problemas na hora da instalação? Aqui vai algumas maneiras de nos contactar:
- [Issues](https://github.com/SkyeProject/Skye/issues) - Abra um report no Issues para relatar o seu problema
- [WhatsApp](https://wa.me/553398530288) - WhatsApp de um dos meus desenvolvedores
- [Discord](https://discord.gg/R8XHZJx) - Nosso servidor do Discord (Pode entrar lá mesmo que não tenha problemas com o bot :P)

## Doações
Quer nos ajudar a comprar biscoito? Então doe para a gente, nem que seja 1 real :C
- [PayPal](https://www.paypal.com/donate/?business=AWFG52GGZVAES&currency_code=BRL)
- [PicPay](https://picpay.me/victor.mateus107)
- PIX - f444b85e-f7ae-4ab7-933a-d06ef9a89129

## Licença
Este projeto está licenciado nos termos da licença GPL 3.0.
