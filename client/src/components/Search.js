
import React, { useState } from 'react';
import axios from 'axios';

function Search() {
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
                    placeholder="#XXXXXXXX"
                    value={playerTag}
                    onChange={(e) => setPlayerTag(e.target.value)}
                />
                <button className="form__submit" onClick={getPlayerDetails}>Get Details</button>
            </div>

            {error && <div className="error">{error}</div>}

            {isDataFetched && (
                <div className="details">
                    <h1>Player Info</h1>
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
                        <div className="details__value"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGcAAABzBAMAAAB3KAFHAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAqUExURUdwTAAAAAAAAAAAAAAAAGRkZDAwMAAAAMzMzE5OTm9vb6ysrMPDw4SEhMcnUpgAAAAFdFJOUwDAOvKEUYVM9wAAAslJREFUWMPt2EFLG0EUAOCn9QdIW/AaacFrK0KuAQ/5BRG60WNGcmu6xcF/MDTp0ZT+gEBpehUWo8eCaHoMBKL/pftmZ3bfzO5OMtDUpuQdZMD9HOe9N8PuAMDrF3zxCF9WII4t7hcfEe14Ir7tP5Gc6pU3CitQ5/yrT3zhvBYv6bzhE+9wUVV/9Aa4P3r/BOhkHMc9jpo4usPRA44ucXSNo0keiTi6EuHoE46mOJIowlEJuneiQQ41/9pMwfc4BgWjhjl6ojr906ipEuqKQKbUE32TtV+jlUOB2i1eaL2f/uczYjweLOVgWW/CVT0jHh+Xc0Ykh896E67eGTEaLeeM+CFfcf9Al3fnGPWIicQvpzm5zaEgRj0nitSLLU35gxCfnSh+Ce5NLBRE4qcTHQtxlX9bjibuNSXG6ohA/ixP/I1R3LM2+dWoYL4ZbQimEGtl54Do5uYaCvKHmELnjF3QCg5sk3w5yOiztp4pU1P9wZE1wi0pRp8xliGthvghcmc1QtphaCjSKi6yUbBjoYqqjYGYeupa0HXjF1JPLelIPibXtKORSnwQ9ayeu9LJZmqmbbwkYKa6MXvOMqeI9ritEqr/xyBneAU2eKZaJNPdwfCyQYuamg7AZrVQTUWX7hWWLojzfQDYxYFKRtYakaAHQJ+YjrxkOSxQ8ls0zT01YQ0gvWWx1AxnmuQN3rDI2DRUQ7eGboQjkgT+AXTUOUmGVjPLJBcstRTtcara5jFM58Ea6XjGS5VlwtRkd0c5ZZnkegpI/kgyWgWNYOQOY4MXK2YkQXYQiV1bXeQKlDaDW9mGW0Y1k6FsE9YgF3Vb2UkoMKqZaGuY5jnAomqO0fvRUKnZh7LYslVqDqA8rCKfFhfVDrNcZUV1qUUNufg8Ixebc+PQvgytzTekXO4CudRixlSLGlrkAwBv5WN0uToV8Fa+JlbVt6XmN2Ev87IHEC6HAAAAAElFTkSuQmCC"></img>{playerData.club.name}</div>
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

export default Search;
