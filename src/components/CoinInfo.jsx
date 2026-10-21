import { Link } from "react-router"

const CoinInfo = ({ id, image, name, symbol, price }) => {

    return (
        <li className="main-class" key={id}>
            <span className="coin-name">
                <Link 
                    style={{color : 'white'}}
                    to={`/coinDetails/${id}`}
                    key={id}
                >
                <img
                    className="icons"
                    src={image}
                    alt={`Small icon for ${name} crypto coin`}
                />
                {name}
                </Link>
            </span>
            <span className="coin-price">
                <Link 
                    style={{color : 'white'}}
                    to={`/coinDetails/${id}`}
                    key={id}
                >
                {price != null ? `$${price} USD` : null}
                </Link>
            </span>
        </li>
    );
}

export default CoinInfo
