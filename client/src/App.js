// App.js

import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [playerTag, setPlayerTag] = useState('');
    const [playerData, setPlayerData] = useState(null);
    const [error, setError] = useState('');

    const isDataFetched = playerData !== null && playerData.name !== undefined;

    const getPlayerDetails = () => {
        axios
        .get(`http://localhost:3000/${playerTag}`)
        .then((response) => {
            setPlayerData(response.data);
            setError('');
        })
        .catch((err) => {
            setError(err.response.data.message || 'Player Not Found');
            setPlayerData(null);
        });
    }

    return (
        <div className="container">
            <div className="form">
                <input
                    type="text"
                    className="form__input"
                    placeholder="Enter Player Tag"
                    value={playerTag}
                    onChange={(e) => setPlayerTag(e.target.value)}
                />
                <button className="form__submit" onClick={getPlayerDetails}>Get Details</button>
            </div>

            {error && <div className="error">{error}</div>}

            {isDataFetched && (
                <div className="details">
                    <div className="details__item">
                        <div className="details__title">Player Name</div>
                        <div className="details__value">{playerData.name}</div>
                    </div>
                    <div className="details__item">
                        <div className="details__title">Trophies</div>
                        <div className="details__value">{playerData.trophies}</div>
                    </div>
                    {/* Render other player details similarly */}
                </div>
            )}
        </div>
    );
}

export default App;
