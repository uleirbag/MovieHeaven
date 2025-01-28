<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';

</script>

<template>
  <div id="app">

    <Navbar />
    <main>
      <RouterView />
    </main>

  </div>
</template>


<style scoped>
main {
  padding: 2rem;
  background-color: #121212;
  color: white;
  min-height: calc(100vh - 80px); 
}
</style>