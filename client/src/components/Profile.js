import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef} from 'react';
import axios from 'axios';
import BrawlContainer from './BrawlContainer';

function Profile({ onUserLogout }) {
    const navigate = useNavigate();
    const tag = localStorage.getItem('userLoggedIn');
    const [playerData, setPlayerData] = useState(null);
    const [brawlersData, setBrawlersData] = useState(null);
    const [battleLog, setBattleLog] = useState(null);
    const [error, setError] = useState('');


    const isDataFetched = playerData !== null && playerData.name !== undefined && battleLog!==null && brawlersData!==null; 
    useEffect(() => {
        // Esta función se ejecuta cuando el componente se monta
        // Aquí podemos obtener la lista de brawlers
        axios.get('http://localhost:3000/brawlers')
            .then(response => {
                setBrawlersData(response.data);
                
            })
            .catch(error => {
                console.error('Error fetching brawlers:', error);
            });
    }, []);

    
    useEffect(() => {
        axios
        .get(`http://localhost:3000/${tag}`)
        .then((response) => {
            setPlayerData(response.data);
            setError('');
        })
        .catch((err) => {
            setError(err.response.data.message || 'Player Not Found');
            setPlayerData(null);
        });
        axios
        .get(`http://localhost:3000/${tag}/battlelog`)
        .then((response) => {
            setBattleLog(response.data);
            setError('');
        })
        .catch((err) => {
            setError(err.response.data.message || 'Player Not Found');
            setBattleLog(null);
        });

        
    }, []);
    
    useEffect(() => {

        if (isDataFetched && battleLog!==null) {
            battleLog.items.forEach((item, index) => {
                var resultadoDiv = document.getElementById(`result${index}`);
                if (resultadoDiv!=null) {
                    if (item.battle.result === "victory") {
                        resultadoDiv.style.backgroundColor = "rgb(25, 216, 0)";
                    } else {
                        resultadoDiv.style.backgroundColor = "rgb(225, 59, 30)";
                    }
                };
            });
        }
    }, [battleLog, isDataFetched]);


    return (
      <div>
        
        <div className="container">            

            {isDataFetched && (
                <div className="details">
                    <div className='titleLogout'>
                        <h1>Profile</h1>
                        <button onClick={() => {
                            onUserLogout(); // Llama a la función onLogout
                            navigate('/');
                        }}>Cerrar sesión</button>
                    </div>

                    <div className='infoTable'>
                        <div className="details__item">
                            <div className="details__value"><img className='iconImg' src={`https://cdn.brawlstats.com/player-thumbnails/${playerData.icon.id}.png`} alt="Player Icon"/></div>
                            <div>
                                <div className="details__name">{playerData.name}</div>
                
                                <div className="details__club"><img className='clubImg' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGcAAABzBAMAAAB3KAFHAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAqUExURUdwTAAAAAAAAAAAAAAAAGRkZDAwMAAAAMzMzE5OTm9vb6ysrMPDw4SEhMcnUpgAAAAFdFJOUwDAOvKEUYVM9wAAAslJREFUWMPt2EFLG0EUAOCn9QdIW/AaacFrK0KuAQ/5BRG60WNGcmu6xcF/MDTp0ZT+gEBpehUWo8eCaHoMBKL/pftmZ3bfzO5OMtDUpuQdZMD9HOe9N8PuAMDrF3zxCF9WII4t7hcfEe14Ir7tP5Gc6pU3CitQ5/yrT3zhvBYv6bzhE+9wUVV/9Aa4P3r/BOhkHMc9jpo4usPRA44ucXSNo0keiTi6EuHoE46mOJIowlEJuneiQQ41/9pMwfc4BgWjhjl6ojr906ipEuqKQKbUE32TtV+jlUOB2i1eaL2f/uczYjweLOVgWW/CVT0jHh+Xc0Ykh896E67eGTEaLeeM+CFfcf9Al3fnGPWIicQvpzm5zaEgRj0nitSLLU35gxCfnSh+Ce5NLBRE4qcTHQtxlX9bjibuNSXG6ohA/ixP/I1R3LM2+dWoYL4ZbQimEGtl54Do5uYaCvKHmELnjF3QCg5sk3w5yOiztp4pU1P9wZE1wi0pRp8xliGthvghcmc1QtphaCjSKi6yUbBjoYqqjYGYeupa0HXjF1JPLelIPibXtKORSnwQ9ayeu9LJZmqmbbwkYKa6MXvOMqeI9ritEqr/xyBneAU2eKZaJNPdwfCyQYuamg7AZrVQTUWX7hWWLojzfQDYxYFKRtYakaAHQJ+YjrxkOSxQ8ls0zT01YQ0gvWWx1AxnmuQN3rDI2DRUQ7eGboQjkgT+AXTUOUmGVjPLJBcstRTtcara5jFM58Ea6XjGS5VlwtRkd0c5ZZnkegpI/kgyWgWNYOQOY4MXK2YkQXYQiV1bXeQKlDaDW9mGW0Y1k6FsE9YgF3Vb2UkoMKqZaGuY5jnAomqO0fvRUKnZh7LYslVqDqA8rCKfFhfVDrNcZUV1qUUNufg8Ixebc+PQvgytzTekXO4CudRixlSLGlrkAwBv5WN0uToV8Fa+JlbVt6XmN2Ev87IHEC6HAAAAAElFTkSuQmCC"></img>{playerData.club.name}</div>
                            </div>
                            <div className="details__tag">{playerData.tag}</div>
                        </div>
                        <div className='filaInfo'>
                            <div className='columnaInfo'>
                                <img src="https://cdn-old.brawlify.com/icon/trophy.png"></img>
                                <div>Trophies</div>
                                <div>{playerData.trophies}</div>
                            </div>
                            <div className='columnaInfo'>
                                <img src="https://cdn-old.brawlify.com/icon/Ranking.png"></img>
                                <div>High Trophies</div>
                                <div>{playerData.highestTrophies}</div>
                            </div>
                        </div>
                        <div className='filaInfo'>
                            <div className='columnaInfo'>
                                <img src="https://cdn-old.brawlify.com/icon/Info.png"></img>
                                <div>Level</div>
                                <div>{playerData.expLevel}</div>
                            </div>
                            <div className='columnaInfo'>
                                <img src="https://cdn-old.brawlify.com/icon/Unlocked.png"></img>
                                <div>Unlocked Brawlers</div>
                                <div>{playerData.brawlers.length}/{brawlersData.items.length}</div>
                            </div>
                        </div>
                        <div className='filaInfo'>
                            <div className='columnaInfo'>
                                <img src="https://cdn-old.brawlify.com/icon/Showdown.png"></img>
                                <div>Solo Wins</div>
                                <div>{playerData.soloVictories}</div>
                            </div>
                            <div className='columnaInfo'>
                                <img src="https://cdn-old.brawlify.com/gamemode/Duo-Showdown.png"></img>
                                <div>Duo Wins</div>
                                <div>{playerData.duoVictories}</div>
                            </div>
                        </div>
                        <div className='filaInfo'>
                            <div className='columnaInfo'>
                                <img src="https://cdn-old.brawlify.com/icon/3v3.png"></img>
                                <div>3 vs 3 Wins</div>
                                <div>{playerData["3vs3Victories"]}</div>
                            </div>
                            <div className='columnaInfo'>
                                <img src="https://cdn-old.brawlify.com/gamemode/Robo-Rumble.png"></img>
                                <div>Robo Rumble</div>
                                <div>Level {playerData.bestRoboRumbleTime}</div>
                            </div>
                        </div>
               
                    </div>
                    <h1 className='titleBrawlers'>Battle Log</h1>
                   
                        <div className='battleContainer'>
                            {battleLog.items.map((item, index)=> (
                                <div className='gamePlayed' id={`result${index}`}>
                                    {console.log(item)}                                   
                                    <img src={`https://cdn-old.brawlify.com/gamemode/${item.event.mode.charAt(0).toUpperCase() + item.event.mode.slice(1).replace(/([A-Z])(?=[a-z])/g, '-$1')}.png`} alt={item.event.mode}></img>
                                </div>
                            ))}
                        </div>
                    <h3>Last {battleLog.items.length} games - Victories: {battleLog.items.filter(item => item.battle.result === "victory").length} | Defeats: {battleLog.items.filter(item => item.battle.result === "defeat").length}</h3>

                    <h1 className='titleBrawlers'>Brawlers ({playerData.brawlers.length}/{brawlersData.items.length})</h1>
                    <div className='brawlersContainer'>
                        {playerData.brawlers.map(brawler => (
                            <BrawlContainer key={brawler.id} brawler={brawler} />
                        ))}
                    </div>
                </div>
            )}
        </div>

      </div>
    );
  }

export default Profile;
