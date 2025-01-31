<template>
    <div class="movies-container">
      <h1>La ce vrei să te uiți?</h1>
  
      <div class="search-bar">
        <input
          type="text"
          v-model="searchWord"
          placeholder="Caută filmul dorit..."
          @input="searchMovies"
        />
      </div>
  
      <div v-if="loading" class="loading-text">Se încarcă filmele...</div>
      <div v-else-if="errorMessage" class="error-text">{{ errorMessage }}</div>
  
      <div v-else class="movies-grid">
        <div v-for="movie in filteredMovies" :key="movie.id" class="movie-card-wrapper">
          <MovieCard :movie="movie" />
        </div>
      </div>

    </div>
</template>
  
<script setup>
  import { ref, computed, onMounted } from "vue";
  import MovieCard from "../components/MovieCard.vue";
  
  const movies = ref([]);
  const searchWord = ref("");
  const loading = ref(true);
  const errorMessage = ref("");
  
  const fetchMovies = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/filme");
      if (!response.ok) throw new Error("Eroare la preluarea filmelor");
      movies.value = await response.json();
    } catch (error) {
      errorMessage.value = "Eroare la preluarea filmelor din backend";
    } finally {
      loading.value = false;
    }
  };
  
  const filteredMovies = computed(() => {
    if (!searchWord.value) {
      return movies.value;
    }
    return movies.value.filter(movie =>
      movie.title.toLowerCase().includes(searchWord.value.toLowerCase()));
  });
  
  onMounted(fetchMovies);
</script>
  
<style scoped>

  .movies-container {
    text-align: center;
    padding: 40px 20px;
    background-color: #121212; 
    color: #e0e0e0;
    min-height: 100vh;
  }
  
  h1 {
    color: #ffdd57;
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  .search-bar {
    margin: 20px 0;
  }
  
  .search-bar input {
    width: 100%;
    max-width: 400px;
    padding: 12px 16px;
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid #444; 
    background-color: #222; 
    color: #fff; 
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  
  .search-bar input::placeholder {
    color: #aaa; 
  }
  
  .search-bar input:focus {
    border-color: #ffdd57;
    box-shadow: 0 0 10px rgba(255, 221, 87, 0.5);
  }
  
  .loading-text,
  .error-text {
    font-size: 1.2rem;
    margin-top: 20px;
    color: #ffdd57;
  }
  
  .movies-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    justify-items: center;
  }
  
  .movie-card-wrapper {
    width: 100%;
    max-width: 300px;
  }
  
</style>
  