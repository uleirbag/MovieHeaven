const express = require('express');
const router = express.Router();
const { db } = require('C:/Users/Gabi/Desktop/Movie Heaven/firebase_config/firebaseAdmin.js')


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
router.get("/cinemauri", async (req, res) => {
  try {
    const snapshot = await db.collection("cinemas").get();
    if (snapshot.empty) {
      return res.status(404).json({ error: "Nu exista cinematografe in baza de date" });
    }
    const cinemas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(cinemas);
  } catch (error) {
    console.error("Eroare backend:", error);
    res.status(500).json({ error: "Eroare la preluarea cinematografelor din Firestore" });
  }
});


router.get("/cinemauri/:id", async (req, res) => {
  try {
    const cinemaRef = db.collection("cinemas").doc(req.params.id);
    const doc = await cinemaRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Cinema-ul nu a fost gasit" });
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: "Eroare la preluarea cinema-ului" });
  }
});

router.post('/cinemauri', (req, res) => {

  res.send('Cinematograf adaugat');
});

router.delete('/cinemauri/:id', (req, res) => {

  res.send(`Cinema-ul cu ID-ul ${req.params.id} a fost sters`);
});

module.exports = router;