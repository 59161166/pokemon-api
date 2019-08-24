const express = require('express')
const router = express.Router()
const pokemon = require('./pokemon')


pokemon.mockPokemon()

router.get('/pokemons', (req, res) => res.send(pokemon.getAllPokemon()))

router.get('/pokemon/:id', (req, res) => {

    if (!isSufficientParam(req.params.id)) {
        res.status(400).send({
            error: 'Insufficient parameter : id is required parameter'
        })
        return
    }

    let id = req.params.id
    id = id - 1
    if (!pokemon.isPokemonExisted(id)) {
        res.status(400).send({
            error: 'Pokemon is not found'
        })
        return
    }
    res.send(pokemon.getPokemon(id))
})

router.post('/pokemon', function (req, res) {
    if (!isSufficientParam(req.body.name) ||
        !isSufficientParam(req.body.primaryType)
    ) {
        res.status(400).send({
            error: 'Insufficient parameters : name and primaryType are required parameter'
        })
        return
    }
    // let p = pokemon.createPokemon(req.body.name, req.body.primaryType)
    let success = pokemon.savePokemon(req.body.name, req.body.primaryType)
    if(!success){
        res.status(400).send({error:'Create Pokemon is unsuccesfully'})
        return
    }
    res.sendStatus(201)
})

router.put('/pokemon/:id', function (req, res) {
    let id = req.params.id
    if (!isSufficientParam(req.body.secondaryType)) {
        res.status(400).send({
            error: 'Insufficient parameter : secondaryType is required parameter'
        })
        return
    }
    id = id - 1
    if (!pokemon.isPokemonExisted(id)) {
        res.status(400).send({
            error: 'Pokemon is not found'
        })
        return
    }
    let success = pokemon.editPokemon(id, req.body.name, req.body.primaryType, req.body.secondaryType)
    if(!success){
        res.status(500).send({ error: 'Update pokemon is unsuccessfully'})
        return
    }

    res.sendStatus(200)
})

router.delete('/pokemon/:id', (req, res) => {
    let id = req.params.id
    if (!isSufficientParam(id)) {
        res.status(400).send({
            error: 'Insufficient parameter : id is required parameter'
        })
        return
    }
    id = id - 1
    if (!pokemon.isPokemonExisted(id)) {
        res.status(400).send({
            error: 'Pokemon is not found'
        })
        return
    }
    let success = pokemon.deletePokemon(id)
    if(!success){
        res.status(500).send({ error: 'Delete pokemon is unsuccessfully'})
        return
    }
    res.status(200).send("deleted")
})

function isSufficientParam(v) {
    return v !== undefined && v !== null && v !== ''
}

module.exports = router