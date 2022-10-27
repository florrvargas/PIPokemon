// Importo las actions types necesarias

import { CLEAR_DETAILS_STATE, CLEAR_POKEMONS, CREATE_POKEMON, DELETE_POKEMON, FILTER_BY_ORIGIN, FILTER_BY_TYPE, GET_ALL_POKEMONS, GET_POKEMONS_TYPE, GET_POKEMON_DETAIL, GET_POKEMON_NAME, LOADING, ORDER_BY_ATTACK, ORDER_BY_NAME } from "../actions/actions"

const initialState = {
    pokemons: [],
    allPokemons: [], // copia del estado donde van a estar siempre todos los pokemones sin modificar el array.
    detail: [],
    types: [],
    loading: false,
    createdInDB: false
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

    case LOADING:
        return {
            ...state,
            loading: true
        }
        
    case GET_ALL_POKEMONS:
        return {
            ...state,
            pokemons: action.payload,
            allPokemons: action.payload,
            loading: false
        }

    case GET_POKEMONS_TYPE:
      return {
        ...state,
        types: action.payload,
      }

    case GET_POKEMON_DETAIL:
      return {
        ...state,
        detail: action.payload,
        loading: false
      }

    case CLEAR_DETAILS_STATE:
      return{
        ...state,
        detail: []
      }

    case GET_POKEMON_NAME:
      return {
        ...state,
        pokemons: action.payload,
      
      };

    case CREATE_POKEMON:
      return {
        ...state,
        //pokemons: state.pokemons.concat(action.payload),
      }; 

    case CLEAR_POKEMONS:
      return {
        ...state,
        pokemons: []
      }

    case DELETE_POKEMON:
      return {
        ...state,
        pokemons: state.pokemons.filter((pokemon) => pokemon.id !== action.payload),
      }

    case FILTER_BY_TYPE:
      const dbFilterTypes = state.allPokemons.filter((el) => el.createdInDB && el.types.some((t) => t.name === action.payload));
      const apiFilterTypes = state.allPokemons.filter((el) => !el.createdInDB && el.types.some((t) => t === action.payload));

      const allFilterTypes = dbFilterTypes.concat(apiFilterTypes);

      const typeFiltered = action.payload === "All" ? state.allPokemons : allFilterTypes;

      return {
        ...state,
        pokemons: typeFiltered,
      };

    case FILTER_BY_ORIGIN:
      const created = state.allPokemons.filter((el) => el.createdInDB)
      const fromApi = state.allPokemons.filter((el) => !el.createdInDB)
      return{
        ...state,
        createdInDB: true,
        pokemons: action.payload === "all"? state.allPokemons : action.payload === "created" ? created : fromApi 
      }
  
    case ORDER_BY_NAME:
      let sortedPokemons = 
        action.payload === "A-Z"? state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            })
               : state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name < b.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sortedPokemons
      };

    case ORDER_BY_ATTACK:
      let sortedArray =
        action.payload === "all"? state.allPokemons :
        action.payload === "weakest" ?
             [...state.pokemons].sort(function (a, b) {
              if (a.attack > b.attack) return 1; 
              if (a.attack < b.attack) return -1;
              return 0;
            })
           : [...state.pokemons].sort(function (a, b) {
              if (a.attack > b.attack) return -1;
              if (a.attack < b.attack) return 1;
              return 0;
            });
      return {
        ...state,
        pokemons: sortedArray
      };

    default:
      return { 
        ...state 
      };
  }
}

export default rootReducer;