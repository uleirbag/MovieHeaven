const { faker } = require('@faker-js/faker');
const admin = require('firebase-admin');
const serviceAccount = require('../firebase_config/movieheaven-a47c9-firebase-adminsdk-fbsvc-5a2bad19ac.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function generateCinemas() {
  const cities = [
    { name: "București", county: "Ilfov" },
    { name: "Cluj-Napoca", county: "Cluj" },
    { name: "Timișoara", county: "Timiș" },
    { name: "Iași", county: "Iași" },
    { name: "Constanța", county: "Constanța" },
    { name: "Craiova", county: "Dolj" },
    { name: "Brașov", county: "Brașov" },
    { name: "Galați", county: "Galați" },
    { name: "Ploiești", county: "Prahova" },
    { name: "Oradea", county: "Bihor" }
  ];

  const cinemas = [];

  cities.forEach((city) => {
    const normalHalls = faker.number.int({ min: 3, max: 10 });
    const imaxHalls = faker.number.int({ min: 0, max: 2 });
    const d3Halls = faker.number.int({ min: 0, max: 3 });
    const totalHalls = normalHalls + imaxHalls + d3Halls;
    const totalSeats = totalHalls * faker.number.int({ min: 50, max: 250 });

    const capacity = [];
    if (normalHalls > 0) capacity.push(`${normalHalls} săli normale`);
    capacity.push(imaxHalls === 1 ? `o sală IMAX` : `${imaxHalls} săli IMAX`);
    capacity.push(d3Halls === 1 ? `o sală 3D` : `${d3Halls} săli 3D`);
    

    const cinema = {
      name: `Movie Heaven ${city.name}`,
      address: `${faker.address.streetAddress()}, ${city.name}, ${city.county}, România`,
      city: city.name,
      county: city.county,
      capacity: capacity,
      totalSeats: totalSeats,
      hasVIP: faker.datatype.boolean(),
      parkingAvailable: faker.datatype.boolean(),
      foodCourt: faker.datatype.boolean(),
      contactNumber: `+40 7${faker.number.int({ min: 1000000, max: 9999999 })}`,
      email: `cinema${city.name.toLowerCase().replace("ă", "a").replace("ș", "s").replace("ț", "t")}@movieheaven.ro`
    };

    cinemas.push(cinema);
  });

  const batch = db.batch();
  cinemas.forEach((cinema, index) => {
    const cinemaRef = db.collection('cinemas').doc(`cinema_${index + 1}`);
    batch.set(cinemaRef, cinema);
  });

  await batch.commit();
  console.log(`S-au adăugat ${cinemas.length} cinematografe în Firestore.`);
}

generateCinemas();
