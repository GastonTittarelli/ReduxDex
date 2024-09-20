import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard.jsx';
import './PokemonList.css';

const PokemonList = ({ pokemons, searchTerm }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonsPerPage = 24;

    // Resetea la página a 1 cuando el término de búsqueda cambia
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);
    
    const filteredPokemons = pokemons.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calcular los índices
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    // Calcular número de páginas
    const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className='PokemonList'>
                {currentPokemons.map((pokemon) => (
                    <PokemonCard 
                        name={pokemon.name} 
                        key={pokemon.name} 
                        image={pokemon.image}
                        types={pokemon.types}
                        id={pokemon.id}
                        favorite={pokemon.favorite}
                        weight={pokemon.weight}
                        height={pokemon.height}
                    />
                ))}
            </div>
            <div className='Pagination'>
                {Array.from({ length: totalPages }, (_, index) => (
                    <div className='contenedorPokeButtons'>
                        <img 
                        className={currentPage === index + 1 ? 'pokeButtonImgAct' : 'pokeButtonImg'} 
                        src={currentPage === index + 1 ? require("../../public/pokeButtonAct.png") : require("../../public/pokeButton.png")} 
                        alt="Button Poke" />
                        <button 
                            key={index + 1} 
                            onClick={() => paginate(index + 1)}
                            className={currentPage === index + 1 ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

PokemonList.defaultProps = {
    pokemons: Array(10).fill(""),
};

export default PokemonList;
