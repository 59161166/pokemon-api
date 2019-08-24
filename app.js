const express = require('express')
const app = express()
const pokemonRouter = require('./pokemons/router')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(pokemonRouter)

//https://pokemon.fandom.com/wiki/List_of_Pok%C3%A9mon


app.get('/', (req, res) => res.send({
    Message: 'Hello world'
}))

module.exports = app
