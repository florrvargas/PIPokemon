// Puedo usar estas funciones fuera de las rutas, y no haria falta repetir funcionalidades.
const axios = require('axios');
const { v4: uuidv4 } = require('uuid') 
const { Pokemon, Type } = require('../db');

const api= 'https://pokeapi.co/api/v2/pokemon/?limit=40';

async function apiRequest() {
    try {
        const apiPokemon = await axios.get(api);
        const apiResults = apiPokemon.data.results;
        const subRequest = apiResults.map(pokemon => axios.get(pokemon.url));
        const results = await Promise.all(subRequest);

        const pokemons = results.map((pokemon)=> {
            return {
                id: pokemon.data.id,
                name: pokemon.data.name,
                hp: pokemon.data.stats[0].base_stat,
                attack: pokemon.data.stats[1].base_stat,
                defense: pokemon.data.stats[2].base_stat,
                speed: pokemon.data.stats[5].base_stat,
                height: pokemon.data.height,
                weight: pokemon.data.weight,
                image: pokemon.data.sprites.other.home.front_default,
                types: pokemon.data.types.map((el)=> el.type.name)
            }
        })
        return pokemons;
    } catch (error) {
        console.log(error);
    }
}

//Pokemons in DB
async function dbPokemons(){
    return await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
}

async function getAllPokemons(req, res){
    const { name } = req.query;

    const myPokemons = await dbPokemons();
    const apiPokemons = await apiRequest();
    const allPokemons = myPokemons.concat(apiPokemons);

    try {
        if(name){
            let pokemonByName = allPokemons.filter((pokemon)=> pokemon.name.toUpperCase() === name.toUpperCase());
            if(pokemonByName.length > 0) res.status(200).send(pokemonByName);
            else res.status(404).send(`Pokemon with name: "${name}" not found :(`);
        } else {
            res.status(200).send(allPokemons);
        }
    } catch (error) {
        res.satus(404).send(error);
    }
}

async function getById (req, res) {
    const { id } = req.params;

    const myPokemons = await dbPokemons();
    const apiPokemons = await apiRequest();
    const allPokemons = myPokemons.concat(apiPokemons);

    try {
        if(id) {
            let pokemonById = allPokemons.filter((pokemon)=> pokemon.id.toString() === id.toString());
            if(pokemonById.length > 0) res.status(200).send(pokemonById);
            else res.status(404).send(`Pokemon with id: "${id}" not found :(`)
        }
    } catch (error) {
        res.status(404).send(error);
    }
}

//---------------
//POKEMONS IN DB:
//---------------

async function newPokemon(req, res){
    const { name, height, weight, hp, speed, attack, defense, image, types} = req.body;
    

    try {
        const newPokemon = await Pokemon.create({
            name,
            height,
            weight,
            hp,
            speed,
            attack,
            defense,
            image,
            id: uuidv4()
        })
        const typeDB = await Type.findAll({
            where: {
                name: types
            }
        })
        console.log(newPokemon)
        newPokemon.addType(typeDB)
        return res.status(200).send(newPokemon)
    } catch (error) {
        res.send(error)
    }
}

function deletePokemon(req, res){
    const { id } = req.params;
     Pokemon.destroy({
        where:{id}
    })
    .then(()=> { res.status(200).send(`Pokemon ${id} deleted correctly.`)})
    .catch((error)=> res.send(error))
}

module.exports= {
    getAllPokemons,
    getById,
    newPokemon,
    deletePokemon
}