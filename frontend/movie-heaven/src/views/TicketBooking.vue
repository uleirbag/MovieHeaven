<template>

  <div class="movie-details-container">

    <!-- In cazul in care utilizatorul nu este autentificat in cont -->
    <div v-if="!isAuthenticated" class="no-access">
      <p>Pagina de rezervare a biletelor este disponibilă exclusiv membrilor înregistrați!</p>
      <p>Vă rugăm să vă autentificați sau să va creați un cont nou pentru a beneficia de toate funcțiile platformei.</p>
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
      
      <div v-else class="content-container">
        <div class="details-and-reservation">
          <MovieDetails v-if="movie" :movie="movie" />
          <Reservation v-if="movie" :movieId="movie.id" class="reservation-box" />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useStore } from "vuex";
  import MovieDetails from "@/components/MovieDetails.vue";
  import Reservation from "@/components/Reservation.vue";


  const store = useStore();
  const route = useRoute();
  const router = useRouter();
  const movie = ref(null);
  const loading = ref(true);
  const errorMessage = ref("");

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
    align-items:start;
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
    margin-right: 35%;
    background-color: #121212;
  }

  .no-access {
  text-align: center;
  font-size: 1.2rem;
  color: #ffdd57;
  margin-top: 50px;
  padding: 20px;
  max-width: 90%;
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

  @media (max-width: 768px) {
  .no-access {
    font-size: 1rem;
    padding: 10px;
  }

  .register-button {
    font-size: 1rem;
    padding: 10px 15px;
    max-width: 100%;
  }
}

  @media (max-width: 480px) {
    .no-access {
      font-size: 0.9rem;
    }

    .register-button {
      font-size: 0.9rem;
      padding: 8px 12px;
    }
}
</style>