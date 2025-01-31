<template>
    <div class="movie-details-content">
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
  </template>
  
<script setup>
  defineProps({
    movie: Object
  });
</script>
  
  <style scoped>
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
</style>
  