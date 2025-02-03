<template>
    <div class="order-container">
      <div class="info-qr-container">
      <div class="text-info">
        <h3 class="movie-title">{{ reservation.movieTitle }}</h3>

        <p class="reservation-info">
          Locație: {{ locationFix(reservation.reservationDetails.location) }}
        </p>

        <p class="reservation-info">
          Data: {{ reservation.reservationDetails.date }}
        </p>

        <p class="reservation-info">
          Ora: {{ reservation.reservationDetails.time }}
        </p>

        <p class="reservation-info">
          Număr bilete: {{ reservation.reservationDetails.ticketCount }}
        </p>

        <p class="reservation-info" v-if="reservation.reservationDetails.selectedSeats.length">
          Locuri rezervate: {{ reservation.reservationDetails.selectedSeats.join(", ") }}
        </p>

        <p class="reservation-info">
          Data rezervării: {{ formattedDate }}
        </p>
      </div>

      <!-- Cod QR bilete -->
      <div v-if="qrCode1" class="qr-code">
        <h3>Cod QR bilete:</h3>
        <img :src="qrCode1" alt="QR Code" />
      </div>
    </div>

    <div v-if="hasCinemaBarOrder" class="cinema-bar-order">
      
      <div class="info-qr-container">
        <div class="text-info">
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

        <!-- Cod QR Cinema bar -->
        <div v-if="qrCode2" class="qr-code">
          <h4>Cod QR cinema bar:</h4>
          <img :src="qrCode2" alt="QR Code" />
        </div>
        
      </div>
    </div>

    
    <button class="delete-button" @click="deleteReservation">
      Anulează rezervarea
    </button>
  </div>
</template>

<script setup>
  import { computed, ref } from "vue";
  import QRCode from "qrcode";

  const props = defineProps({
    reservation: {
      type: Object,
      required: true
    }
  });

  const formattedDate = computed(() => {
    return new Date(props.reservation.timestamp).toLocaleString();
  });

  const locationFix = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const hasCinemaBarOrder = computed(() => {
    const order = props.reservation.cinemaBarOrder;
    return order && Object.keys(order).length > 0;
  });

  const deleting = ref(false);
  const qrCode1 = ref("");
  const qrCode2 = ref("");

  const orderData = JSON.stringify({
    movieId: props.reservation.movieId,
    movieTitle: props.reservation.movieTitle,
    reservationDetails: props.reservation.reservationDetails,
 
  });

  QRCode.toDataURL(orderData)
    .then(url => {
      qrCode1.value = url;
    })
    .catch(err => {
      console.error("Eroare generare cod QR:", err);
    });

    const cinemaBarData = JSON.stringify({
      cinemaBarOrder: props.reservation.cinemaBarOrder

    })

    QRCode.toDataURL(cinemaBarData)
    .then(url => {
      qrCode2.value = url;
    })
    .catch(err => {
      console.error("Eroare generare cod QR:", err);
    });

const deleteReservation = async () => {
  const confirmation = window.confirm("Ești sigur că vrei să anulezi această rezervare?");
  if (!confirmation) return;

  deleting.value = true;
  try {
  
    const response = await fetch(`http://localhost:5000/api/tickets/${props.reservation.id}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      throw new Error("Eroare la anularea rezervarii");
    }
    alert("Rezervarea a fost anulata cu succes");
    window.location.reload();

  } catch (error) {
    console.error("Eroare la anularea rezervarii:", error);
    alert("Eroare la anularea rezervarii");
  } finally {
    deleting.value = false;
  }
};
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
    color: #ffdd57;
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

  .delete-button {
    margin-top: 15px;
    padding: 10px 20px;
    background-color: #ff4d4d;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s;
  }

  .delete-button:hover {
    background-color: #ff1a1a;
  }

  .qr-code {
  margin-top: 20px;
  text-align: center;
  margin-right: 50px;
  }

  .qr-code img {
    max-width: 200px;
    border-radius: 8px;
  }

  .info-qr-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .text-info {
    display: flex;
    flex-direction: column; 
    gap: 5px; 
    flex: 2; 
  }

</style>