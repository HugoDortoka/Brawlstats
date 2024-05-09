import React from 'react';



function BrawlContainer({ brawler }) {
  // Función para obtener el color de fondo según el nombre del brawler
  const getBackgroundColor = (brawlerName) => {
    brawlerName = brawlerName.toLowerCase();

    // Mapeo manual de colores según el nombre del brawler
    switch (brawlerName) {
      case 'shelly':
        return 'rgb(148, 215, 244)';
      case 'nita':
      case 'colt':
      case 'bull':
      case 'brock':
      case 'el primo':
      case 'barley':
      case 'poco':
      case 'rosa':
        return 'rgb(46, 221, 28)';
      case 'jessie':
      case 'dynamike':
      case 'tick':
      case '8-bit':
      case 'rico':
      case 'darryl':
      case 'penny':
      case 'carl':
      case 'jacky':
      case 'gus':
        return 'rgb(0, 135, 250)';
      case 'bo':
      case 'emz':
      case 'stu':
      case 'piper':
      case 'pam':
      case 'frank':
      case 'bibi':
      case 'bea':
      case 'nani':
      case 'edgar':
      case 'griff':
      case 'grom':
      case 'bonnie':
      case 'gale':
      case 'colette':
      case 'belle':
      case 'ash':
      case 'lola':
      case 'sam':
      case 'mandy':
      case 'maisie':
      case 'hank':
      case 'pearl':
      case 'larry & lawrie':
      case 'angelo':
        return 'rgb(177, 22, 237)';
      case 'mortis':
      case 'tara':
      case 'gene':
      case 'max':
      case 'mr. p':
      case 'sprout':
      case 'byron':
      case 'squeak':
      case 'lou':
      case 'ruffs':
      case 'buzz':
      case 'fang':
      case 'eve':
      case 'janet':
      case 'otis':
      case 'buster':
      case 'gray':
      case 'r-t':
      case 'willow':
      case 'doug':
      case 'chuck':
      case 'charlie':
      case 'mico':
      case 'melodie':
      case 'lily':
        return 'rgb(214, 0, 26)';
      case 'spike':
      case 'crow':
      case 'leon':
      case 'sandy':
      case 'amber':
      case 'meg':
      case 'surge':
      case 'chester':
      case 'cordelius':
      case 'kit':
        return 'rgb(255, 241, 30)';
      default:
        return 'white';
    }
  };

  return (
    <div className='brawlContainer' style={{ backgroundColor: getBackgroundColor(brawler.name) }}>
      <div className='boxBrawl'>
        <img src={`https://cdn.brawlstats.com/character-arts/${brawler.id}.png`} alt={brawler.name} />
        <div className='skillsBrawl'>
          {brawler.starPowers.map(starPower => (
            <div key={starPower.id}>
                <img src={`https://cdn.brawlstats.com/star-powers/${starPower.id}.png`} alt={`${brawler.name} - ${starPower.name}`} />
            </div>
          ))}
          {brawler.gadgets.map(gadget => (
            <div key={gadget.id}>
                <img src={`https://cdn.brawlstats.com/gadgets/${gadget.id}.png`} alt={`${brawler.name} - ${gadget.name}`} />
            </div>
          ))}
        </div>
      </div>
      <div className='infoBrawl'>
        <div className='nameBrawl'>{brawler.name}</div>
        <div className='nameBrawl'>Level<br />{brawler.power}</div>
        <div className='nameBrawl'>Current<br />{brawler.trophies}</div>
        <div className='nameBrawl'>Highest<br />{brawler.highestTrophies}</div>
      </div>
    </div>
  );
}

export default BrawlContainer;
