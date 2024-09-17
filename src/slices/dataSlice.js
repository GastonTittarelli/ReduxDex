import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPokemon, getPokemonDetails } from "../api";
import { setLoading } from "./uiSlice";

// Guardar en localStorage
const saveFavoritesToLocalStorage = (pokemons) => {
    const favorites = pokemons.filter(pokemon => pokemon.favorite);
    localStorage.setItem('favorites', JSON.stringify(favorites));
};

// Cargar desde localStorage
const loadFavoritesFromLocalStorage = () => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
};

const initialState = {
    pokemons: [],
};

// Thunk para obtener los pokemons con detalles
export const fetchPokemonsWithDetails = createAsyncThunk(
    "data/fetchPokemonsWithDetails",
    async (_, { dispatch }) => {
    dispatch(setLoading(true));

    // Lista de Pokémones
    const pokemonsRes = await getPokemon();

    // Detalles de cada Pokémon
    const pokemonDetailed = await Promise.all(
        pokemonsRes.map((pokemon) => getPokemonDetails(pokemon))
    );

    // Cargar los favoritos desde localStorage
    const favoritesFromStorage = loadFavoritesFromLocalStorage();

    // Mapear los Pokémon agregando el estado de favoritos y asegurando los sprites
    const updatedPokemons = pokemonDetailed.map((pokemon) => {
    const isFavorite = favoritesFromStorage.some(fav => fav.id === pokemon.id);
        
    // Asegurar que el campo sprites esté presente
    return { 
        ...pokemon, 
        favorite: isFavorite, 
        image: pokemon.sprites.front_default || "" // Verifica si tiene imagen
        };
    });

    // Guardar los Pokémon actualizados en el estado
    dispatch(setPokemons(updatedPokemons));
    dispatch(setLoading(false));
    }
);

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setPokemons: (state, action) => {
            state.pokemons = action.payload;
        },
        setFavorite: (state, action) => {
            const currentPokemonIndex = state.pokemons.findIndex((pokemon) => {
                return pokemon.id === action.payload.pokemonId;
            });
    
            if (currentPokemonIndex >= 0) {
                const isFavorite = state.pokemons[currentPokemonIndex].favorite;
                state.pokemons[currentPokemonIndex].favorite = !isFavorite;

                // Guardar los favoritos actualizados en localStorage
                saveFavoritesToLocalStorage(state.pokemons);
            }
        },
        // Nueva acción para eliminar todos los favoritos
        removeAllFavorites: (state) => {
            state.pokemons = state.pokemons.map(pokemon => ({
                ...pokemon,
                favorite: false
            }));
            // Limpiar favoritos en localStorage
            saveFavoritesToLocalStorage(state.pokemons);
        },
    },
});

export const { setFavorite, setPokemons, removeAllFavorites } = dataSlice.actions;

export default dataSlice.reducer;
