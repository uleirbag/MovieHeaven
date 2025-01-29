<template>
    <div class="login-page">

      <div class="form-container">
        <h2 class="titlu">Bine ai revenit pe Movie Heaven!</h2>
        <p class="subtitlu">Autentifică-te pentru a continua</p>
       
        <LoginForm />

      </div>
    </div>
</template>
  
<script>
  import LoginForm from "../components/LoginForm.vue";
  
  export default {
    components: {
      LoginForm,
    },
  };
</script>
  
<style scoped>
    .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 75vh; 
    background-color: #121212;
    padding: 20px;
    overflow: hidden; 
    }

    .form-container {
    background-color: #1a1a1a;
    border-radius: 10px;
    padding: 40px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    width: 100%;
    max-width: 400px;
    text-align: center;
    }

    .titlu {
    font-size: 2rem;
    font-weight: bold;
    color: #ffdd57;
    margin-bottom: 10px;
    }

    .subtitlu {
    font-size: 1.2rem;
    color: #bbb;
    margin-bottom: 20px;
    }
</style>
  