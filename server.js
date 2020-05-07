//Usando Express para criar e configurar o servidor
const express = require('express')
const server = express()

/*
*Criando uma rota
*Capturando pedido do client para responder
*/
server.get("/", function(req, res) {
    return res.sendFile(__dirname + "/index.html")
})

//Ligando servidor na porta 3000
server.listen(3000)