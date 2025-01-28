<template>
    <div class="register-page">
      <div class="left-container">
        <h2 class="left-title">Alătură-te comunității noastre!</h2>
        <ul class="info-area">
          <li><strong>Acces rapid la bilete:</strong> Rezervă-ți locul în doar câțiva pași!</li>
          <li><strong>Fără alte costuri:</strong> Acces 100% gratuit la funcțiile platformei</li>
          <li><strong>Renunță la cozi:</strong> Din confortul casei tale, chiar și la cinema bar!</li>
        </ul>
        <div class="information">
          <h3>Te așteaptă:</h3>
          <p>→ Cele mai <strong>noi</strong> filme disponibile în rețeaua noastră</p>
          <p>→ O<strong> experiență superioară</strong>, garantată de <strong>peste 7000</strong> de clienți mulțumiți</p>
        </div>
        <p class="footer-text" style="text-align: center">Pentru că timpul tău contează!</p>
      </div>
  
      <div class="form-container">
        <h2 class="title">Înregistrează-te pe Movie Heaven</h2>
        <RegisterForm />
      </div>
    </div>
  </template>
  
  <script>
  import RegisterForm from '../components/RegisterForm.vue';
  
  export default {
    components: {
      RegisterForm,
    },
  };
  </script>
  
  <style scoped>
  .register-page {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    min-height: 100vh;
    background-color: #121212;
    padding: 0 20px;
    flex-wrap: wrap; 
  }
  
  .left-container {
    background-color: #1a1a1a;
    border-radius: 100px;
    padding: 35px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    width: 100%;
    max-width: 500px;
    margin-right: 7%;
    flex: 1 1 40%;
  }
  
  .left-title {
    font-size: 2rem;
    font-weight: bold;
    color: #ffdd57;
    text-align: left;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .info-area {
    list-style-type: none;
    padding-left: 0;
    color: #bbb;
    font-size: 1.1rem;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .info-area list li {
    margin-bottom: 10px;
  }
  
  .information {
    font-size: 1.1rem;
    color: #bbb;
    margin-top: 20px;
    text-align: center;
  }
  
  .information h3 {
    font-size: 1.6rem;
    font-weight: bold;
    color: #ffdd57;
    margin-bottom: 10px;
  }
  
  .information p {
    margin: 5px 0;
  }
  
  .footer-text {
    font-size: 1.2rem;
    color: #ffffff;
    margin-top: 20px;
  }
  
  .form-container {
    background-color: #1a1a1a;
    border-radius: 10px;
    padding: 40px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    width: 100%;
    max-width: 500px;
    flex-grow: 1;
  }
  
  .title {
    font-size: 2.2rem;
    font-weight: bold;
    color: #ffdd57;
    text-align: center;
    margin-bottom: 30px;
  }
  
  .error {
    color: #ff3333;
    font-size: 1rem;
    text-align: center;
    margin-top: 10px;
  }
  
  @media (max-width: 768px) {
    .register-page {
      flex-direction: column;
      align-items: center;
    }
  
    .left-container,
    .form-container {
      width: 100%;
      max-width: 100%;
      margin-bottom: 20px;
    }
  
    .form-container {
      max-width: 400px;
    }
  }
  </style>
  