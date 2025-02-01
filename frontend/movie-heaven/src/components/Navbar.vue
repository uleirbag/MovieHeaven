<template>
  <nav class="navbar">
    <div class="navbar-left">
      <a @click="navigate('home')" class="navbar-brand">Movie Heaven</a>
    </div>

    <div class="mobileMenu" @click="toggleMenu">
      ☰
    </div>

    <div class="navbar-center" :class="{ 'menu-open': menuOpen }">
      <ul class="navbar-menu">
        <li v-for="item in menuItems" :key="item.route" @click="navigate(item.route)">
          {{ item.label }}
        </li>
      </ul>
    </div>

    <div class="navbar-right" :class="{ 'menu-open': menuOpen }">
      <ul class="auth-menu" v-if="!user">
        <li v-for="auth in authItems" :key="auth.route" @click="navigate(auth.route)">
          {{ auth.label }}
        </li>
      </ul>

      <div v-else class="user-info">
        <span class="user-text">Salut, {{ getUserName(user.email) }}!</span>
        <button @click="logout" class="logout-button">Deconectare</button>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const menuOpen = ref(false);

    const menuItems = [
      { label: "Filme", route: "movies" },
      { label: "Cinematografe", route: "cinemas" },
      { label: "Rezervările mele", route: "tickets" },
    ];

    const authItems = [
      { label: "Autentificare", route: "login" },
      { label: "Înregistrare", route: "register" },
    ];

    const user = computed(() => store.state.user);

    const navigate = (routeName) => {
      router.push({ name: routeName });
      menuOpen.value = false;
    };

    const logout = () => {
      store.dispatch("logout");
      menuOpen.value = false;
    };

    const getUserName = (email) => {
      const name = email.split('@')[0];
      return name.charAt(0).toUpperCase() + name.slice(1);
    };

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };

    return { menuItems, authItems, navigate, user, logout, getUserName, menuOpen, toggleMenu };
  },
};
</script>

<style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #1a1a1a;
    color: white;
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  .navbar-left .navbar-brand {
    font-size: 1.5rem;
    font-weight: bold;
    color: #ffdd57;
    text-decoration: none;
    cursor: pointer;
  }

  .mobileMenu {
    display: none;
    font-size: 1.8rem;
    cursor: pointer;
    color: white;
    max-height: 30%;
  }

  .navbar-center {
    display: flex;
    justify-content: center;
    flex-grow: 1;
  }

  .navbar-right {
    display: flex;
    align-items: center;
  }

  .navbar-menu,
  .auth-menu {
    display: flex;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .navbar-menu li,
  .auth-menu li {
    font-size: 1rem;
    cursor: pointer;
    color: white;
    font-weight: bold;
    padding: 0 15px;
    position: relative;
    line-height: 1.4;
  }

  .navbar-menu li:hover,
  .auth-menu li:hover {
    color: #ffdd57;
  }

  .user-info {
    display: flex;
    align-items: center;
  }

  .user-text {
    color: #ffdd57;
    font-size: 1rem;
    margin-right: 10px;
  }

  .logout-button {
    background-color: #ffdd57;
    color: #1e1e1e;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 100px;
    transition: background-color 0.3s, transform 0.2s ease-in-out;
  }

  .logout-button:hover {
    background-color: #ffcc33;
    transform: scale(1.05);
  }

  @media screen and (max-width: 768px) {
    .mobileMenu {
      display: block;
    }

    .navbar {
      flex-direction: row;
      align-items: center;
      padding: 1rem;
    }

    .navbar-center,
    .navbar-right {
      position: absolute;
      top: 60px;
      left: 0;
      width: 100%;
      background-color: #1a1a1a;
      flex-direction: column;
      align-items: center;
      display: none;
    }

    .navbar-center.menu-open,
    .navbar-right.menu-open {
      display: flex;
    }

    .navbar-menu,
    .auth-menu {
      margin-top: 10%;
      flex-direction: column;
      text-align: center;
      
    }

    .navbar-menu li,
    .auth-menu li {
    
      font-size: 1.2rem;
      margin-bottom: 20px;
    }
  }
</style>