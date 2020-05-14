//Usando Express para criar e configurar o servidor
const express = require('express')
const server = express()

const db = require("./db")
/*
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
*/

//Configurar arquivos estáticos.(css, scripts, imagens)
server.use(express.static("public"))

//Habilitar o uso req.body
server.use(express.urlencoded({ extended: true }))

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

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados.")
        }

        const reversedIdeas = [...rows].reverse()
    
        const lastIdeas = []
        for(let idea of reversedIdeas) {
            if(lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }

        return res.render("index.html", { ideas: lastIdeas })
    })
 
})

server.get("/ideias", function(req, res) {

    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados.")
        }    

        const reversedIdeas = [...rows].reverse()    
        return res.render("ideias.html", { ideas: reversedIdeas })
    })

})

server.post("/", function(req, res) {
    // Inserir dados na tabela
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES (?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]
    
    db.run(query, values, function(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados.")
        }

        return res.redirect("/ideias")
    })
})

//Ligando servidor na porta 3000
server.listen(3000)