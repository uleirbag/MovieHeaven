<template>
  <nav class="navbar">
    <div class="navbar-left">
      <a @click="navigate('home')" class="navbar-brand">Movie Heaven</a>
    </div>

    <div class="navbar-center">
      <ul class="navbar-menu">
        <li v-for="item in menuItems" :key="item.route" @click="navigate(item.route)">
          {{ item.label }}
        </li>
      </ul>
    </div>

    <div class="navbar-right">
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
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    const menuItems = [
      { label: "Rezervă", route: "tickets" },
      { label: "Filme", route: "movies" },
      { label: "Cinematografe", route: "cinemas" },
      { label: "Despre noi", route: "about" },
    ];

    const authItems = [
      { label: "Autentificare", route: "login" },
      { label: "Înregistrare", route: "register" },
    ];

    const user = computed(() => store.state.user);

    const navigate = (routeName) => {
      router.push({ name: routeName });
    };

    const logout = () => {
      store.dispatch("logout");
    };

    const getUserName = (email) => {
      const name = email.split('@')[0];
      return name.charAt(0).toUpperCase() + name.slice(1);
    };

    return { menuItems, authItems, navigate, user, logout, getUserName };
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
</style>
