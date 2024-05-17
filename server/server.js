// use axios and get data from player tag using brawl stars api

const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const db = require('./db');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
require('dotenv').config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../client/src/assets/images/'));
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Ruta para servir las imágenes estáticas
app.use('/images', express.static(path.join(__dirname, '../client/src/assets/images')));

const port = 3000;

const apiKey = process.env.API_KEY;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function encryptPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

app.post('/adminLogin', (req, res) => {
  const { email, password } = req.body;

  const encryptedPassword = encryptPassword(password);

  // Realiza la validación de credenciales en tu base de datos
  db.query('SELECT * FROM administrator WHERE email = ? AND password = ?', [email, encryptedPassword], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }

    if (results.length > 0) {
      // Si hay resultados, significa que las credenciales son correctas
      res.status(200).send('Inicio de sesión exitoso');
    } else {
      // Si no hay resultados, las credenciales son incorrectas
      res.status(401).send('Credenciales incorrectas');
    }
  });
});

app.post('/userLogin', (req, res) => {
  const { email, password } = req.body;

  const encryptedPassword = encryptPassword(password);

  // Realiza la validación de credenciales en tu base de datos
  db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, encryptedPassword], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }

    if (results.length > 0) {
      // Si hay resultados, significa que las credenciales son correctas
      const user = results[0];
      const userData = {
        tag: user.tag,
      };
      res.send(userData);
    } else {
      // Si no hay resultados, las credenciales son incorrectas
      res.status(401).send('Credenciales incorrectas');
    }
  });
});

app.post('/allTags', (req, res) => {
  // Realiza la validación de credenciales en tu base de datos
  db.query('SELECT tag FROM users', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }

    if (results.length > 0) {
      // Si hay resultados, significa que las credenciales son correctas
      res.send(results);
    } else {
      // Si no hay resultados, las credenciales son incorrectas
      res.status(401).send('Credenciales incorrectas');
    }
  });
});

app.post('/sponsors', (req, res) => {
  // Realiza la validación de credenciales en tu base de datos
  db.query('SELECT * FROM sponsors', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }

    if (results.length > 0) {
      // Si hay resultados, significa que las credenciales son correctas
      res.send(results);
    } else {
      // Si no hay resultados, las credenciales son incorrectas
      res.status(401).send('Credenciales incorrectas');
    }
  });
});

app.post('/sponsors/:CIF', (req, res) => {
  const { CIF } = req.params;
  
  db.query('SELECT logo FROM sponsors WHERE CIF = ?', [CIF], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }

    if (results.length > 0) {
      // Si hay resultados, significa que las credenciales son correctas
      const logo = results[0].logo;
      const imagePath = path.join(__dirname, '..', 'client', 'src', 'assets', 'images', logo);
      fs.unlink(imagePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error('Error al eliminar la imagen:', unlinkErr);
          res.status(500).send('Error interno del servidor al eliminar la imagen');
          return;
        }
        res.send(`Imagen ${logo} eliminada correctamente`);
      });
    } else {
      // Si no hay resultados, las credenciales son incorrectas
      res.status(401).send('Credenciales incorrectas');
    }
  });
});

app.delete('/sponsors/:CIF', (req, res) => {
  const { CIF } = req.params;

  db.query('DELETE FROM sponsors WHERE CIF = ?', [CIF], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta de eliminación:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }

    if (results.affectedRows > 0) {
      res.status(200).send({ message: 'Sponsor eliminado correctamente' });
    } else {
      res.status(404).send({ error: 'Sponsor no encontrado' });
    }
  });
});

app.put('/sponsors/:CIF', upload.single('logo'), (req, res) => {
  const { CIF } = req.params;
  const { nom } = req.body;
  let logoFilename = req.file ? req.file.originalname : null;

  let query;
  let params;
  if (logoFilename) {
    query = 'UPDATE sponsors SET nom = ?, logo = ? WHERE CIF = ?';
    params = [nom, logoFilename, CIF];
  } else {
    query = 'UPDATE sponsors SET nom = ? WHERE CIF = ?';
    params = [nom, CIF];
  }

  // Primero, obtener el sponsor actual para borrar el archivo antiguo si hay uno nuevo
  db.query('SELECT logo FROM sponsors WHERE CIF = ?', [CIF], (err, results) => {
    if (err) {
        console.error('Error al obtener el sponsor:', err);
        res.status(500).send('Error interno del servidor');
        return;
    }

    const oldLogoPath = results[0] && results[0].logo ? path.join(__dirname, '../client/src/assets/images', results[0].logo) : null;

    db.query(query, params, (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta de edición:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }

        if (results.affectedRows > 0) {
            if (logoFilename && oldLogoPath) {
                // Borrar el archivo antiguo
                fs.unlink(oldLogoPath, (err) => {
                    if (err) {
                        console.error('Error al borrar el archivo antiguo:', err);
                    }
                });
            }
            res.status(200).send({ CIF, nom, logo: logoFilename });
        } else {
            res.status(404).send({ error: 'Sponsor no encontrado' });
        }
    });
  });
});

app.post('/newSponsor', upload.single('logo'), (req, res) => {
  const { CIF, name } = req.body;
  const logoFilename = req.file ? req.file.originalname : null;

  if (!logoFilename) {
    res.status(400).send('El logo es obligatorio');
    return;
  }

  // Verifica si el CIF ya está registrado
  db.query('SELECT * FROM sponsors WHERE CIF = ?', [CIF], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }

    if (results.length > 0) {
      // El CIF ya está registrado
      res.status(400).send('El CIF ya está registrado');
    } else {
      // El CIF no está registrado, procede con el registro

      // Inserta el nuevo sponsor en la base de datos
      db.query('INSERT INTO sponsors (CIF, nom, logo) VALUES (?, ?, ?)', [CIF, name, logoFilename], (err, results) => {
        if (err) {
          console.error('Error al ejecutar la consulta de inserción:', err);
          res.status(500).send('Error interno del servidor');
          return;
        }

        // Registro exitoso
        res.status(201).send('Registro exitoso');
      });
    }
  });
});

app.post('/register', (req, res) => {
  const { email, tag, password } = req.body;

  // Verifica si el email ya está registrado
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }

    if (results.length > 0) {
      // El email ya está registrado
      res.status(400).send('El email ya está registrado');
    } else {
      // El email no está registrado, procede con el registro
      const encryptedPassword = encryptPassword(password);

      // Inserta el nuevo usuario en la base de datos
      db.query('INSERT INTO users (email, tag, password) VALUES (?, ?, ?)', [email, tag, encryptedPassword], (err, results) => {
        if (err) {
          console.error('Error al ejecutar la consulta de inserción:', err);
          res.status(500).send('Error interno del servidor');
          return;
        }

        // Registro exitoso
        res.status(201).send('Registro exitoso');
      });
    }
  });
});

app.get('/brawlers', (req, res) => {
  axios({
      method: 'get',
      url: 'https://api.brawlstars.com/v1/brawlers',
      headers: {
          'Authorization': `Bearer ${apiKey}`
      }
  })
  .then(response => {
      // Manejar la respuesta exitosa
      res.send(response.data);
  })
  .catch(error => {
      // Manejar el error
      console.log(error);
      res.send('Error al obtener la lista de brawlers');
  });
});

app.get('/playersTop/:countryCode', (req, res) => {
  const countryCode = req.params.countryCode;

  axios({
      method: 'get',
      url:`https://api.brawlstars.com/v1/rankings/${countryCode}/players`,
      headers: {
        'Authorization':` Bearer ${apiKey}`
      }
    })
      .then(response => {
        // Handle successful response
        res.send(response.data);
      })
      .catch(error => {
        // Handle error
        console.log(error);
        res.send('Players Top Not Found');
      });
});

app.get('/brawlersTop/:countryCode/:brawlerId', (req, res) => {
  const countryCode = req.params.countryCode;
  const brawlerId = req.params.brawlerId;

  axios({
      method: 'get',
      url:`https://api.brawlstars.com/v1/rankings/${countryCode}/brawlers/${brawlerId}`,
      headers: {
        'Authorization':` Bearer ${apiKey}`
      }
    })
      .then(response => {
        // Handle successful response
        res.send(response.data);
      })
      .catch(error => {
        // Handle error
        console.log(error);
        res.send('Brawlers Top Not Found');
      });
});

app.get('/club/:clubTag', (req, res) => {
  const clubTag = req.params.clubTag;


  axios({
      method: 'get',
      url: `https://api.brawlstars.com/v1/clubs/%23${clubTag}`,
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    })
      .then(response => {
        // Handle successful response
        res.send(response.data);
      })
      .catch(error => {
        // Handle error
        console.log(error);
        res.send('Club Not Found');
      });
});

app.get('/:playerTag', (req, res) => {
    const playerTag = req.params.playerTag;

    axios({
        method: 'get',
        url: `https://api.brawlstars.com/v1/players/%23${playerTag}`,
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      })
        .then(response => {
          // Handle successful response
          res.send(response.data);
        })
        .catch(error => {
          // Handle error
          console.log(error);
          res.send('Player Not Found');
        });
});

app.get('/:playerTag/battlelog', (req, res) => {
  const playerTag = req.params.playerTag;

  axios({
      method: 'get',
      url: `https://api.brawlstars.com/v1/players/%23${playerTag}/battlelog`,
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    })
      .then(response => {
        // Handle successful response
        res.send(response.data);
      })
      .catch(error => {
        // Handle error
        console.log(error);
        res.send('Player Not Found');
      });
});

app.get('/', (req, res) => {
  res.send('Send Player Tag in URL');
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
