<template>
    <form @submit.prevent="login">
      <div class="input-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required placeholder="Introdu email-ul" />
      </div>
      <div class="input-group">
        <label for="password">Parolă:</label>
        <input type="password" v-model="password" id="password" required placeholder="Introdu parola" />
      </div>
      <button type="submit" class="submit-button">Autentificare</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
</template>
  
<script>
  import { ref } from "vue";
  import { auth } from "C:/Users/Gabi/Desktop/Movie Heaven/firebase_config/firebaseClient.js";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from "vue-router";
  import { useStore } from "vuex";

  export default {
    setup() {
      const email = ref("");
      const password = ref("");
      const errorMessage = ref(null);
      const store = useStore();
      const router = useRouter();
  
      const login = async () => {
        try {
            await store.dispatch("login", { email: email.value, password: password.value });
            router.push({ name: "home" });
        } catch (error) {
            errorMessage.value = "Combinație email / parolă incorectă!";
        }
        };

      return { email, password, errorMessage, login };
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
    text-align: left;
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