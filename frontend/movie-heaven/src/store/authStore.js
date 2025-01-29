import { createStore } from "vuex";
import { auth } from "C:/Users/Gabi/Desktop/Movie Heaven/firebase_config/firebaseClient.js";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export default createStore({
  state: {
    user: null,
    loading: true,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
  },
  actions: {

    async register({ commit }, { email, password }) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        commit("SET_USER", userCredential.user);
        return true;
      } catch (error) {
        throw error;
      }
    },

    async login({ commit }, { email, password }) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        commit("SET_USER", userCredential.user);
        return true;
      } catch (error) {
        throw error;
      }
    },
    async logout({ commit }) {
      await signOut(auth);
      commit("SET_USER", null);
    },
    checkAuthState({ commit }) {
      commit("SET_LOADING", true);
      onAuthStateChanged(auth, (user) => {
        commit("SET_USER", user);
        commit("SET_LOADING", false);
      });
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
  },
});
