import '../PokemonCard/PokemonCard.css';
import React from 'react';
import image404 from '../../images/404NotFound/descarga (4).jpg';
import { useDispatch } from 'react-redux';
import { clearPokemons, deletePokemon } from '../../redux/actions/actions';
import { useHistory } from 'react-router-dom';


export default function PokemonCard({id, name, image, types, createdInDB, height, weight }){ 

    
    const history = useHistory()
    const dispatch = useDispatch()
 
    function handleSubmit(e){
        e.preventDefault()
        dispatch(deletePokemon(id))
        dispatch(clearPokemons(dispatch));
        history.push('/home')
    }
    

    return (
        <div className='pokemonsCards'>
            <div className='description'>
               <img src={image ? image : image404} alt = "img not found" width = "260px" height= "260px"/>
               <h2 className='titleCard'>{name}</h2>
               <h4 className='typesCard'>Type: {createdInDB ? types.map((el) => el.name + ' ' ) : types + ' ' } </h4> 
               <h4>Weight: {weight}</h4>
               <h4>Height: {height}</h4>
               {createdInDB ? <button className="button" type="text" onClick={(e)=> handleSubmit(e)}> Delete </button> : null
               } 
            </div>
        </div>
        
    )
}