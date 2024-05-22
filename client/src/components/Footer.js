// Footer.js
import React, { useState, useEffect} from 'react';


function Footer() {
  const [sponsors, setSponsors] = useState(null);
  const [sponsorLogos, setSponsorLogos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/sponsors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Request could not be completed');
      }
      return response.json();
    })
    .then(data => {
      // Si la solicitud es exitosa, establecer los datos de los sponsors
      setSponsors(data);
      // Cargar dinámicamente los logos de los sponsors
      const logos = data.map(sponsor => import(`../assets/images/${sponsor.logo}`));
      Promise.all(logos)
        .then(images => setSponsorLogos(images))
        .catch(error => console.error('Error loading sponsor logos:', error));
    })
    .catch(error => {
      // Si hay un error, establecer el error
      console.error('Error fetching sponsors:', error);
    });
  }, []);

  return (
    <footer>
      <div>
        <div className='divSponsorsFooter'>
          {sponsors && sponsorLogos.map((logo, index) => (
            <img className='sponsorsFooter' src={logo.default} alt={sponsors[index].nom} />
          ))}
        </div>
        <div className='logoFooter'></div>
      </div>
    </footer>
  );
}

export default Footer;
