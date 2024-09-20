import "./loader.css"

const Loader = () => {
    return (
        <div className="loaderContainer">
            <h2 class="loadingTitle">
                <span>L</span><span>O</span><span>A</span><span>D</span><span>I</span><span>N</span><span>G</span>
            </h2>
            <div className="loader">
                <img className="loaderImg" src={require('../../public/loader/loader3.gif')} alt="" />
            </div>
        </div>
    )
}

export default Loader