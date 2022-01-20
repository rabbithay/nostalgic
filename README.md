# NostalgicVHS

<p align="center">
  <img src="public/favico.ico" width="175" alt="vhs" />
</p>

Um sistema criado para facilitar a gestão de locação de filmes, como os nossos antepassados faziam, antes do torrent e da netflix. Desenvolvido durante o processo seletivo da [e-Auditoria](http://e-auditoria.com.br/auditoria-digital/)

<br>

## Create React App

Esse projeto foi desenvolvido utilizando [Create React App](https://github.com/facebook/create-react-app).

<br>

## Ant Design

Para a criação dos componentes e design da aplicação, foi utilizada a robusta biblioteca [Ant Design](https://github.com/ant-design/ant-design/), como recomendado.

Ótima documentação, muitos bons exemplos e componentes altamente customizáveis e inteligentes. Não tão fácil de usar de primeira, mas você vai pegando o jeito...

O principal ponto negativo é não ser nativamente integrada ao styled components, mas imagino que seja contornável com um pouco mais de tempo e pesquisa.

Mas vamos ao que interessa...

<br>

## Deploy

O deploy foi feito pelo [Vercel](https://github.com/vercel) e você consegue dar uma espiada no resultado entrando aqui: [nostalgicVHS](https://nostalgic.vercel.app/)

Mas se quiser rodar na sua máquina, segue o fio...

<br>

## Requisitos

Antes de tudo, você precisa ter e saber operar o [Git](https://git-scm.com/), [Node.js](https://nodejs.org/en/) e algum ótimo editor de código como o [VSCode](https://code.visualstudio.com/).

<br>

## Como rodar

```bash
# Clone o repositório
$ git clone <https://github.com/rabbithay/nostalgic.git>

# Acesse a pasta do projeto
$ cd nostalgic

# Instale as dependencias com o gerenciador de sua preferência (gosto mais do yarn)
$ yarn install or $ npm install

# E rode a aplicação !
$ yarn start or $ npm start

# O resto deve acontecer automáticamente, so esperar a boa vontade do navegador
```

Fácil, ne?

<br>

## Features

As features implementadas foram:

- [x] listar filmes, clientes e aluguéis em formato de tabela
- [x] ordenar e filtrar as colunas de acordo com as informações de cada tabela
- [x] editar informações dos filmes, clientes e aluguéis
- [x] apagar dados das tabelas
- [x] cadastrar novos filmes, clientes e aluguéis

E as que ainda vão nascer:

- [ ] integração com a [API que fiz dedicada](https://github.com/rabbithay/nostalgic-api)
- [ ] rotas privadas, para manter o acesso dos dados apenas para administradores cadastrados
- [ ] estoque de filmes
- [ ] repaginada no visual

<br>

## Agradecimento

- Ao [Twitter Emoji](https://iconscout.com/contributors/twitter-inc) que criou o [Videocassette Icon](https://iconscout.com/icon/videocassette-tap-vhs-video) que estou usando. Valeu!!
