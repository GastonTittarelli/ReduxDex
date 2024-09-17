import { Link } from "react-router-dom"
import "./buttons.css"

const ButtonPoke = () => {
    return (
        <div className="returnContainer">
            <p className="returnText">No tienes Pokemons favoritos aún</p>
                <div class="btn-bg Pokemon">
            <Link to="/" style={{textDecoration: 'none'}}>
                    <div class="btn-group">
                    <div class="btn ball">
                        <button className="button">
                            <div class="pokemon-ball"></div><a>Return to Pokedex<span data-letters="Go!"></span><span data-letters="Go!"></span></a>
                        </button>
                    </div>
                    </div>
            </Link>
                </div>
        </div>
    )
}

export default ButtonPoke