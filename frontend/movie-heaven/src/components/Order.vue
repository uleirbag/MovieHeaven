<template>

    <div class="order-container">
      <h3 class="movie-title">{{ reservation.movieTitle }}</h3>

      <p class="reservation-info">Locație: {{ locationFix(reservation.reservationDetails.location) }}</p>
      <p class="reservation-info">Data: {{ reservation.reservationDetails.date }}</p>
      <p class="reservation-info">Ora: {{ reservation.reservationDetails.time }}</p>
      <p class="reservation-info">Număr bilete: {{ reservation.reservationDetails.ticketCount }}</p>
      <p class="reservation-info" v-if="reservation.reservationDetails.selectedSeats.length">
        Locuri rezervate: {{ reservation.reservationDetails.selectedSeats.join(", ") }}
        <p></p>
        <p class="reservation-info">Data rezervării: {{ formattedDate }}</p>
      </p>

      <div v-if="hasCinemaBarOrder" class="cinema-bar-order">
        <h4>Comanda Cinema Bar:</h4>
        <div v-for="(items, category) in reservation.cinemaBarOrder" :key="category">
          <p class="order-category">{{ category }}:</p>
          <ul>
            <li v-for="(item, index) in items" :key="index">
              {{ item.product }} – {{ item.quantity }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from "vue";
  
  const locationFix = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const props = defineProps({
    reservation: {
      type: Object,
      required: true
    }
  });

  const formattedDate = computed(() => {
    return new Date(props.reservation.timestamp).toLocaleString();
  });
  
  const hasCinemaBarOrder = computed(() => {
    const order = props.reservation.cinemaBarOrder;
    return order && Object.keys(order).length > 0;
  });
  
</script>
  
<style scoped>
    .order-container {
      background-color: #222;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px;
      color: #fff;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
      width: 100%;
    }
    
    .movie-title {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 10px;
      color: #ffdd57
    }
    
    .reservation-info {
      margin: 5px 0;
      font-size: 1rem;
    }
    
    .cinema-bar-order {
      margin-top: 15px;
      padding-top: 10px;
      border-top: 1px solid #444;
    }
    
    .cinema-bar-order h4 {
      margin-bottom: 10px;
      font-size: 1.2rem;
      font-weight: bold;
    }
    
    .order-category {
      font-weight: bold;
      margin: 5px 0;
    }
    
    ul {
      list-style: disc;
      padding-left: 20px;
    }
    
    li {
      font-size: 0.95rem;
      margin-bottom: 3px;
    }
</style>
  