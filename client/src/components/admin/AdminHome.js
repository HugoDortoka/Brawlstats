import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminHome({ onAdminLogout }) {
    const [tags, setTags] = useState([]);
    const [tagsTaked, setTagsTaked] = useState(false);
    const [dataTaked, setDataTaked] = useState(false);
    const [trophies, setTrophies] = useState([]);
    const [level, setLevel] = useState([]);
    const [soloWins, setSoloWins] = useState([]);
    const [duoWins, setduoWins] = useState([]);
    const [wins3vs3, setWins3vs3] = useState([]);
    const [trophiesMedia, setTrophiesMedia] = useState(0);
    const [levelMedia, setLevelMedia] = useState(0);
    const [soloWinsMedia, setSoloWinsMedia] = useState(0);
    const [duoWinsMedia, setDuoWinsMedia] = useState(0);
    const [wins3vs3Media, setWins3vs3Media] = useState(0);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if(tagsTaked === true){
            Promise.all(tags.map(tag => axios.get(`http://localhost:3000/${tag.tag}`)))
                .then(responses => {
                    const trophiesArray = [];
                    const levelArray = [];
                    const soloWinsArray = [];
                    const duoWinsArray = [];
                    const Wins3vs3Array = [];
    
                    responses.forEach(response => {
                        trophiesArray.push(response.data.trophies);
                        levelArray.push(response.data.expLevel);
                        soloWinsArray.push(response.data.soloVictories);
                        duoWinsArray.push(response.data.duoVictories);
                        Wins3vs3Array.push(response.data["3vs3Victories"]);
                    });
    
                    setTrophies(trophiesArray);
                    setLevel(levelArray);
                    setSoloWins(soloWinsArray);
                    setduoWins(duoWinsArray);
                    setWins3vs3(Wins3vs3Array);
                    setDataTaked(true);
                    setError('');
                })
                .catch(err => {
                    setError(err.response.data.message || 'Player Not Found');
                });
        } else {
            handleTakeTags();
        }
    }, [tagsTaked]);
    

    useEffect(() => {
        if(dataTaked==true){
            let trophiesM = 0;
            let levelM = 0;
            let soloWinsM = 0;
            let duoWinsM = 0;
            let wins3vs3M = 0;

            trophies.forEach((player) => {
                trophiesM += player;
            });
            level.forEach((player) => {
                levelM += player;
            });
            soloWins.forEach((player) => {
                soloWinsM += player;
            });
            duoWins.forEach((player) => {
                duoWinsM += player;
            });
            wins3vs3.forEach((player) => {
                wins3vs3M += player;
            });

            trophiesM = Math.round(trophiesM/2);
            levelM = Math.round(levelM/2);
            soloWinsM = Math.round(soloWinsM/2);
            duoWinsM = Math.round(duoWinsM/2);
            wins3vs3M = Math.round(wins3vs3M/2);

            setTrophiesMedia(trophiesM);
            setLevelMedia(levelM);
            setSoloWinsMedia(soloWinsM);
            setDuoWinsMedia(duoWinsM);
            setWins3vs3Media(wins3vs3M);
        }
    }, [dataTaked]);

    const handleTakeTags = async () => {
        try {
            const response = await fetch('http://localhost:3000/allTags', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              }
            });
        
            if (!response.ok) {
              throw new Error('No se pudo completar la solicitud');
            }
        
            const data = await response.json();
            setTags(data);
            setError('');
            setTagsTaked(true);
            return data;
        } catch (error) {
            setError(error.message || 'Tags Not Found');
            setTags(null);
            throw error;
        }
    }

    return (
        <div>
            <h1>Admin Home</h1>
            <div>
                <div>Trophies Media</div>
                <div>{trophiesMedia}</div>
            </div>
            <div>
                <div>Level Media</div>
                <div>{levelMedia}</div>
            </div>
            <div>
                <div>Solo Wins Media</div>
                <div>{soloWinsMedia}</div>
            </div>
            <div>
                <div>Duo Wins Media</div>
                <div>{duoWinsMedia}</div>
            </div>
            <div>
                <div>3vs3 Wins Media</div>
                <div>{wins3vs3Media}</div>
            </div>
            <button onClick={() => {
                onAdminLogout(); // Llama a la función onLogout
                navigate('/adminLogin');
            }}>Cerrar sesión</button>
        </div>
    );
}

export default AdminHome;
