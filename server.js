//Usando Express para criar e configurar o servidor
const express = require('express')
const server = express()

//Configurar arquivos estáticos.(css, scripts, imagens)
server.use(express.static("public"))

//configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true
})

/*
*Criando uma rota
*Capturando pedido do client para responder
*/
server.get("/", function(req, res) {
    return res.render("index.html")
})

server.get("/ideias", function(req, res) {
    return res.render("ideias.html")
})

//Ligando servidor na porta 3000
server.listen(3000)