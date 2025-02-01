import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '@/views/Homepage.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import CinemasView from '@/views/CinemasView.vue'
import MoviesView from '@/views/MoviesView.vue'
import TicketBooking from '@/views/TicketBooking.vue'
import MyTickets from '@/views/MyTickets.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Homepage,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/cinemas',
      name: 'cinemas',
      component: CinemasView,
    },
    {
      path: '/movies',
      name: 'movies',
      component: MoviesView,
    },
    {
      path: '/movies/:id',
      name: 'bookTickets',
      component: TicketBooking,
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: MyTickets
    },
  ],
})

export default router
