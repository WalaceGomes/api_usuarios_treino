import express from 'express' // 1 Vamos importar o express, biblioteca responsável pelas funções
import { PrismaClient } from '@prisma/client' //2 Importando o PrismaClient


const prisma = new PrismaClient() //2 Delarando o PrismaClient
const app = express() //1 Declarando o express como uma variável 

app.use(express.json()) //1 Adicionando json no express


//1 Enviando as informações pelo Post
app.post('/usuarios', async (req, res) => {
    
    await prisma.user.create ({
        data:{
            email:req.body.email,
            name:req.body.name,
            age:req.body.age
        }
    })

    res.status(201).json(req.body)
})

//1 Editando as informações pelo Post
app.put('/usuarios/:id', async (req, res) => {
    
    await prisma.user.update ({
        where: {
            id: req.params.id
        },
        data:{
            email:req.body.email,
            name:req.body.name,
            age:req.body.age
        }
    })

    res.status(201).json(req.body)
})

// Criando Rota Delete
app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete ({
        where: {
            id: req.params.id,
        },
    })

    res.status(200).json({message: 'Usuário deletado com sucesso!'})
})

//1 Listando as informações pelo Get 
app.get('/usuarios', async (req, res) => {

    let users = []
    if(req.query){
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    } else{
        users = await prisma.user.findMany()
    }

    

    res.status(200).json(users)
})

//1 Dizendo que nossa api vai rodar na porta 3000
app.listen(3000)


/*  cristianwgomes - rexgrd4s8PxiEjpV 
    mongodb+srv://cristianwgomes:rexgrd4s8PxiEjpV@users.izesd.mongodb.net/?retryWrites=true&w=majority&appName=Users
*/