import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PokemonCard from './PokemonCard';
import { fetchPokemonsWithDetails, removeAllFavorites } from '../slices/dataSlice';
import { Link } from 'react-router-dom';
import "./favorite.css"
import ButtonPoke from './ButtonPoke';

const Favoritos = () => {
    const dispatch = useDispatch();

    // Obtener los Pokémon con el estado
    const pokemons = useSelector((state) => state.data.pokemons);

    // Cargar los Pokémon si no están cargados
    useEffect(() => {
        if (pokemons.length === 0) {
        dispatch(fetchPokemonsWithDetails());
        }
    }, [dispatch, pokemons]);

    // Filtrar los Pokémon favoritos
    const favoritos = pokemons.filter((pokemon) => pokemon.favorite);

    // Hay algún Pokémon favorito?
    const hasFavorites = pokemons.some(pokemon => pokemon.favorite);

    // Eliminar todos los favoritos
    const handleDeleteAllFavs = () => {
        dispatch(removeAllFavorites());
    };

    return (
        <div className='contenedorFavoritos'>
            <div className='headerFav'>
                <div className='contenedorBotones'>
                    <Link to="/" >
                        <div class="button-container-2">
                            <span class="mas">Go to my pokedex</span>
                            <button type="button" name="Hover">Go to my pokedex</button>
                        </div>
                    </Link>
                    
                    <div class="button-container-1">
                    {hasFavorites ? <span class="mas">Delete All Favs</span> : <span class="mas mas1">Delete All Favs</span> }
                        
                        <button onClick={handleDeleteAllFavs} id='work' type="button" name="Hover">Delete All Favs</button>
                    </div>
                </div>
            </div>

            {!hasFavorites ? (
                
                    <ButtonPoke/> 
                
            ) : (
                <div className="pokemonesFav">
                    {favoritos.map((pokemon) => (
                        <PokemonCard key={pokemon.id} {...pokemon} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favoritos;

