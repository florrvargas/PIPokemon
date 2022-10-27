import axios from 'axios';
import sweetalert from 'sweetalert';

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const LOADING = "LOADING";
export const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL";
export const CLEAR_DETAILS_STATE = "CLEAR_DETAILS_STATE";
export const GET_POKEMON_NAME = "GET_POKEMON_NAME";
export const GET_POKEMONS_TYPE = "GET_POKEMONS_TYPE";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const DELETE_POKEMON = "DELETE_POKEMON";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";
export const CLEAR_POKEMONS = "CLEAR_POKEMONS";

// Fijarse que la sintaxis de nuestra Action creator es distinta a lo que venimos haciendo. Esto es
// debido al uso del middleware "thunk", el cual nos permite trabajar con acciones asincrónicas.
// Necesitamos hacer uso de este middleware ya que nuestras peticiones al back siempre son asincrónicas,
// por lo tanto, necesitamos ese "delay" para despachar nuestra action hasta que la data nos llegue.
// Vas a tener que usar la funcion "dispatch" recibida en la funcion interna para despachar la action que
// va a llegar a nuestro reducer.

const url = 'http://localhost:3001/pokemon';
const urlType = 'http://localhost:3001/type';

export const getAllPokemons = () => (dispatch) => {
    dispatch({
        type: LOADING,
    })
    try {
        return axios.get(url)
        .then(respuesta => {
            dispatch({
                type: GET_ALL_POKEMONS,
                payload: respuesta.data
            })
        })
    } catch (error) {
        console.log(error)
        sweetalert({
            title: 'Something went wrong...',
            text: 'Please try again',
            icon: 'error',
            button: 'Try again'
        })
    }
}

//Buscar un pokemon por el id 
export const getPokemonDetail =(id) => dispatch => {
    dispatch({
      type: LOADING,
    });
    try {
      return axios.get(`${url}/${id}`)
        .then(respuesta =>{
          dispatch({
            type: GET_POKEMON_DETAIL,
            payload: respuesta.data,
          });
        })
    } catch (e) {
        console.log(e);
        sweetalert({
          title: 'Something went wrong...',
          text: 'Please try again',
          icon: 'error',
          button: 'Try again'
        }) 
    }
};

export const clearDetailsState = () => {
    return {
      type: CLEAR_DETAILS_STATE
    }
};

//Buscar un pokemon por el name pasado como parametro de la action creator.
export const getPokemonName = (name) => dispatch => {
    return axios.get(`${url}?name=${name}`)
    .then(respuesta => {
        dispatch({
            type: GET_POKEMON_NAME,
            payload: respuesta.data,
        });
    })
    .catch (e => {
        if (e.response) {
            sweetalert({
                title: 'Incorrect name',
                text: e.response.data.message,
               //text: 'Please enter a valid  pokemon name',
                icon: 'error',
                button: 'Aceptar'
            })
        }
    })
}; 

export const getPokemonType = () => (dispatch) => {
    return axios.get(urlType)
    .then(respuesta => {
        dispatch({
            type: GET_POKEMONS_TYPE,
            payload: respuesta.data
        })
    })
    .catch(error =>{
       console.log(error)
        sweetalert({
            title: 'Something went wrong...',
            text: 'Please try again',
            icon: 'error',
            button: 'Try again'
        })
    })
};

// Desde el componente ejecuto la action creator, pasandole como argumento los values que utilizo para crear el pokemon.
export const createNewPokemon = (payload) => async dispatch => {
    try {
        const respuesta = await axios.post(url, payload);
        dispatch({
            type: CREATE_POKEMON,
            payload: respuesta
        });
        sweetalert({
            text: "Pokemon succesfully created.",
            icon: 'success',
            button: 'Aceptar'
        });
        return respuesta;
    } catch (error) {
        sweetalert({
            title: 'Something went wrong...',
            text: 'Please try again',
            icon: 'error',
            button: 'Try again'
        });
        console.log(error);
    }
}

export const clearPokemons= () => {
    return {
      type: CLEAR_POKEMONS
    }
};

export const deletePokemon = (id) => async dispatch => {
    try {
        const respuesta = await axios.delete(`${url}/${id}`);
        dispatch({
            type: DELETE_POKEMON,
            payload: respuesta
        });

        sweetalert({
            text: 'Pokemon deleted successfuly',
            icon: 'success',
            timer: '2000'
        }); 
    } catch (error) {
        console.log(error);
        sweetalert({
            title: 'Something went wrong...',
            text: 'Please try again',
            icon: 'error',
            button: 'Try again'
        });
    }
};

export const filterByType = (payload) => {
    return {
     type: FILTER_BY_TYPE,
     payload,
    };
}

export const filterCreated = (payload) => {
    return {
      type: FILTER_BY_ORIGIN,
      payload,
    };
}

export const orderByName = (payload)  =>{
    return {
      type: ORDER_BY_NAME,
      payload,
    };
}

export const orderByAttack = (payload)  =>{
    return {
      type: ORDER_BY_ATTACK,
      payload,
    };
}