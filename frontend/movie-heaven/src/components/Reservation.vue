<template>
    <div class="reservation-container">
      <h2>Rezervă bilete:</h2>
  
      <div v-if="loading">Se încarcă programul...</div>
      <div v-else-if="errorMessage" class="error">{{ errorMessage }}</div>
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
        <select v-if="selectedDate" v-model="selectedTime">
          <option v-for="time in availableTimes" :key="time" :value="time">
            {{ time }}
          </option>
        </select>
      </div>
    </div>
</template>
  
<script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  
  const route = useRoute();
  const schedules = ref({});
  const selectedLocation = ref(null);
  const selectedDate = ref(null);
  const selectedTime = ref(null);
  const availableDates = ref([]);
  const availableTimes = ref([]);
  const loading = ref(true);
  const errorMessage = ref("");

  const locationFix = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
  };

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
    availableDates.value = Object.keys(schedules.value[selectedLocation.value] || {});
  };
  
  const updateAvailableTimes = () => {
    selectedTime.value = null;
    availableTimes.value = schedules.value[selectedLocation.value][selectedDate.value].map(entry => entry.time);
  };
  </script>
  
<style scoped>
  .reservation-container {
    padding: 20px;
    background-color: #222;
    color: white;
    border-radius: 10px;
    width: 80%;
    max-width: 500px;
    margin: auto;
    text-align: center;
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
</style>
  