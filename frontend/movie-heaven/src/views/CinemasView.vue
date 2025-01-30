<template>
    <div class="cinemas-container">
      <h1>Lista Cinematografelor</h1>
      <div v-if="loading">Se încarcă cinematografele...</div>
      <div v-else-if="errorMessage">{{ errorMessage }}</div>
      <div v-else class="cinemas-grid">
        <CinemaCard v-for="cinema in cinemas" :key="cinema.id" :cinema="cinema" />
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
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    justify-content: center;
  }
</style>