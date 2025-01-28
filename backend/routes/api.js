const express = require('express');
const router = express.Router();

// Rute useri
router.post('/users/register', (req, res) => {
  
  res.send('Utilizatorul a fost inregistrat');
});

router.post('/users/login', (req, res) => {

  res.send('Autentificare cu succes');
});

// Rute filme
router.get('/filme', (req, res) => {

  res.send('Lista filmelor');
});

router.post('/filme', (req, res) => {

  res.send('Film adaugat');
});

router.delete('/filme/:id', (req, res) => {
  
  res.send(`Filmul cu ID-ul ${req.params.id} a fost sters`);
});

// Rute cinematografe
router.get('/cinemauri', (req, res) => {

  res.send('Lista cinematografelor');
});

router.post('/cinemauri', (req, res) => {

  res.send('Cinematograf adaugat');
});

router.delete('/cinemauri/:id', (req, res) => {

  res.send(`Cinema-ul cu ID-ul ${req.params.id} a fost sters`);
});

module.exports = router;