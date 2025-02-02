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

        <ModalWindow 
        v-if="showModal" 
        :message="modalMessage" 
        @close="closeModal" />
        
</template>
  
<script setup>
  import { defineProps, defineEmits, ref } from 'vue';
  import ModalWindow from "@/components/ModalWindow.vue";
  
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

  // Reactive variables for modal
  const showModal = ref(false);
  const modalMessage = ref('');

  
  const handleSeatClick = (seat) => {
    if (seat.occupied) return;
  
    const alreadySelected = props.selectedSeats.includes(seat.number);

    // afisam fereastra de eroare daca user-ul incearca sa aleaga mai multe bilete decat a selectat
    if (!alreadySelected && props.selectedSeats.length >= props.maxTickets) {
      modalMessage.value = `Nu puteți selecta mai mult de ${props.maxTickets} ${props.maxTickets === 1 ? 'loc' : 'locuri'}!`;
      showModal.value = true;
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

  const closeModal = () => {
  showModal.value = false;
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