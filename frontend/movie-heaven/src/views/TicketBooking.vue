<template>
  <div class="movie-details-container">

    <!-- In cazul in care utilizatorul nu este autentificat in cont -->
    <div v-if="!isAuthenticated" class="no-access">
      <p>Pagina de rezervare a biletelor este disponibilă exclusiv membrilor înregistrați!</p>
      <p>Vă rugăm să vă autentificați sau să vă creați un cont nou pentru a beneficia de toate funcțiile platformei.</p>
      <button class="register-button" @click="goToRegister">Înregistrează-te acum</button>

      <div class="ascii-container">
        <pre><code>{{ asciiArt2 }}</code></pre>
        <pre><code>{{ asciiArt }}</code></pre>
        <pre><code>{{ asciiArt3 }}</code></pre>
      </div>
    </div>
    
    <!-- Pagina obisnuita, pentru utilizatori autentificati -->
    <div v-else>
      <div v-if="loading">Se încarcă detaliile filmului...</div>
      <div v-else-if="errorMessage">{{ errorMessage }}</div>
      
      <div v-else>
        <div class="content-container">
          <div class="details-and-reservation">
   
            <MovieDetails v-if="movie" :movie="movie" />
            <Reservation v-if="movie" :movieId="movie.id" class="reservation-box"  @updateReservation="updateReservationData" />
          
          </div>
        </div>

        <ModalWindow v-if="showModal" :message="modalMessage" @close="closeModal" />

        <!-- Toggle CinemaBar -->
        <div class="cinema-bar-toggle">
          <p>Ce spui de o gustare la film?</p>
          <button class="toggle-button" @click="toggleCinemaBar">
            {{ cinemaBarVisible ? "Ascunde meniu" : "Afișează meniu" }}
          </button>
        </div>
        <div v-if="cinemaBarVisible">
          <CinemaBar class="cinema-bar" @updateCinemaBarOrder="updateCinemaBarOrder" />
        </div>

        <!-- Buton confirmare rezervare -->
        <div class="confirm-container">
          <button class="confirm-button" @click="confirmReservation">
            Finalizează rezervarea
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { getAuth } from "firebase/auth";

import MovieDetails from "@/components/MovieDetails.vue";
import Reservation from "@/components/Reservation.vue";
import CinemaBar from "@/components/CinemaBar.vue";
import ModalWindow from "@/components/ModalWindow.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();
const movie = ref(null);
const loading = ref(true);
const errorMessage = ref("");
const auth = getAuth();

const currentUser = auth.currentUser;
const userId = currentUser ? currentUser.uid : null;
const userEmail = currentUser ? currentUser.email : null;


// variabilele pentru datele rezervarii provenite din componentele Reservation si CinemaBar
const reservationData = ref({
  location: "",
  date: "",
  time: "",
  ticketCount: 0,
  selectedSeats: []
});
const cinemaBarOrder = ref({});

// evenimente de update primite din componentele child
const updateReservationData = (data) => {
  reservationData.value = data;
};

const updateCinemaBarOrder = (data) => {
  cinemaBarOrder.value = data;
};

const isAuthenticated = computed(() => store.getters.isAuthenticated);

const fetchMovieDetails = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/filme/${route.params.id}`);
    if (!response.ok) throw new Error("Filmul nu a fost găsit.");
    movie.value = await response.json();
  } catch (error) {
    errorMessage.value = "Eroare la preluarea detaliilor filmului.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (isAuthenticated.value) {
    fetchMovieDetails();
  }
});

const goToRegister = () => {
  router.push("/register");
};

const cinemaBarVisible = ref(false);
const toggleCinemaBar = () => {
  cinemaBarVisible.value = !cinemaBarVisible.value;
};

const showModal = ref(false);
const modalMessage = ref('');
const closeModal = () => {
  showModal.value = false;
};

const confirmReservation = async () => {

  if (!reservationData.value.selectedSeats || reservationData.value.selectedSeats.length === 0) {

    modalMessage.value = `Nu puteți confirma rezervarea până nu vă alegeți locurile!`;
    showModal.value = true;
    return;
  }

  const reservation = {
    movieId: movie.value.id,
    movieTitle: movie.value.title,
    reservationDetails: reservationData.value,
    cinemaBarOrder: cinemaBarOrder.value,
    timestamp: new Date(),
    userId,      
    userEmail
  };

  try {
    const response = await fetch("http://localhost:5000/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reservation)
    });
    if (!response.ok) {
      throw new Error("Eroare la trimiterea rezervării");
    }
    
    const result = await response.json();
    console.log("Rezervare inregistrata cu succes:", result);
    router.push('/tickets');
  
  } catch (e) {
    console.error("Eroare la trimiterea rezervarii:", e);
    errorMessage.value = "Eroare la trimiterea rezervarii";
  }
};

const asciiArt = `

      :::   :::    ::::::::  :::     ::: ::::::::::: ::::::::::          :::    ::: ::::::::::     :::     :::     ::: :::::::::: ::::    ::: 
    :+:+: :+:+:  :+:    :+: :+:     :+:     :+:     :+:                 :+:    :+: :+:          :+: :+:   :+:     :+: :+:        :+:+:   :+:  
  +:+ +:+:+ +:+ +:+    +:+ +:+     +:+     +:+     +:+                 +:+    +:+ +:+         +:+   +:+  +:+     +:+ +:+        :+:+:+  +:+   
 +#+  +:+  +#+ +#+    +:+ +#+     +:+     +#+     +#++:++#            +#++:++#++ +#++:++#   +#++:++#++: +#+     +:+ +#++:++#   +#+ +:+ +#+    
+#+       +#+ +#+    +#+  +#+   +#+      +#+     +#+                 +#+    +#+ +#+        +#+     +#+  +#+   +#+  +#+        +#+  +#+#+#     
#+#       #+# #+#    #+#   #+#+#+#       #+#     #+#                 #+#    #+# #+#        #+#     #+#   #+#+#+#   #+#        #+#   #+#+#      
###       ###  ########      ###     ########### ##########          ###    ### ########## ###     ###     ###     ########## ###    ####       

`;

const asciiArt2 = `

::::    ::::   ::::::::  :::     ::: ::::::::::: ::::::::::      :::    ::: ::::::::::     :::     :::     ::: :::::::::: ::::    ::: 
+:+:+: :+:+:+ :+:    :+: :+:     :+:     :+:     :+:             :+:    :+: :+:          :+: :+:   :+:     :+: :+:        :+:+:   :+: 
+:+ +:+:+ +:+ +:+    +:+ +:+     +:+     +:+     +:+             +:+    +:+ +:+         +:+   +:+  +:+     +:+ +:+        :+:+:+  +:+ 
+#+  +:+  +#+ +#+    +:+ +#+     +:+     +#+     +#++:++#        +#++:++#++ +#++:++#   +#++:++#++: +#+     +:+ +#++:++#   +#+ +:+ +#+ 
+#+       +#+ +#+    +#+  +#+   +#+      +#+     +#+             +#+    +#+ +#+        +#+     +#+  +#+   +#+  +#+        +#+  +#+#+# 
#+#       #+# #+#    #+#   #+#+#+#       #+#     #+#             #+#    #+# #+#        #+#     #+#   #+#+#+#   #+#        #+#   #+#+# 
###       ###  ########      ###     ########### ##########      ###    ### ########## ###     ###     ###     ########## ###    #### 

`;

const asciiArt3 = `                                                                                                    
                                        _/                _/                                                           
 _/_/_/  _/_/      _/_/    _/      _/        _/_/        _/_/_/      _/_/      _/_/_/  _/      _/    _/_/    _/_/_/    
_/    _/    _/  _/    _/  _/      _/  _/  _/_/_/_/      _/    _/  _/_/_/_/  _/    _/  _/      _/  _/_/_/_/  _/    _/   
_/    _/    _/  _/    _/    _/  _/    _/  _/            _/    _/  _/        _/    _/    _/  _/    _/        _/    _/    
_/    _/    _/    _/_/        _/      _/    _/_/_/      _/    _/    _/_/_/    _/_/_/      _/        _/_/_/  _/    _/     
                                                                                                                       
                                                                                                                      
`;
</script>


<style scoped>
  .movie-details-container {
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 40px;
    color: #fff;
    background-color: #121212;
    min-height: 100vh;
    margin-left: 40px;
  }

  .content-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .details-and-reservation {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 20px;
  }

  .details-and-reservation > * {
    width: 100%;
  }

  .reservation-box {
    width: 100%;
    margin-top: 20px;
    background-color: #121212;
    margin-left: -20px;
  }

  .cinema-bar-toggle {
    background-color: #222;
    padding: 15px;
    border-radius: 10px;
    margin-top: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 63%;
  }

  .cinema-bar-toggle p {
    margin: 0 0 10px 0;
    font-size: 1.1rem;
  }

  .toggle-button {
    padding: 10px 20px;
    background-color: #ffdd57;
    color: #1e1e1e;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s;
    font-size: 0.9rem;
  }

  .toggle-button:hover {
    background-color: #ffd027;
  }

  .no-access {
    text-align: center;
    font-size: 1.2rem;
    color: #ffdd57;
    margin-top: 50px;
    margin-left: 15%;
    padding: 20px;
  }

  .no-access p {
    margin: 15px 0;
  }

  .register-button {
    background-color: #ffdd57;
    color: black;
    font-size: 1.1rem;
    padding: 12px 18px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-bottom: 3%;
  }

  .register-button:hover {
    background-color: #ffd027;
  }

  .ascii-container {
    background-color: black;
    color: #ffd027;
    font-family: monospace;
    white-space: pre-wrap;
    text-align: center;
    padding: 10px;
    border-radius: 8px;
    overflow-x: auto;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .ascii-container pre {
    font-size: 12px;
    line-height: 12px;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  .cinema-bar {
    margin-right: 35%;
    max-width: fit-content;
  }

  .confirm-container {
    margin-top: 30px;
    width: 100%;
    text-align: center;
    margin-left: -17%;
  }

  .confirm-button {
    padding: 12px 24px;
    background-color: #ffdd57;
    color: #1e1e1e;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 68%;
    font-weight: bold;
  }

  .confirm-button:hover {
    background-color: #ffd027;
  }
</style>
