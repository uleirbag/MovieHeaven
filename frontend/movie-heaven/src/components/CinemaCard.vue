<template>
    <div class="cinema-card">
      <h2 style="text-align: center;">{{ cinema.name }}</h2>
      <p><strong>Adresa:</strong> {{ cinema.address.split(',')[0] }}</p>
      <p><strong>Săli:</strong> {{ Array.isArray(cinema.capacity) ? cinema.capacity.join(", ") : "Necunoscut" }}</p>
      <p><strong>Capacitate totală:</strong> {{ cinema.totalSeats }} locuri</p>
      <p><strong>Parcare:</strong> {{ cinema.parkingAvailable ? "✅ Da" : "❌ Nu" }}</p>
      <p><strong>Contact:</strong> 📞 {{ cinema.contactNumber }}</p>
      <p><strong>Email:</strong> ✉️ {{ cinema.email }}</p>
    </div>
</template>
  
<script setup>
  import { computed } from "vue";
  
  const props = defineProps({
    cinema: Object
  });
  
</script>
  
<style scoped>
  .cinema-card {
    background-color: #2d2d2d;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: left;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s;
    color: white;
    border: 1px solid #444;
    border-radius: 25px;
  }
  
  .cinema-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(255, 221, 87, 0.3);
    border-color: #ffdd57;
  }
  
  h2 {
    font-size: 1.6rem;
    margin-bottom: 10px;
    color: #ffdd57;
  }
  
  .address {
    font-size: 1rem;
    color: #bbb;
    margin-bottom: 8px;
  }
  
  p {
    font-size: 1rem;
    color: #ddd;
    margin: 5px 0;
    margin-bottom: 10px;
  }
</style>