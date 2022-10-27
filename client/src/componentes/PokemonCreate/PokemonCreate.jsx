import React, { useEffect, useState } from 'react';
import '../PokemonCreate/PokemonCreate.css';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { clearPokemons, createNewPokemon, getPokemonType } from '../../redux/actions/actions';


export default function PokemonCreator() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types)
  const [state, setState] = useState({
    name: '',
    height:'',
    weight:'',
    hp: '',
    speed : '',
    attack: '',
    defense: '',
    image: '',
    types: [],
    createdInDB: ''
  })
      
  const [error, setError] = useState({});

  function validate(state) {
    let error = {};
    if (!state.name.match(/^[A-Za-z]+$/) ) {
      error.name = "Name must be filled with alphabets only";
    }
    if (state.height < 0) {
      error.height = "Height must be a number greater than 0";
    }
    if(state.weight < 0){
      error.weight = "Weight must be a number greater than 0";
    }
    if(state.hp < 0  ){
      error.hp = "Hp must be a number greater than 0";
    }
    if(state.speed < 0 ){
      error.speed = "Speed must be a number greater than 0";
    }
    if(state.attack < 0  ){
      error.attack = "Stength must be a number greater than 0";
    }
    if(state.defense < 0  ){
      error.defense = "Defense must be a number greater than 0";
    }
    if(!state.types.length){
      error.types = "Must select at least one type";
    }
    return error;
  }
      
  useEffect(() => {
    dispatch(getPokemonType());
  }, [dispatch]);

  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createNewPokemon(state))
    
    setState({
      name: '',
      height: 0,
      weight: 0,
      hp: 0,
      speed: 0,
      attack: 0,
      defense:0,
      image: '' ,
      types: [],
    })
    dispatch(clearPokemons(dispatch));
    history.push('/home')
  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(state)
    setError(
      validate({
        ...state,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e){
    setState({
      ...state,
      types : [...state.types, e.target.value ]
    })
    setError(
      validate({
      ...state,
      types : [...state.types, e.target.value ]
    }))
  }

  function handleDelete(el){
    const newArr = state.types.filter(type => type !== el)
    setState({
      ...state, 
      types: newArr
    })
    setError(validate({
      ...state,
      types: newArr
    }))
  }

    
  return (
      <div className='container'>
        <NavLink to="/home">
          <button className='home_button'>Back to home</button>
        </NavLink>

        <h1 className='title'>Create your own Pokémon!</h1>

        <form className='form' onSubmit={(e) => handleSubmit(e)}>
          <legend className='legend'>Datos del Pokémon</legend>
          <div>
            <div className='line'>
            <label className='label'>* Name: </label>
            <input 
            className='input' 
            type="text" 
            name="name" 
            value={state.name} 
            placeholder='Name only with alphabets...'  
            onChange={(e) => handleChange(e)}  
            required 
            autoComplete='off'></input>
            </div>
            {error.name && <p className='error'>{error.name}</p>}
          </div>

          <div>
          <div className='line'>
            <label className='label'>Height: </label>
            <input
              className='input'
              type="number"
              name="height"
              value={state.height}
              placeholder='Number grater than 0...'
              onChange={(e) => handleChange(e)}
            />
            </div>
            {error.height && <p className='error'>{error.height}</p>}
          </div>

          <div>
          <div className='line'>
            <label className='label'>Weight: </label>
            <input
              className='input'
              type="number"
              name="weight"
              value={state.weight}
              placeholder='Number grater than 0...'
              onChange={(e) => handleChange(e)}
            />
            </div>
            {error.weight && <p className='error'>{error.weight}</p>}
          </div>

          <div>
          <div className='line'>
            <label className='label' >Hp: </label>
            <input
             className='input'
              type="number"
              name="hp"
              value={state.hp}
              placeholder='Number grater than 0...'
              onChange={(e) => handleChange(e)}
            />
            </div>
            {error.hp && <p className='error'>{error.hp}</p>}

          </div>
          <div>
          <div className='line'>
            <label className='label'>Speed: </label>
            <input
              className='input'
              type="number"
              name="speed"
              value={state.speed}
              placeholder='Number grater than 0...'
              onChange={(e) => handleChange(e)}
            />
            </div>
            {error.speed && <p className='error'>{error.speed}</p>}

          </div>
          <div>
          <div className='line'>
            <label className='label'>Atack: </label>
            <input
              className='input'
              type="number"
              name="attack"
              value={state.attack}
              placeholder='Number grater than 0...'
              onChange={(e) => handleChange(e)}
            />
            </div>
            {error.attack && <p className='error'>{error.attack}</p>}

          </div>
          <div>
          <div className='line'>
            <label className='label'>Defense: </label>
            <input
              className='input'
              type="number"
              name="defense"
              value={state.defense}
              placeholder='Number grater than 0...'
              onChange={(e) => handleChange(e)}
            />
            </div>
            {error.defense && <p className='error'>{error.defense}</p>}

          </div>
          <div className='line'>
            <label className='label'>Image: </label>
            <input
              className='input'
              type="text"
              name="image"
              value={state.image}
              placeholder="add link"
              onChange={(e) => handleChange(e)}
              autoComplete='off'
            />
          </div>

          <div>
          <div className='line'>
            <label className='label_types'>* Types: </label>
            <select 
            className='input' 
            onChange={(e) => handleSelect(e)} >
              <option value="" hidden>
                Select type
              </option>
              {types && types.map((type) => (<option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            </div>
            {error.types && <p className='error'>{error.types}</p>}
          </div>
                  {/*hago un <p> con los types que el usuario selecciono */}
          <div className='selectedByUser'>
        {state.types.map((type) => (
          type ?
          <div key={type} className='types'>
          <p >{type}</p>
            <button className='delete_button' onClick={() => handleDelete(type)}>x</button>
          </div>
          : null
          
        ))}
          </div>

          <button className='create_button' type="submit" disabled={Object.keys(error).length}>Create Pokemon</button>
        </form>
      
      </div>
    );
}
