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
      <ul class="auth-menu">
        <li v-for="auth in authItems" :key="auth.route" @click="navigate(auth.route)">
          {{ auth.label }}
        </li>
      </ul>
    </div>
    
  </nav>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const menuItems = ref([
      { label: "Rezervă", route: "tickets" },
      { label: "Filme", route: "movies" },
      { label: "Cinematografe", route: "cinemas" },
      { label: "Despre noi", route: "about" },
    ]);

    const authItems = ref([
      { label: "Autentificare", route: "login" },
      { label: "Înregistrare", route: "register" },
    ]);

    const navigate = (routeName) => {
      router.push({ name: routeName });
    };

    return { menuItems, authItems, navigate };
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

.navbar-menu li:not(:last-child)::after,
.auth-menu li:not(:last-child)::after {
  content: "";
  width: 3px;
  height: 20px;
  background-color: #ffdd57;
  position: absolute;
  right: 0; 
  margin-right: -10px; 
  top: 50%;
  transform: translateY(-50%);
}

.navbar-menu li,
.auth-menu li {
  margin: 0 10px;
  height: 24px; 
}
</style>
