import { useState } from 'react';
import { Input } from "antd";
import "./Header.css";
import { CanvasAnimationShine } from '../utils/canvaEfects';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; 

const Searcher = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (value) => {
        setSearchTerm(value);
        onSearch(value);
    };

// Obtén los pokemons del estado de Redux
const pokemons = useSelector((state) => state.data.pokemons);
    
// Verifica si hay Pokémon favorito
const hasFavorites = pokemons.some(pokemon => pokemon.favorite);

    return ( 
        <div className='header'>
            <div id='contenedorCanva'>

                <CanvasAnimationShine/>
                <div className='imagenes'>
                    <img src="../Logo2.png" alt="Logo pokedex" className="logo"/>
                    <img src="../ditto.gif" alt="?" className="ditto" title='Dito has appeared!'/>
                    <span className="tooltiptext">???</span>
                </div>
                <Input.Search
                    className='buscador'
                    placeholder='Encuentra tus Pokemons aquí!'
                    onSearch={handleSearch}
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                />

                <Link to="/favoritos" className='favoritos'>
                    <img 
                        src={hasFavorites ? "../pokebola2.png" : "../pokebola.png" }
                        alt="pokebola" 
                        className="pokebola"
                        title='Favoritos'
                    />
                    <img src="../favGengar3.png" alt="gengarImg" className={hasFavorites ?'gengarAppears' : 'gengarHidden' }/>
                </Link>
            </div>
            
        </div>
    );
};

export default Searcher;