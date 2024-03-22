import { defineStore } from "pinia";

export const useThemeStore = defineStore("themeStore", {
  state: () => ({
    isDarkMode: false,
  }),
  actions: {},
  getters: {
    getTheme() {
      return this.isDarkMode ? "dark" : "light";
    },
  },
});
