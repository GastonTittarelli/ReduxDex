import { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchPokemonsWithDetails } from "../slices/dataSlice";
import "./home.css";
import Searcher from './Header';
import Loader from "./Loader";

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const pokemons = useSelector((state) => state.data.pokemons, shallowEqual);
    const loading = useSelector((state) => state.ui.loading);
    const dispatch = useDispatch();

        useEffect(() => {
            dispatch(fetchPokemonsWithDetails());
        }, [dispatch]);

    return (
        <div className="homeContainer">
            <Searcher onSearch={setSearchTerm} />

            {loading ? (
                
                    <Loader/>
                
            ) : (
                <PokemonList pokemons={pokemons} searchTerm={searchTerm} />
            )}
        </div>
    )
}

export default Home