<template>
  <div id="app">

    <Navbar />
    <main>
      <RouterView />
    </main>

  </div>
</template>

<script setup>
  import { RouterLink, RouterView } from 'vue-router';
  import Navbar from './components/Navbar.vue';
  import { onMounted } from "vue";
  import { useStore } from "vuex";


  const store = useStore();

  onMounted(() => {
    store.dispatch("checkAuthState"); 
  });
</script>

<style scoped>
main {
  padding: 2rem;
  background-color: #121212;
  color: white;
  min-height: calc(100vh - 80px); 
}
</style>