//Usando Express para criar e configurar o servidor
const express = require('express')
const server = express()

//Configurar arquivos estáticos.
server.use(express.static("public"))

/*
*Criando uma rota
*Capturando pedido do client para responder
*/
server.get("/", function(req, res) {
    return res.sendFile(__dirname + "/index.html")
})

server.get("/ideias", function(req, res) {
    return res.sendFile(__dirname + "/ideias.html")
})

//Ligando servidor na porta 3000
server.listen(3000)