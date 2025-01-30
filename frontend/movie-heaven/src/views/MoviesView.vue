<template>
    <div class="movies-container">
      <h1>La ce vrei să te uiți?</h1>
  
      <div v-if="loading">Se încarcă filmele...</div>
      <div v-else-if="errorMessage">{{ errorMessage }}</div>
  
      <div v-else class="movies-grid">
        <div v-for="movie in movies" :key="movie.id" class="movie-card-wrapper">
          <MovieCard :movie="movie" />
        </div>
      </div>
    </div>
</template>
  
<script setup>
  import { ref, onMounted } from "vue";
  import MovieCard from "../components/MovieCard.vue";
  
  const movies = ref([]);
  const loading = ref(true);
  const errorMessage = ref("");
  
  onMounted(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/filme");
      if (!response.ok) {
        throw new Error(`Eroare server: ${response.statusText}`);
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Datele primite nu sunt valide!");
      }
      movies.value = data;
    } catch (error) {
      console.error("Eroare la preluarea filmelor:", error);
      errorMessage.value = "Eroare la preluarea filmelor din backend";
    } finally {
      loading.value = false;
    }
  });
  </script>
  
  <style scoped>
  .movies-container {
    text-align: center;
    padding: 40px 20px;
  }
  
  h1 {
    color: #ffdd57;
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  .movies-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    justify-items: center;
  }
  
  .movie-card-wrapper {
    width: 100%;
    max-width: 300px;
  }

</style>
  