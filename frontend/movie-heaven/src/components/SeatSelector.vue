<template>

    <div v-if="seats.length" class="seats-container">
      <h2 style="text-align: left;">Alege locurile:</h2>
      <h2>-----------ECRAN CINEMA-----------</h2>
      <div class="seats-grid">
        <div 
          v-for="seat in seats" 
          :key="seat.number" 
          :class="{ 'seat': true, 'occupied': seat.occupied, 'selected': selectedSeats.includes(seat.number) }"
          @click="handleSeatClick(seat)"
        >
          {{ seat.number }}
        </div>
      </div>
    </div>

</template>
  
<script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    seats: {
      type: Array,
      default: () => []
    },
    selectedSeats: {
      type: Array,
      default: () => []
    },
    maxTickets: {
      type: Number,
      default: 10
    }
  });
  
  const emit = defineEmits(['update:selectedSeats']);
  
  const handleSeatClick = (seat) => {
    if (seat.occupied) return;
  
    const alreadySelected = props.selectedSeats.includes(seat.number);

    // Previne utilizatorul sa aleaga mai multe locuri decat a pus in formular
    if (!alreadySelected && props.selectedSeats.length >= props.maxTickets) {
      alert(`Nu puteți selecta mai mult de ${props.maxTickets} locuri!`);
      return;
    }
  
    let updatedSeats;
    if (alreadySelected) {
      updatedSeats = props.selectedSeats.filter(num => num !== seat.number);
    } else {
      updatedSeats = [...props.selectedSeats, seat.number];
    }
    emit('update:selectedSeats', updatedSeats);
  };
  </script>
  
<style scoped>
  .seats-container {
    margin-top: 20px;
  }
  
  .seats-grid {
    display: grid;
    grid-template-columns: repeat(15, 40px);
    gap: 10px;
    justify-content: center;
    margin-top: 10px;
  }
  
  .seat {
    width: 40px;
    height: 40px;
    background-color: green;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 5px;
    font-weight: bold;
    transition: background 0.2s;
  }
  
  .occupied {
    background-color: red;
    cursor: not-allowed;
  }
  
  .selected {
    background-color: yellow;
    color: black;
  }
</style>
  