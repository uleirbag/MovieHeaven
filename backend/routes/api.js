const express = require('express');
const router = express.Router();
const { db } = require('C:/Users/Gabi/Desktop/Movie Heaven/firebase_config/firebaseAdmin.js')

// Rute filme
router.get('/filme', async (req, res) => {
  try {
    const snapshot = await db.collection("movies").get();
    if (snapshot.empty) {
      return res.status(404).json({ error: "Nu exista filme in baza de date" });
    }
    const movies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(movies);
  } catch (error) {
    console.error("Eroare backend:", error);
    res.status(500).json({ error: "Eroare la preluarea filmelor din Firestore" });
  }
});

router.get('/filme/:id', async (req, res) => {
  try {
    const movieRef = db.collection("movies").doc(req.params.id);
    const doc = await movieRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Filmul nu a fost gasit" });
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error("Eroare backend:", error);
    res.status(500).json({ error: "Eroare la preluarea filmului din Firestore" });
  }
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

// Ruta program filme
router.get('/program/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    const snapshot = await db.collection("schedule").where("movieId", "==", movieId).get();

    if (snapshot.empty) {
      return res.status(404).json({ error: "Nu exista program disponibil pentru acest film" });
    }

    const schedule = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(schedule);
  } catch (error) {
    console.error("Eroare backend:", error);
    res.status(500).json({ error: "Eroare la preluarea programului filmului din Firestore" });
  }
});


module.exports = router;