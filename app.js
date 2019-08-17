const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())


class Pokemon{
    constructor(name,primaryType){
        this.name = name
        this.primaryType = primaryType
        this.id=null
    }
    echo(){
        console.log(`This is ${this.name} primary is ${this.primaryType}`)
    }
}

var poks = []

poks.push(createPokemon('Fushigidane','Grass'))
poks.push(createPokemon('Lizardon','Fire'))
poks.push(createPokemon('Pigeon','Normal'))

app.get('/pokemons',(req,res) => res.send(poks))

app.get('/pokemon/:id',(req,res) => {
    poks.forEach(function(item){
        if(item.id===req.params.id){
            res.send(item)
        }
    })
    res.send(poks[req.params.id])
}
    )

app.post('/pokemon', function (req, res) {
    let p=createPokemon(req.body.name,req.body.primaryType)
    poks.push(p)
    res.sendStatus(201)
  })

app.listen(port,() => console.log(`Example app listening on port ${port}!`))

function genId(num){
    let newId=num+1+""
    return newId
}

function createPokemon(name,type){
    let p = new Pokemon(name,type)
    p.id=genId(poks.length)
    return p
}