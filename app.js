const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

//https://pokemon.fandom.com/wiki/List_of_Pok%C3%A9mon
class Pokemon{
    constructor(name,primaryType){
        this.name = name
        this.primaryType = primaryType
        this.id=null
        this.secondaryType = null
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
            res.send(poks[req.params.id-1])
}
    )

app.post('/pokemon', function (req, res) {
    if(isSufficientParam(req.body.name) 
    || isSufficientParam(req.body.primaryType)
        ){
        res.status(400).send({error:'Insufficient parameters : name and primaryType are required parameter'})
        return
    }
    let p=createPokemon(req.body.name,req.body.primaryType)
    poks.push(p)
    res.sendStatus(201)
  })

app.put('/pokemon/:id',function (req,res){
    if(!isSufficientParam(req.body.secondaryType)){
        res.status(400).send({error:'Insufficient parameter : secondaryType is required parameter'})
        return
    }
    editPokemon(req.params.id-1,req.body.name,req.body.primaryType,req.body.secondaryType)
    res.sendStatus(200)
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

function isSufficientParam(v){
    return v !== undefined && v !== null && v !== ''
}

function editPokemon(id,name,type,type2){
    if(isSufficientParam(name)){
    poks[id].name=name
    }
    if(isSufficientParam(type)){
    poks[id].primaryType=type
    }
    if(isSufficientParam(type2)){
    poks[id].secondaryType=type2
    }
}