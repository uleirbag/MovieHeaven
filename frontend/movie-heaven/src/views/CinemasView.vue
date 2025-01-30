<template>

    <div class="cinemas-container">

      <h1 style="text-align: left; margin-left: 12%;">Cinematografele Movie Heaven din țară:</h1>

      <div v-if="loading">Se încarcă cinematografele...</div>
      <div v-else-if="errorMessage">{{ errorMessage }}</div>

     <div v-else class="cinemas-grid">
        <div class="map-container">
          <img src="@/assets/romania.svg" alt="Harta României" class="romania-map" />
        </div>
    
        <div v-for="(cinema, index) in cinemas":key="cinema.id" class="cinema-card-around">
          <CinemaCard :cinema="cinema" />
        </div>
     </div>
    </div>

</template>
  
<script setup>
  import { ref, onMounted } from "vue";
  import CinemaCard from "../components/CinemaCard.vue";
  
  const cinemas = ref([]);
  const loading = ref(true);
  const errorMessage = ref("");
  
  onMounted(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/cinemauri");
      if (!response.ok) {
        throw new Error(`Eroare server: ${response.statusText}`);
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Datele primite nu sunt valide!");
      }

      cinemas.value = data;

    } catch (error) {
      console.error("Eroare la preluarea cinematografelor:", error);
      errorMessage.value = "Eroare la preluarea cinematografelor din backend";
    } finally {
      loading.value = false;
    }
  });
</script>
  
<style scoped>

  .cinemas-container {
    text-align: center;
    padding: 40px 20px;
  }
  
  h1 {
    color: #ffdd57;
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  .cinemas-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 20px;
    justify-items: center;
    align-items: center;
    margin-bottom: 40px;
  }
  
  .map-container {
    grid-column: 1 / 3; /* primele 2 coloane din grid */ 
    grid-row: 1 / 3; /* primele 2 randuri din grid */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .romania-map {
    width: 100%; 
    max-width: 700px;
    height: auto;
    opacity: 0.9;
    transition: transform 0.3s ease-in-out;
  }
  
  .romania-map:hover {
    transform: scale(1.1);
    opacity: 1;
  }
  
  .cinema-card-around {
    width: 100%;
    max-width: 400px;
  }
  
  @media (max-width: 768px) {
    .cinemas-grid {
      grid-template-columns: 1fr; /* toate elementele pe un rand */
      grid-template-rows: auto;
    }
  
    .map-container {
      grid-column: 1; 
      grid-row: auto;
    }
  
    .romania-map {
      max-width: 100%; 
    }
  
    .cinema-card-around {
      max-width: 100%;
    }
  }
</style>
  