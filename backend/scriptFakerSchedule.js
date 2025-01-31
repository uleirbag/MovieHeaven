const { faker } = require('@faker-js/faker');
const admin = require('firebase-admin');
const serviceAccount = require('../firebase_config/movieheaven-a47c9-firebase-adminsdk-fbsvc-5a2bad19ac.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const showTimes = ["12:00", "16:30", "17:00", "20:30", "21:00", "14:00", "22:30", "19:15"];
const locations = ["bucuresti", "cluj", "constanta", "ploiesti", "iasi", "timisoara", "craiova", "oradea", "brasov", "galati"];
const showDates = ["01 februarie", "02 februarie", "03 februarie", "04 februarie", "05 februarie", "06 februarie", "07 februarie", "08 februarie", "09 februarie"];
const halls = [1, 2, 3, 4, 5];
const seatCapacities = [100, 120, 150];

async function getMovies() {
  const moviesSnapshot = await db.collection("movies").get();
  return moviesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

function getRandomSchedule() {
  const daysAvailable = faker.helpers.arrayElements(showDates, faker.number.int({ min: 1, max: showDates.length }));
  const timesAvailable = faker.helpers.arrayElements(showTimes, faker.number.int({ min: 1, max: showTimes.length }));

  return { daysAvailable, timesAvailable };
}

function generateSeatDistribution(totalSeats) {

  const allSeats = Array.from({ length: totalSeats }, (_, index) => index + 1);   //set de locuri de la 1 la valoarea maxima
  const occupiedSeatsCount = faker.number.int({ min: 0, max: totalSeats });      // alegem random cate locuri sunt ocupate

  const occupiedSeats = faker.helpers.arrayElements(allSeats, occupiedSeatsCount);
  const freeSeats = allSeats.filter(seat => !occupiedSeats.includes(seat)); // locuri libere = locuri totale - locuri ocupate

  return { occupiedSeats: occupiedSeats, freeSeats };
}

async function generateScheduleEntries() {
  const movies = await getMovies();

  if (movies.length === 0) {
    console.log("Nu exista filme in colectia Firestore");
    return;
  }

  for (const movie of movies) {
    const schedule = {};

    for (const location of locations) {
      const { daysAvailable, timesAvailable } = getRandomSchedule();
      schedule[location] = {};

      for (const date of daysAvailable) {
        schedule[location][date] = [];

        for (const time of timesAvailable) {
          const hall = faker.helpers.arrayElement(halls);
          const totalSeats = faker.helpers.arrayElement(seatCapacities); // alegem capacitatea salii aleatoriu

          const { occupiedSeats, freeSeats } = generateSeatDistribution(totalSeats);

          // verificam sa nu fie un progrmam deja stabilit la aceasta locatie, data, ora, sala
          const isConflicting = schedule[location][date].some(entry => entry.time === time && entry.hall === hall);

          if (!isConflicting) {
            schedule[location][date].push({time,hall,totalSeats,occupiedSeats,freeSeats});
          }
        }
      }
    }

    const scheduleEntry = {
      movieId: movie.id,
      movieTitle: movie.title,
      schedule
    };

    await db.collection("schedule").add(scheduleEntry);
    console.log("Added schedule:", scheduleEntry);
  }
}

generateScheduleEntries().catch(console.error);