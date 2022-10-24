import React, { useState, useEffect } from "react";
import '../src/pokemon.css';

function Pokemon({
    name,
    url
}){
    const [showPokemonInfo, setShowPokemonInfo] = useState(false);
    const [types, setTypes] = useState([]);
    const [stats, setStats] = useState([]);
    const [moves, setMoves] = useState([]);
    const [image, setImage] = useState('');
    const [defenitionUrl, setDefenitionUrl] = useState('');

    const handleDetails = () => {
        setShowPokemonInfo(!showPokemonInfo)
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const { species, types, stats, moves, sprites } = data;
                setTypes(types);
                setStats(stats);
                setMoves(moves);
                setImage(sprites.front_default)
                setDefenitionUrl(species.url)
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        fetch(defenitionUrl)
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }, [defenitionUrl])

    return (
        <div className="all-info">
            <button className="all-info__name" onClick={() => handleDetails()}>{name}</button>
            {showPokemonInfo && <div className="all-info__menu">
                <p className="all-info__menu__types">Types: {types.map(item => <p>{item.type.name}.</p>)}</p>
                {stats.map(item => {
                    return (
                        <div className="all-info__menu__details">
                            <p className="all-info__menu__details__effort"><span>Effort:</span> {item.effort}</p>
                            <p className="all-info__menu__details__item">{item.stat.name}:</p>
                            <p className="all-info__menu__details__stat">{item.base_stat}</p>
                        </div>
                    )
                })}
                <div className="all-info__menu__inf">
                    {moves.map(item => item.move.name)}
                    <img className="all-info__menu__inf__img" src={image} alt="Frontal"></img>
                </div>
            </div>
            }
        </div>
    );
}
export default Pokemon;