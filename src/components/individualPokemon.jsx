import { useEffect, useState } from 'react';
import { getPokemon, getPokemonDetails } from '../api/index'; 
import "./individualPokemon.css"
import { CanvasAnimationIcon } from '../utils/canvaIcons';
import { getPokemonCardColor } from '../utils/colors';

const IndividualPokemon = ({ id }) => {
    const [pokemonData, setPokemonData] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Obtiene los detalles del Pokémon
        const fetchPokemon = async () => {
            try {
                // Obtener todos los Pokémon
                const allPokemons = await getPokemon(); 
                // Pokémon por id
                const pokemonData = allPokemons.find(p => p.url.includes(`/${id}/`));
                if (pokemonData) {
                    const details = await getPokemonDetails(pokemonData);
                    setPokemonData(details);
                    setLoading(false);
                } else {
                    console.error('Pokémon not found');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!pokemonData) return <div>Pokémon not found</div>;

    // Primera letra mayúscula y separados por " / "
    const formattedTypes = pokemonData.types
        .map((elem) => elem.type.name.charAt(0).toUpperCase() + elem.type.name.slice(1))
        .join(' / ');

    // Estadísticas del Pokémon
    const stats = pokemonData.stats.reduce((acc, stat) => {
        acc[stat.stat.name] = stat.base_stat;
        return acc;
    }, {});

    // Valor máximo para las estadísticas
    const maxStatValue = 255;

    // Función para calcular el porcentaje de la barra de progreso
    const getProgressPercentage = (value) => (value / maxStatValue) * 100;

    // Obtener el color predominante basado en el tipo del Pokémon
    const cardColor = getPokemonCardColor(pokemonData.types);

    // Formatear el nombre para que la primera letra sea mayúscula
    const formattedName = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);

    return (
        <div className='individualContainer' style={{'--color': cardColor}}>
            
            <div className="pokemonIndividual" >
                <div className="basicInfo">
                    <div className='contenedorImagen'>
                        <img src={pokemonData.sprites.front_default} alt={pokemonData.name} className="pokemonImagen" />
                        <CanvasAnimationIcon pokemonTypes={pokemonData.types.map((elem) => elem.type.name)} />
                    </div>

                    <div className='dimension'>
                        <div className='peso'>
                            <span className="statTitle">Weight</span>
                            <br />
                            <span className="statValue">{pokemonData.weight / 10} kg</span> {/* Dividir por 10 para obtener el valor en kg */}
                        </div>

                        <div className='altura'>
                            <span className="statTitle">Height</span>
                            <br />
                            <span className="statValue">{pokemonData.height / 10} m</span> {/* Dividir por 10 para obtener el valor en m */}
                        </div>
                    </div>
                    
                    <div className='tipo'>
                        <span className="typLabel">Type: </span> 
                        <span className="type">
                            {formattedTypes}
                        </span>
                    </div>
                </div>

                <div className="statsInfo">
                    <h3 className='mainTitle'>Stats</h3>
                    {Object.keys(stats).map((statName) => (
                        <div className='stat' key={statName}>
                            <span className="statTitle1">
                                <span className="statName1">{statName.charAt(0).toUpperCase() + statName.slice(1)}:</span> 
                                <span className="statValue"> {stats[statName]}</span>
                            </span>
                            <br />
                            <div className="progress-bar-container">
                                <div 
                                    className="progress-bar" 
                                    style={{ width: `${getProgressPercentage(stats[statName])}%` }}
                                />
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <h2 className='pokeTitle'>{formattedName}</h2>
        </div>
    );
}

export default IndividualPokemon;
