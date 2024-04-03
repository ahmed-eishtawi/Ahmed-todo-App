import { defineStore } from "pinia";

export const useNavbarStore = defineStore("navbarStore", {
  state: () => ({
    drawer: JSON.parse(localStorage.getItem('drawer')) ||false,
  }),
  actions: {
    toggleNavbar() {
      this.drawer = !this.drawer;
      localStorage.setItem('drawer', JSON.stringify(this.drawer))
    },
  },
  getters: {
    getNavbarState() {
      return this.drawer;
    },
  },
});