import React from "react";
import '../Pagination/Pagination.css';

export default function Pagination({pokemonPerPage, allPokemons, page}){
  const pageNumbers = [];
  const cardsPerPage = Math.ceil(allPokemons/pokemonPerPage)
  for (let i = 1; i <= cardsPerPage; i++) {
    pageNumbers.push(i)
  }
  return (
         <nav>
        <div className="pagination">
            {pageNumbers && pageNumbers.map(number => {
              return (
                <p key={number}>
                    <button className="numbers" onClick={()=> page(number)}>{number}</button>
                </p>
            )})}
        </div>
         </nav>
  )
}