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
                        <div className="details__title"><h3>Player Icon</h3></div>
                        <div className="details__value"><img src={`https://cdn.brawlstats.com/player-thumbnails/${playerData.icon.id}.png`} alt="Player Icon"/></div>
                    </div>
                    <div className="details__item">
                        <div className="details__title"><h3>Player Name</h3></div>
                        <div className="details__value">{playerData.name}</div>
                    </div>
                    <div className="details__item">
                        <div className="details__title"><h3>Player Club</h3></div>
                        <div className="details__value">{playerData.club.name}</div>
                    </div>
                    <div className="details__item">
                        <div className="details__title"><h3>Player Tag</h3></div>
                        <div className="details__value">{playerData.tag}</div>
                    </div>
                    <div className="details__item">
                        <div className="details__title"><h3>Player Trophies</h3></div>
                        <div className="details__value">{playerData.trophies}</div>
                    </div>
                    <div className="details__item">
                        <div className="details__title"><h3>Player Highest Trophies</h3></div>
                        <div className="details__value">{playerData.highestTrophies}</div>
                    </div>
                    <div className="details__item">
                        <div className="details__title"><h3>Player Level</h3></div>
                        <div className="details__value">{playerData.expLevel}</div>
                    </div>
                    {/* <div className="details__item">
                        <div className="details__title"><h3>Player Unlocked Brawlers</h3></div>
                        <div className="details__value"></div>
                    </div>
                    <div className="details__item">
                        <div className="details__title"><h3>Player Points to MAX</h3></div>
                        <div className="details__value"></div>
                    </div>
                    <div className="details__item">
                        <div className="details__title"><h3>Player Coins to MAX</h3></div>
                        <div className="details__value"></div>
                    </div> */}
                    <div className="details__item">
                        <div className="details__title"><h3>Player Solo Wins</h3></div>
                        <div className="details__value">{playerData.soloVictories}</div>
                    </div>
                    <div className="details__item">
                        <div className="details__title"><h3>Player Duo Wins</h3></div>
                        <div className="details__value">{playerData.duoVictories}</div>
                    </div>
                    <div className="details__item">
                        <div className="details__title"><h3>Player 3vs3 Wins</h3></div>
                        <div className="details__value">{playerData["3vs3Victories"]}</div>
                    </div>
                    <div className="details__item">
                        <div className="details__title"><h3>Player Robo Rumble</h3></div>
                        <div className="details__value">{playerData.bestRoboRumbleTime}</div>
                    </div>
                    <h1>Brawlers</h1>
                </div>
            )}
        </div>
    );
}

export default App;
