const axios = require('axios');
const { Type } = require('../db');

const api = 'https://pokeapi.co/api/v2/type';

async function getTypes (req, res){
    try{
        const apiType = await axios.get(api);
        const apiResults = apiType.data.results;
    
        const types = apiResults.map((type)=> type.name)
        types.forEach(type => {
            Type.findOrCreate({
                where: {
                    name: type,
                }
            })
        })
        return res.status(200).send(types);
    } catch (error) {
        res.status(404).send(error)
    }
}

module.exports = {
    getTypes
}