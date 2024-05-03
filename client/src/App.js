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
                        <div className="details__title">Player Icon</div>
                        <div className="details__value"><img src="https://cdn.brawlstats.com/player-thumbnails/${playerData.icon.id}"></img></div>
                    </div>
                    <div className="details__item">
                        <div className="details__title">Player Name</div>
                        <div className="details__value">{playerData.name}</div>
                    </div>
                    <div className="details__item">
                        <div className="details__title">Player Club</div>
                        <div className="details__value">{playerData.club.name}</div>
                    </div>
                    <div className="details__item">
                        <div className="details__title">Player Tag</div>
                        <div className="details__value">{playerData.tag}</div>
                    </div>
                    <div className="details__item">
                        <div className="details__title">Player Trophies</div>
                        <div className="details__value">{playerData.trophies}</div>
                    </div>
                    <div className="details__item">
                        <div className="details__title">Player Highest Trophies</div>
                        <div className="details__value">{playerData.highestTrophies}</div>
                    </div>
                    <div className="details__item">
                        <div className="details__title">Player Level</div>
                        <div className="details__value">{playerData.expLevel}</div>
                    </div>
                    {/* <div className="details__item">
                        <div className="details__title">Player Unlocked Brawlers</div>
                        <div className="details__value"></div>
                    </div>
                    <div className="details__item">
                        <div className="details__title">Player Points to MAX</div>
                        <div className="details__value"></div>
                    </div>
                    <div className="details__item">
                        <div className="details__title">Player Coins to MAX</div>
                        <div className="details__value"></div>
                    </div> */}
                    <div className="details__item">
                        <div className="details__title">Player Solo Wins</div>
                        <div className="details__value">{playerData.soloVictories}</div>
                    </div>
                    <div className="details__item">
                        <div className="details__title">Player Duo Wins</div>
                        <div className="details__value">{playerData.duoVictories}</div>
                    </div>
                    <div className="details__item">
                        <div className="details__title">Player 3vs3 Wins</div>
                        <div className="details__value">{playerData["3vs3Victories"]}</div>
                    </div>
                    <div className="details__item">
                        <div className="details__title">Player Robo Rumble</div>
                        <div className="details__value">{playerData.bestRoboRumbleTime}</div>
                    </div>
                    <h1>Brawlers</h1>
                </div>
            )}
        </div>
    );
}

export default App;
