import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(...registerables);

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

            trophiesM = Math.round(trophiesM/tags.length);
            levelM = Math.round(levelM/tags.length);
            soloWinsM = Math.round(soloWinsM/tags.length);
            duoWinsM = Math.round(duoWinsM/tags.length);
            wins3vs3M = Math.round(wins3vs3M/tags.length);

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

    const data = {
        labels: ['Trophies', 'Level', 'Solo Wins', 'Duo Wins', '3vs3 Wins'],
        datasets: [
            {
                data: [trophiesMedia, levelMedia, soloWinsMedia, duoWinsMedia, wins3vs3Media],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className='containerAdmin'>
            <div className='details'>
                <h1 className='divLogin'>Average Statistics of our Users</h1>
    
                <div className='graphic'>
                    <Bar data={data} options={options} />
                </div>
            </div>
        </div>
    );
}

export default AdminHome;
