
import React, { useState, useEffect, useRef} from 'react';
import axios from 'axios';


function Wiki() {
    const [clubTag, setClubTag] = useState('');
    const [clubData, setClubData] = useState(null);
    const [error, setError] = useState('');
    const detailsRef = useRef(null);


    const isDataFetched = clubData !== null && clubData.name !== undefined; 

    
    const getClubDetails = () => {
        axios
        .get(`http://localhost:3000/club/${clubTag}`)
        .then((response) => {
            setClubData(response.data);
            setError('');
        })
        .catch((err) => {
            setError(err.response.data.message || 'Club Not Found');
            setClubData(null);
        });
      
        

        // Scroll a los detalles después de cargar los datos
        setTimeout(() => {
            detailsRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 700);
        
    }
    

    
    return (
        <div className="container">
            <div className="form">
                <div>Enter your CLUB tag</div>
                <div className='searchBar'>
                    <input
                        type="text"
                        className="form__input"
                        placeholder="#XXXXXXXX"
                        value={clubTag}
                        onChange={(e) => setClubTag(e.target.value)}
                    />
                    <button className="form__submit" onClick={getClubDetails}><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='40' height='40'%3E%3Cpath fill='%23fff' d='M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3C/svg%3E" alt="Search Icon"></img></button>
                </div>
            </div>

            <div ref={detailsRef}></div>
            {isDataFetched && (
                <div className="details">
                    <div className='infoTable'>
                        <div className="details__item">
                            <div className="details__value"><img className='iconImg' src="https://cdn.brawlstats.com/club-badges/clan_badge_06_04.png" alt="Player Icon"/></div>
                            <div>
                                <div className="details__name">{clubData.name}</div>
                
                                <div className="details__club"><img className='clubImg' src="https://cdn-old.brawlify.com/icon/trophy.png"></img>{clubData.trophies}</div>
                            </div>
                            <div className="details__tag">{clubData.tag}</div>                        
                        </div>
                        <div className='descriptionClub'>{clubData.description}</div>
                        <div className='filaInfo'>
                            <div className='columnaInfo'>
                                <img src="https://cdn-old.brawlify.com/icon/trophy.png"></img>
                                <div>Required Trophies</div>
                                <div>{clubData.requiredTrophies}</div>
                            </div>
                            <div className='columnaInfo'>
                                <img src="https://cdn-old.brawlify.com/icon/Unlocked.png"></img>
                                <div>Type</div>
                                <div>{clubData.type}</div>
                            </div>
                        </div>
                        <div className='containPlayers'>
                            {clubData.members.map((member, index) => (
                                <div className='topPlayersClub'>
                                    <div>{index+1}</div>
                                    <div>{member.name}</div>
                                    <div>{member.role}</div>
                                    <div className='imgTrophie'><img src="https://brawlstats.com/dist/trophy.96ebb0874d0e7e7a7c235bfbb751f2cf.png"></img>{member.trophies}</div>
                                </div>
                            ))}
                        </div>
                    </div>


                        {console.log(clubData)}
                </div>
            )}
        </div>
  );
}

export default Wiki;
