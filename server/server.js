// use axios and get data from player tag using brawl stars api

const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const db = require('./db');
const crypto = require('crypto');
require('dotenv').config();

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
      res.status(200).send('Inicio de sesión exitoso');
    } else {
      // Si no hay resultados, las credenciales son incorrectas
      res.status(401).send('Credenciales incorrectas');
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
