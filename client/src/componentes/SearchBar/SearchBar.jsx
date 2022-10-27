import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonName } from '../../redux/actions/actions';
import '../SearchBar/SearchBar.css';

export default function SearchBar({setLoading}){

    const [name, setName] = useState('')
    const dispatch = useDispatch()

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getPokemonName(name))
        setLoading(false)
        setName('')
    }

    return (
        <div className='searchBar'>
            <input  className = 'input' type = 'text' value = {name} placeholder = 'Search by name...' onChange = {(e) => handleInputChange(e)}/>
            <button className='button' type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}