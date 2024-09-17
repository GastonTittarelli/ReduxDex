import { Card, Modal } from "antd";
import { useDispatch } from 'react-redux';
import Meta from 'antd/es/card/Meta';
import StarButton from './StarButton';
import { setFavorite } from "../slices/dataSlice.js";
import { getPokemonCardColor }  from "../utils/colors.js"
import IndividualPokemon from "./individualPokemon.jsx";

import './PokemonCard.css';  
import { useState } from 'react';

const PokemonCard = ({ name, image, types, id, favorite, weight, height }) => {
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Obtener el color predominante basado en el primer tipo del Pokémon
    const cardColor = getPokemonCardColor(types);

    // Formatear el nombre para que la primera letra sea mayúscula
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

    // Formatear el número del Pokémon con 3 cifras
    const formattedId = String(id).padStart(3, '0');

    // Formatear los tipos de Pokémon con la primera letra mayúscula y separados por " / "
    const formattedTypes = types
        .map((elem) => elem.type.name.charAt(0).toUpperCase() + elem.type.name.slice(1))
        .join(' / ');

    // Función de formateo
    const formatNumber = (number) => {
        return Number(number).toFixed(1).replace(/\.0$/, '');
    };
    // Convertir el peso y la altura a las unidades correctas y formatear
    const convertedWeight = formatNumber(weight / 10); // Si el peso está en hectogramos
    const convertedHeight = formatNumber(height / 10);

    const handleOnFavorite = () => {
        dispatch(setFavorite({ pokemonId: id }));
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Card className="pokemon-card"
                style={{borderColor: cardColor}}
                title={
                    <div className="card-title">
                        <span className="pokemon-number">#{formattedId}</span>
                        <StarButton isFavorite={favorite} onClick={handleOnFavorite} className="favorite-button" />
                    </div>
                }
                cover={
                    <div className="pokemon-card-link"
                    style={{'--color': cardColor}}>
                        <img src={image} alt={name} className="pokemon-image" onClick={showModal} />
                    </div>
                }
            >
                <Meta 
                    title={formattedName} 
                    className="pokemon-name"
                />
                <div className="pokemon-info">
                    <div className="pokemon-stat">
                        <span className="stat-title">Weight</span>
                        <br />
                        <span className="stat-value">{convertedWeight} kg</span>
                    </div>
                    <div className="pokemon-stat">
                        <span className="stat-title">Height</span>
                        <br />
                        <span className="stat-value">{convertedHeight} m</span>
                    </div>
                </div>
                <div className="pokemon-types">
                    <span className="type-label">Type: </span> 
                    <span className="types">
                        {formattedTypes}
                    </span>
                </div>
            </Card>

            <Modal 
                open={isModalVisible} 
                onOk={handleOk} onCancel={handleCancel}
                footer={null}
            >
                <IndividualPokemon id={id}/>
            </Modal>
            </>
    );
}

export default PokemonCard;
