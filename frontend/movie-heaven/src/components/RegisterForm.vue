<template>
    <form @submit.prevent="register">
      <div class="input-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required placeholder="Introdu email-ul" />
      </div>
      <div class="input-group">
        <label for="password">Parolă:</label>
        <input type="password" v-model="password" id="password" required placeholder="Introdu parola" />
      </div>
      <div class="input-group">
        <label for="confirmPassword">Confirmă Parola:</label>
        <input type="password" v-model="confirmPassword" id="confirmPassword" required placeholder="Confirmă parola" />
      </div>
      <button type="submit" class="submit-button">Înregistrează-te</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { auth } from "C:/Users/Gabi/Desktop/Movie Heaven/firebase_config/firebaseClient.js";
  import { useRouter } from "vue-router"; 
  import { useStore } from "vuex";
  
  export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const errorMessage = ref(null);
    const router = useRouter();
    const store = useStore();

    const register = async () => {
      if (password.value !== confirmPassword.value) {
        errorMessage.value = "Parolele nu se potrivesc!";
        return;
      }

      try {
        await store.dispatch("register", { email: email.value, password: password.value });
        router.push({ name: "home" });
      } catch (error) {
        errorMessage.value = error.message;
      }
    };

    return { email, password, confirmPassword, errorMessage, register };
  },
};
</script>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
  }
  
  .input-group {
    margin-bottom: 15px;
  }
  
  label {
    color: #ffdd57;
    font-size: 1rem;
    margin-bottom: 8px;
  }
  
  input {
    padding: 10px;
    font-size: 1rem;
    background-color: #2d2d2d;
    border: 1px solid #444;
    color: white;
    border-radius: 5px;
    width: 100%;
    margin-bottom: 10px;
    margin-top: 5px;
    transition: border-color 0.3s ease;
  }
  
  input:focus {
    border-color: #ffdd57;
    outline: none;
  }
  
  .submit-button {
    background-color: #ffdd57;
    color: #1e1e1e;
    padding: 12px 20px;
    font-size: 1.2rem;
    border: none;
    cursor: pointer;
    border-radius: 100px;
    max-width: 80%;
    margin: 0 auto;
    transition: background-color 0.3s, transform 0.2s ease-in-out;
  }
  
  .submit-button:hover {
    background-color: #ffcc33;
    transform: scale(1.05);
  }
  
  .error {
    color: #ff3333;
    font-size: 0.9rem;
    text-align: center;
    margin-top: 10px;
  }
</style>
  