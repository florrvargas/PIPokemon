import React, { useEffect, useState } from "react";
import '../Home/Home.css';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import titulo from '../../images/Fondos/title1.png';
import SearchBar from '../SearchBar/SearchBar';
import { useDispatch, useSelector } from "react-redux";
import { filterByType, filterCreated, getAllPokemons, getPokemonType, orderByAttack, orderByName } from "../../redux/actions/actions";
import Pagination from '../Pagination/Pagination'
import PokemonCard from "../PokemonCard/PokemonCard";
import pokemonTriste from '../../images/Fondos/charmanderTrist.png'

export default function Home(){
    
   
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [selectStrength, setSelectStrength] = useState("")
    const [selectName, setSelectName] = useState("")
    const [selectType, setSelectType] = useState("")
    const [selectCreated, setSelectCreated] = useState("")

    const [currentPage, setCurrentPage ] = useState(1) 
    const pokemonPerPage = 12                            

    const types = useSelector((state) => state.types)
    const allPokemons = useSelector((state) => state.pokemons)
    const lastPokemon= currentPage * pokemonPerPage
    const firstPokemon = lastPokemon - pokemonPerPage
    const currentPokemon = allPokemons.slice(firstPokemon, lastPokemon)
    
    const page = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // componentDidMount
    useEffect(() => {
        setLoading(true)
        dispatch(getAllPokemons())
        dispatch(getPokemonType())
    }, [dispatch])

    // actions functions

    function handleClick(e){
        e.preventDefault()
        setLoading(true)
        dispatch(getAllPokemons())
        setSelectStrength("")
        setSelectName("")
        setSelectCreated("")
        setSelectType("")
        
    }

    function handleFilterPokemonTypes(e) {
        dispatch(filterByType(e.target.value))
        setSelectType(e.target.value)
        setLoading(false)
    }
    
    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value))
        setSelectCreated(e.target.value)
        setLoading(false)
    }
    function sortByName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setSelectName(e.target.value)
    }
    
    function sortByAttack(e) {
        e.preventDefault();
        dispatch(orderByAttack(e.target.value));
        setSelectStrength(e.target.value)
    }

    return(

        <div className='container_home'>

            {/* <Loader/> */}

            <img className ='img' src ={titulo} alt='img not found'/>

            <SearchBar setLoading={setLoading}/>

            <div className="create_button">
                <Link to= '/pokemons' className="link">
                    <button className="create_button">Create your own Pokémon</button>
                 </Link>
            </div>


            <div className="selectors">

                <select value ={selectType} className='selector' onChange={e => handleFilterPokemonTypes(e)}>
                    <option value = "" hidden>FILTER BY TYPE</option>
                    <option value= 'All'>ALL</option>
                    {
                        types && types.map(type => {
                            return(
                                <option key={type} value = {type}>{type}</option>
                                )
                            })
                        }
                </select>

                <select value ={selectCreated} className='selector' onChange={e => handleFilterCreated(e)}>
                    <option value = "" hidden>FILTER BY ORIGIN</option>
                    <option value='all'>ALL POKEMONS</option>
                    <option value='created'>CREATED</option>
                    <option value='fromApi'>FROM API </option>
                </select>

                <select value={selectName} className='selector' onChange={e => sortByName(e)}>
                    <option value='' hidden>ORDER BY NAME</option>
                    <option value='A-Z'>A to Z</option>
                    <option value='Z-A'>Z to A</option>
                </select>

                <select value ={selectStrength} className='selector' onChange={e => sortByAttack(e)}>
                    <option value="" hidden >ORDER BY ATTACK</option>
                    <option value='all'>ALL</option>
                    <option value='strongest'>STRONGEST</option>
                    <option value='weakest'>WEAKEST</option>
                </select>
            </div>

            <button className='allPokemon_button' onClick={(e) => {handleClick(e)}}>Get all Pokémons</button>

            <Pagination
                pokemonPerPage={pokemonPerPage}
                allPokemons={allPokemons.length}
                page={page}
            />

            { 
               currentPokemon.length ? currentPokemon.map( (p) =>{
                    return (
                        <div className='pokemonsCard' key= {p.id} >
                            <Link to ={ "/pokemons/" + p.id}>
                            <PokemonCard 
                                name = {p.name.toUpperCase()}
                                id = {p.id}
                                image = {p.image}
                                types = {p.types}
                                createdInDB = {p.createdInDB}
                                weight = {p.weight}
                                height = {p.height}
                             />
                            </Link>
                        </div>
                    )
                }) : loading? <Loader/> :
                 <div className="error">
                    <h3 className='errorB'>No Pokémon avaliable</h3>
                    <img className='img_error' src={pokemonTriste} alt="img not found"/>
                 </div>
            } 
            
        </div>
    )
}