<template>
  <div class="landing-page">

    <header class="hero">
      <div class="hero-content">
        <h1>Movie Heaven - Magia filmelor începe aici ❣</h1>
        <p>Rezervă-ți locul pentru filmele preferate și vizionează-le în cinematografele din toată țara!</p>
        <button @click="goToMovies" class="buton">Începe acum</button>
      </div>
    </header>

    <section class="features">
      <h2>Serviciile noastre</h2>
      <div class="feature-cards">
        <div class="feature-card" v-for="(service, index) in services" :key="index">
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
        </div>
      </div>
    </section>

    <section class="news">
      <h2>★  Noutăți din lumea filmului  ★</h2>

      <div class="news-item">
        <h3>✪ Ultimele lansări de filme</h3>
        <ul>
          <li>
            <strong>Nosferatu (2025)</strong><br>
            Un remake al clasicului horror din 1922, regizat de Robert Eggers, cu Bill Skarsgård în rolul principal.
          </li>
          <li>
            <strong>The Substance (2024)</strong><br>
            Un thriller psihologic cu Demi Moore și Margaret Qualley, regizat de Darren Aronofsky.
          </li>
        </ul>
      </div>

      <div class="news-item">
        <h3>✪ Nominalizările la Premiile Oscar 2025</h3>
        <ul>
          <li><strong>Cel mai bun film:</strong> „Anora”, „The Brutalist”, „A Complete Unknown”, „Conclave”, „Dune: Part Two”, „Emilia Pérez”, „I’m Still Here”, „Nickel Boys”, „The Substance”, „Wicked”</li>
          <li><strong>Cel mai bun actor în rol principal:</strong> Adrien Brody - „The Brutalist”, Timothée Chalamet - „A Complete Unknown”, Colman Domingo - „Sing Sing”, Ralph Feinnes - „Conclave”, Sebastian Stan - „The Apprentice”</li>
          <li><strong>Cea mai bună actriță într-un rol principal:</strong> Cynthia Erivo - „Wicked”, Karla Sofía Gascón - „Emilia Pérez”, Mikey Madison - „Anora”, Demi Moore - „The Substance”, Fernanda Torres - „I’m Still Here”</li>
          <li><strong>Cel mai bun regizor:</strong> Sean Baker - „Anora”, Brady Corbet - „The Brutalist”, James Mangold - „A Complete Unknown”, Jacques Audiard - „Emilia Pérez”, Coralie Fargeat - „The Substance”</li>
        </ul>
      </div>
    </section>

    <footer class="footer">
      <p>&copy; 2025 Movie Heaven - Toate drepturile rezervate</p>
    </footer>
  </div>
</template>
  
<script>
    import { ref } from "vue";
    import { useRouter } from "vue-router";
    export default {
      setup() {
        const services = ref([
          { title: 'Rezervare rapidă', description: 'Obține biletele cât ai zice motor... acțiune!' },
          { title: 'Cinema bar', description: 'Cel mai bun Popcorn și o gamă extinsă de gustări și băuturi răcoritoare' },
          { title: 'Plăți sigure', description: 'Rapid, online, fară griji!' },
        ]);

        const router = useRouter();
        const goToMovies = () => {
          router.push("/movies");
        };

        return {
          services,
          goToMovies,
        };
      },
    };
</script>

<style scoped>

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #121212; 
    color: white; 
  }
  
  .hero {
    background-size: cover;
    background-position: center;
    color: white;
    text-align: center;
    padding: 80px 20px;
    border-bottom: 5px solid #ffdd57;
  }
  
  .hero-content h1 {
    font-size: 3.5rem;
    margin-bottom: 20px;
    font-weight: bold;
  }
  
  .hero-content p {
    font-size: 1.3rem;
    margin-bottom: 30px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .buton {
    background-color: #ffdd57;
    color: #1e1e1e;
    padding: 12px 30px;
    font-size: 1.2rem;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s, transform 0.2s ease-in-out;
  }
  
  .buton:hover {
    background-color: #ffcc33;
    transform: scale(1.05); 
  }
  
  .features {
    text-align: center;
    padding: 60px 20px;
    background-color: #181818; 
  }
  
  .features h2 {
    font-size: 2rem;
    margin-bottom: 30px;
    color: #ffdd57; 
  }
  
  .feature-cards {
    display: flex;
    justify-content: space-around;
    gap: 20px;
    flex-wrap: wrap;
  }
  
  .feature-card {
    background-color: #2d2d2d; 
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 250px;
    text-align: center;
    transition: transform 0.3s ease-in-out;
  }
  
  .feature-card:hover {
    transform: translateY(-10px);
  }
  
  .feature-card h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #ffdd57; 
  }
  
  .feature-card p {
    font-size: 1rem;
    color: #bbb; 
  }
  
  .news {
    background-color: #1a1a1a;
    padding: 40px 20px;
    text-align: left;
    color: white;
  }
  
  .news h2 {
    font-size: 2.2rem;
    margin-bottom: 30px;
    color: #ffdd57; 
  }
  
  .news-item {
    background-color: #2d2d2d;
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 8px;
    transition: background-color 0.3s ease, transform 0.2s ease-in-out;
  }
  
  .news-item:hover {
    background-color: #333333;
    transform: translateY(-5px); 
  }
  
  .news-item h3 {
    font-size: 1.6rem;
    margin-bottom: 10px;
    color: #ffdd57; 
  }
  
  .news-item ul {
    list-style-type: none;
    padding-left: 0;
  }
  
  .news-item li {
    font-size: 1rem;
    color: #bbb;
    margin-bottom: 10px;
  }
  

  .footer {
    text-align: center;
    padding: 30px 20px;
    background-color: #1e1e1e;
    color: white;
  }
  
  .footer p {
    font-size: 0.9rem;
  }
</style>
  