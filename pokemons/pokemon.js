class Pokemon {
    constructor(name, primaryType) {
        this.name = name
        this.primaryType = primaryType
        this.id = null
        this.secondaryType = null
    }
    echo() {
        console.log(`This is ${this.name} primary is ${this.primaryType}`)
    }
}

function createPokemon(name, type) {
    let p = new Pokemon(name, type)
    p.id = genId(poks.length)
    return p
}

function genId(num) {
    let newId = num + 1 + ""
    return newId
}

function isPokemonExisted(id) {
    return poks[id] !== undefined
}

function editPokemon(id, name, type, type2) {
    
        poks[id].name = name
    
        poks[id].primaryType = type
    
        poks[id].secondaryType = type2
    
    return true
}

function deletePokemon(id){
    delete poks[id]
    return true
}

var poks = []


function mockPokemon(){
poks.push(createPokemon('Fushigidane', 'Grass'))
poks.push(createPokemon('Lizardon', 'Fire'))
poks.push(createPokemon('Pigeon', 'Normal'))
}

function savePokemon(name,type){
    let p = createPokemon(name,type)
    poks.push(p)
    return true
}

function getPokemon(id){
    return poks[id]
}

function getAllPokemon(){
    return poks
}

// function isSufficientParam(v) {
//     return v !== undefined && v !== null && v !== ''
// }

module.exports.mockPokemon = mockPokemon
module.exports.savePokemon = savePokemon
module.exports.getPokemon = getPokemon
module.exports.genId = genId
module.exports.isPokemonExisted = isPokemonExisted
module.exports.editPokemon = editPokemon
module.exports.getAllPokemon = getAllPokemon
module.exports.deletePokemon = deletePokemon