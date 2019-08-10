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
    }
    echo(){
        console.log(`This is ${this.name} primary is ${this.primaryType}`)
    }
}
var pok1 = new Pokemon('Fushigidane','Grass')
var pok2 = new Pokemon('Lizardon','Fire')
var pok3 = new Pokemon('Pigeon','Normal')

var poks = []

poks.push(pok1)
poks.push(pok2)
poks.push(pok3)

app.get('/pokemons',(req,res) => res.send(poks))

app.get('/pokemons/:id',(req,res) => {
    res.send(poks[req.params.id])
}
    )

app.post('/pokemons', function (req, res) {
    poks.push(req.body)
    res.sendStatus(201)
  })

app.listen(port,() => console.log(`Example app listening on port ${port}!`))