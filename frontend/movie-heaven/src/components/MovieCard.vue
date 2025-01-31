<template>

    <div class="movie-card">

      <img :src="movie.imageUrl" alt="Poster film" class="movie-poster" />
      <h2 style="text-decoration: underline;">{{ movie.title }}</h2>

      <p><strong>Gen:</strong> {{ movie.genre }}</p>
      <p><strong>Durată:</strong> {{ movie.duration }} min</p>
      <p><strong>Descriere:</strong> {{ movie.description }}</p>

      <button @click="reserveTickets">Rezervă bilete</button>

    </div>

</template>
  
<script setup>
import { useRouter } from "vue-router";

  const router = useRouter();
  const props = defineProps({
    movie: Object,
  });
  
  const reserveTickets = () => {
  router.push(`/movies/${props.movie.id}`);
  };
</script>
  
<style scoped>

  .movie-card {
    background-color: #2d2d2d;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    color: white;
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .movie-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(255, 221, 87, 0.3);
  }
  
  .movie-poster {
    width: 100%;
    max-width: 200px;
    height: auto;
    border-radius: 8px;
    margin-bottom: 15px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #ffdd57;
    color: black;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #ffd027;
  }

</style>
  