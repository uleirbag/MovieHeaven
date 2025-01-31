<template>

    <div class="movie-details-container">
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
      
      <div v-else>
        <div v-if="loading">Se încarcă detaliile filmului...</div>
        <div v-else-if="errorMessage">{{ errorMessage }}</div>
        <div v-else class="movie-details-content">
          <div class="movie-poster-container">
            <img :src="movie.imageUrl" alt="Poster film" class="movie-poster" />
          </div>
          <div class="movie-info-container">
            <h1>{{ movie.title }}</h1>
            <p><strong>Gen:</strong> {{ movie.genre }}</p>
            <p><strong>Durată:</strong> {{ movie.duration }} min</p>
            <p><strong>Rating:</strong> ⭐ {{ movie.rating }}/10</p>
            <p><strong>Distribuitor:</strong> {{ movie.distributor }}</p>
            <p><strong>Limba:</strong> {{ movie.language }}</p>
            <p><strong>Actori principali:</strong> {{ movie.actors.join(", ") }}</p>
            <p><strong>Descriere:</strong> {{ movie.description }}</p>
        
            <button class="reserve-button">Continuă cu rezervarea</button>
            <RouterLink to="/movies" class="back-button">Înapoi la filme</RouterLink>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script setup>
  import { ref, onMounted, computed } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useStore } from "vuex"; 
  
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
    align-items: center;
    padding: 40px;
    color: #fff;
    background-color: #121212;
    min-height: 100vh;
  }
  
  .no-access {
    text-align: center;
    font-size: 1.2rem;
    color: #ffdd57;
    margin-top: 50px;
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
  }
  
  .register-button:hover {
    background-color: #ffd027;
  }
  
  .movie-details-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
  }
  
  .movie-poster-container {
    flex: 0 0 auto;
    margin-right: 30px;
  }
  
  .movie-poster {
    width: 250px;
    border-radius: 10px;
  }
  
  .movie-info-container {
    flex: 1;
    text-align: left;
  }
  
  .reserve-button {
    display: inline-block;
    margin-top: 20px;
    padding: 12px 18px;
    background: #ffdd57;
    color: black;
    font-size: 1.1rem;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .reserve-button:hover {
    background: #ffd027;
  }
  
  .back-button {
    display: inline-block;
    margin-top: 15px;
    padding: 10px 15px;
    background: #444;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
  }
  
  .back-button:hover {
    background: #666;
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

</style>
  