const { Router } = require('express');
const { getAllPokemons, getById, newPokemon, deletePokemon } = require('../controllers/pokemon');

const router = Router();

//route GET
router.get('/', getAllPokemons);

//route GET by id
router.get('/:id', getById);

//route POST new pokemon
router.post('/', newPokemon);

// route DELETE pokemon
router.delete('/:id', deletePokemon)

module.exports = router;