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

// Ruta obtinere locuri 
router.get('/locuri/:movieId/:city/:date/:time', async (req, res) => {
  try {
    const { movieId, city, date, time } = req.params;
    const snapshot = await db.collection("schedule").where("movieId", "==", movieId).get();

    if (snapshot.empty) {
      return res.status(404).json({ error: "Nu există program pentru acest film" });
    }

    let seats = null;
    snapshot.docs.forEach(doc => {
      const schedule = doc.data().schedule;
      if (schedule[city] && schedule[city][date]) {
        const movieSchedule = schedule[city][date].find(show => show.time === time);
        if (movieSchedule) {
          seats = movieSchedule;
        }
      }
    });

    if (!seats) {
      return res.status(404).json({ error: "Nu exista program pentru acest film la ora selectata" });
    }

    res.json({
      totalSeats: seats.totalSeats,
      occupiedSeats: seats.occupiedSeats || [],
      freeSeats: seats.freeSeats || []
    });

  } catch (error) {
    console.error("Eroare backend:", error);
    res.status(500).json({ error: "Eroare la preluarea locurilor" });
  }
});

// Ruta POST rezervare
router.post('/tickets', async (req, res) => {
  try {
    const reservation = req.body; 
    const docRef = await db.collection("ticketReservation").add(reservation);
    res.status(201).json({ id: docRef.id, ...reservation });

  } catch (error) {
    console.error("Eroare la inregistrarea rezervarii:", error);
    res.status(500).json({ error: "Eroare la inregistrarea rezervarii" });
  }
});

// Ruta GET rezervari utilizator
router.get('/tickets/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const snapshot = await db.collection("ticketReservation").where("userId", "==", userId).get();
   
    if (snapshot.empty) {
      return res.status(404).json({ error: "Nu exista rezervari efectuate de acest utilizator" });  
    }
    const reservations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(reservations);
  } catch (error) {
    console.error("Eroare la preluarea rezervarilor:", error);
    res.status(500).json({ error: "Eroare la preluarea rezervarilor" });
  }
});

module.exports = router;