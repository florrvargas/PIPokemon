import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import  Loader  from '../Loader/Loader';
import { NavLink, useParams } from "react-router-dom";
import { clearDetailsState,  getPokemonDetail } from "../../redux/actions/actions";
import '../PokemonDetails/PokemonDetail.css';
import pokemontriste from '../../images/404NotFound/pokemontriste.jpg'

export default function PokemonDetail(){
    const dispatch = useDispatch();
    const params = useParams();
    const pokemon = useSelector((state)=> state.detail)


    useEffect(() => {
        dispatch(getPokemonDetail(params.id))
        return () => {
            dispatch(clearDetailsState())
        }
    }, [dispatch, params.id])

    return (
        <div className="page">
            {!pokemon.length > 0 ? <Loader /> :
            <div>
                <NavLink to='/home' className='link' >
                    <button className="home_button">Back to home</button>
                </NavLink>

                <div className="containerDetail">
                    <div className="information">
                        <h2 className="titleDetail">{pokemon[0].name.toUpperCase()}</h2>
                        <img className="img" src={pokemon[0].image ? pokemon[0].image : pokemontriste } alt= "img not found" width = "260px" height= "auto"/>
                        <p className="types">Type: {
                            pokemon[0].types ? !pokemon[0].createdInDB ? pokemon[0].types + ' ' : pokemon[0].types.map(el => el.name + ' ') : "No type for this pokemon."}
                        </p>
                        <div className="stats">
                        <h4 className="subtitle">Stats:</h4>
                        <ul>
                            <li>Hp: {pokemon[0].hp}</li>
                            <li>Attack: {pokemon[0].attack}</li>
                            <li>Defense: {pokemon[0].defense}</li>
                            <li>Speed: {pokemon[0].speed}</li>
                            <li>Height: {pokemon[0].height}</li>
                            <li>Height: {pokemon[0].height}</li>
                            <li>Weight: {pokemon[0].weight}</li>
                        </ul>
                        </div>
                        
                    </div>
                </div>
            </div>
            }

        </div>
    )
    
}

   