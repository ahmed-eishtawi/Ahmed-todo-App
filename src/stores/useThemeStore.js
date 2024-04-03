import { defineStore } from "pinia";

export const useThemeStore = defineStore("themeStore", {
  state: () => ({
    isDarkMode: JSON.parse(localStorage.getItem("isDarkMode")) || false,
  }),
  actions: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem("isDarkMode", JSON.stringify(this.isDarkMode));
    },
  },
  getters: {
    getTheme() {
      return this.isDarkMode ? "dark" : "light";
    },
  },
});
