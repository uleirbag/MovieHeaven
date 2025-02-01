<template>

  <div class="reservation-wrapper">
    <div class="reservation-form">

      <h2>Rezervă bilete:</h2>

      <div v-if="loading">Se încarcă programul...</div>
      <div v-else-if="errorMessage" class="error">{{ errorMessage }}</div>

      <!-- Formular detalii rezervare -->
      <div v-else>
        <label for="location">Alege locația:</label>
        <select v-model="selectedLocation" @change="updateAvailableDates">
          <option v-for="(schedule, location) in schedules" :key="location" :value="location">
            {{ locationFix(location) }}
          </option>
        </select>

        <label v-if="selectedLocation" for="date">Alege ziua:</label>
        <select v-if="selectedLocation" v-model="selectedDate" @change="updateAvailableTimes">
          <option v-for="date in availableDates" :key="date" :value="date">
            {{ date }}
          </option>
        </select>

        <label v-if="selectedDate" for="time">Alege ora:</label>
        <select v-if="selectedDate" v-model="selectedTime" @change="fetchSeats">
          <option v-for="time in availableTimes" :key="time" :value="time">
            {{ time }}
          </option>
        </select>

        <label v-if="selectedTime" for="ticketCount">Alege nr. de bilete:</label>
        <select v-if="selectedTime" v-model="ticketCount" @change="resetSeatSelection">
          <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>
    </div>

      <!-- Componenta selectare locuri -->
      <div class="seat-selection" v-if="seats.length">
        <SeatSelector
          :seats="seats"
          :selectedSeats="selectedSeats"
          :maxTickets="ticketCount"
          @update:selectedSeats="selectedSeats = $event"
        />
      </div>

  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import SeatSelector from "@/components/SeatSelector.vue";

  const route = useRoute();
  const schedules = ref({});
  const selectedLocation = ref(null);
  const selectedDate = ref(null);
  const selectedTime = ref(null);
  const ticketCount = ref(1);
  const availableDates = ref([]);
  const availableTimes = ref([]);
  const seats = ref([]);
  const selectedSeats = ref([]);
  const loading = ref(true);
  const errorMessage = ref("");

  const locationFix = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const fetchSchedule = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/program/${route.params.id}`);
      if (!response.ok) throw new Error("Programul filmului nu a fost gasit");
      const scheduleData = await response.json();
      schedules.value = scheduleData[0].schedule || {};
    } catch (error) {
      errorMessage.value = "Eroare la preluarea programului";
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchSchedule);

  const updateAvailableDates = () => {
    selectedDate.value = null;
    selectedTime.value = null;
    seats.value = [];
    selectedSeats.value = [];
    availableDates.value = schedules.value[selectedLocation.value] ? Object.keys(schedules.value[selectedLocation.value]) : [];
  };

  const updateAvailableTimes = () => {
    selectedTime.value = null;
    seats.value = [];
    selectedSeats.value = [];
    availableTimes.value =
      schedules.value[selectedLocation.value][selectedDate.value]?.map(entry => entry.time) || [];
  };

  const fetchSeats = async () => {
    if (!selectedLocation.value || !selectedDate.value || !selectedTime.value) return;
    try {
      loading.value = true;

      // Ruta API este: /api/locuri/:movieId/:city/:date/:time
      const url = `http://localhost:5000/api/locuri/${route.params.id}/${selectedLocation.value}/${selectedDate.value}/${selectedTime.value}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Locurile la acest film nu au fost gasite");
      
      const data = await response.json();
      const { totalSeats, occupiedSeats } = data;
     
      seats.value = Array.from({ length: totalSeats }, (_, i) => ({
        number: i + 1,
        occupied: occupiedSeats.includes(i + 1)
      }));
      selectedSeats.value = [];

    } catch (error) {
      errorMessage.value = "Eroare la preluarea locurilor";
    } finally {
      loading.value = false;
    }
  };

  const resetSeatSelection = () => {
    selectedSeats.value = [];
  };
</script>

<style scoped>

  .reservation-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 20px;
    background-color: #111; 
    color: white;
    border-radius: 10px;
    width: 90%;
    max-width: 900px;
    margin: auto;
    gap: 20px;
  }


  .reservation-form {
    flex: 0 0 40%;
    padding: 20px;
    background-color: #222;
    border-radius: 10px;
    text-align: center;
  }

  .seat-selection {
    flex: 0 0 55%;
    padding: 20px;
    background-color: #222;
    border-radius: 10px;
    text-align: center;
    max-width: 100%;
  }

  label {
    display: block;
    margin-top: 15px;
    font-size: 1rem;
    font-weight: bold;
    color: #ddd;
  }

  select {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border-radius: 8px;
    background-color: #333;
    color: white;
    border: 1px solid #555;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }

  select:hover {
    border-color: #777;
  }

  select:focus {
    outline: none;
    border-color: #ffdd57;
    box-shadow: 0 6px 12px rgba(255, 221, 87, 0.3);
  }

  option {
    background-color: #333;
    color: white;
    font-size: 1rem;
  }

  .error {
    color: red;
    margin-top: 10px;
  }
</style>
