export const typeColors = {
    grass: '#78C850',
    poison: '#A040A0',
    fire: '#F08030',
    flying: '#A890F0',
    water: '#6890F0',
    bug: '#A8B820',
    normal: '#A8A878',
    electric: '#F8D030',
    ground: '#E0C068',
    fairy: '#EE99AC',
    fighting: '#C03028',
    psychic: '#F85888',
    rock: '#B8A038',
    steel: '#B8B8D0',
    ice: '#98D8D8',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
};

export const getPokemonCardColor = (types) => {
    if (types && types.length > 0) {
        const predominantType = types[0].type.name;
        return typeColors[predominantType] || '#fff';  // Color por defecto si no se encuentra el tipo
    }
    return '#fff';  
};