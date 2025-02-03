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
import { getAuth, onAuthStateChanged } from "firebase/auth";

const reservations = ref([]);
const isLoading = ref(true);
const error = ref(null);
const currentUserId = ref(null);

const fetchReservations = async (userId) => {
  isLoading.value = true;
  try {
    // Apel către backend pentru a prelua rezervările utilizatorului curent
    const response = await fetch(`http://localhost:5000/api/tickets/${userId}`);
    if (!response.ok) {
      throw new Error("Momentan nu ați realizat nicio rezervare. Va așteptăm să explorați oferta noastră!");
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

const auth = getAuth();
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUserId.value = user.uid;
      fetchReservations(user.uid);
    } else {
      error.value = "Această pagină este doar pentru utilizatorii autentificați!";
      isLoading.value = false;
    }
  });
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
