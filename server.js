//Usando Express para criar e configurar o servidor
const express = require('express')
const server = express()

const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Curso de Programação",
        category: "Estudo",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit neque corrupti distinctio",
        url: "#"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Exercícios",
        category: "Saúde",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit neque corrupti distinctio",
        url: "#"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Curso de Meditação",
        category: "Saúde da mente",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit neque corrupti distinctio",
        url: "#"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title: "karaokê",
        category: "Diversão em família",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit neque corrupti distinctio",
        url: "#"
    },
]

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
    return res.render("index.html", { ideas })
})

server.get("/ideias", function(req, res) {
    return res.render("ideias.html")
})

//Ligando servidor na porta 3000
server.listen(3000)