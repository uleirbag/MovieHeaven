<template>
  <div class="my-tickets-container">
    <h1 class="page-title">Rezervările mele</h1>
    <div v-if="isLoading" class="loading">Se încarcă rezervările...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div v-if="reservations.length === 0" class="no-reservations">
        Nu există rezervări înregistrate.
      </div>
      <div v-else>
        <Order
          v-for="reservation in reservations"
          :key="reservation.id"
          :reservation="reservation"
        />
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted } from "vue";
import Order from "@/components/Order.vue";
import { getAuth } from "firebase/auth";

const reservations = ref([]);
const isLoading = ref(true);
const error = ref(null);

const auth = getAuth();
const currentUser = auth.currentUser;

const fetchReservations = async () => {
  isLoading.value = true;
  try {

    const userId = currentUser ? currentUser.uid : null;

    if (!userId) {
      throw new Error("Această pagină este doar pentru utilizatorii autentificați!");
    }

    const response = await fetch(`http://localhost:5000/api/tickets/${userId}`);
    if (!response.ok) {
      throw new Error("Eroare la preluarea rezervărilor.");
    }
    const data = await response.json();
    reservations.value = data;

  } catch (err) {
    console.error(err);
    error.value = err.message || "Eroare la încărcarea rezervărilor.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchReservations();
});

</script>

<style scoped>
  .my-tickets-container {
    padding: 20px;
    max-width: 800px;
    margin: auto;
    color: #fff;
    background-color: #121212;
    border-radius: 8px;
  }
  .page-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
  }
  .loading {
    text-align: center;
    color: #ccc;
  }
  .error {
    color: red;
    text-align: center;
  }
  .no-reservations {
    text-align: center;
    color: #ccc;
  }
</style>
