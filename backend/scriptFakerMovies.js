const { faker } = require('@faker-js/faker');
const admin = require('firebase-admin');
const serviceAccount = require('../firebase_config/movieheaven-a47c9-firebase-adminsdk-fbsvc-5a2bad19ac.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function generateMovies(count = 20) {
  const actorsList = [
    "Robert Downey Jr.", "Chris Hemsworth", "Scarlett Johansson",
    "Tom Hanks", "Leonardo DiCaprio", "Emma Stone", "Will Smith",
    "Margot Robbie", "Dwayne Johnson", "Ryan Reynolds", "Natalie Portman",
    "Angelina Jolie", "Brad Pitt"
  ];

  const genres = ["Acțiune", "Comedie", "Dramă", "Fantezie", "Horror", "Romantic", "Științifico-fantastic"];

  const movieTitles = [
    "Oppenheimer", "Barbie", "Killers of the Flower Moon", "Anatomia unei căderi", "Realitatea",
    "John Wick: Capitolul 4", "Close", "Infinity Pool", "Saint Omer", "EO",
    "Return to Seoul", "Holy Spider", "The Worst Ones", "The Whale", "Gladiator 2",
    "Wicked", "A Complete Unknown", "The Brutalist", "Queer", "Twisters"
  ];

  const movieDescriptions = [
    "Viața lui J. Robert Oppenheimer și crearea bombei atomice.",
    "O aventură plină de culoare despre celebra păpușă Barbie.",
    "O investigație despre crimele din tribul Osage din Oklahoma.",
    "Procesul unei scriitoare acuzate că și-a ucis soțul.",
    "Povestea reală a lui Reality Winner și scurgerea de informații clasificate.",
    "John Wick revine într-o aventură explozivă de acțiune.",
    "O dramă emoționantă despre prietenia a doi adolescenți.",
    "Un thriller psihologic despre o vacanță care ia o turnură înfricoșătoare.",
    "O jurnalistă investighează un caz cutremurător din Franța.",
    "O poveste impresionantă din perspectiva unui măgar.",
    "O tânără adoptată în Franța își caută părinții biologici în Coreea de Sud.",
    "Un criminal în serie terorizează Iranul și un jurnalist îi urmărește povestea.",
    "O metadramă despre copii dintr-un cartier sărac din Franța.",
    "Un bărbat supraponderal își reconstruiește relația cu fiica sa.",
    "Continuarea poveștii epice despre gladiatori și putere.",
    "O adaptare a celebrului musical despre vrăjitoarele din Oz.",
    "Povestea tânărului Bob Dylan și ascensiunea sa muzicală.",
    "Un arhitect imigrant își construiește visul în America.",
    "O explorare a identității queer în anii '50.",
    "O continuare a filmului clasic despre tornade devastatoare."
  ];

  const distributors = [
    "Warner Bros.", "Universal Pictures", "Paramount Pictures", "20th Century Studios",
    "Sony Pictures", "Netflix", "Amazon Studios", "Columbia Pictures", "Disney", "Lionsgate"
  ];

  const movies = [];

  for (let i = 0; i < count; i++) {
    const actorsCount = faker.number.int({ min: 2, max: 5 });
    const selectedActors = faker.helpers.arrayElements(actorsList, actorsCount);

    const movie = {
      title: movieTitles[i],
      releaseDate: faker.date.between({ from: '2024-01-01', to: '2025-01-29' }).toISOString(),
      actors: selectedActors,
      duration: faker.number.int({ min: 90, max: 180 }),
      language: faker.helpers.arrayElement(["Engleză", "Română", "Franceză", "Spaniolă", "Italiană"]),
      genre: faker.helpers.arrayElement(genres),
      description: movieDescriptions[i],
      rating: parseFloat((Math.random() * 3 + 7).toFixed(1)),
      imageUrl: faker.image.urlPicsumPhotos({ width: 300, height: 450 }),
      distributor: faker.helpers.arrayElement(distributors),
    };

    movies.push(movie);
  }

    const batch = db.batch();
    movies.forEach((movie, index) => {
    const movieRef = db.collection('movies').doc(`movie_${index + 1}`);
    batch.set(movieRef, movie);
  });

  await batch.commit();
  console.log(`S-au adaugat ${count} filme in Firestore cu succes!`);
}

generateMovies(20);
