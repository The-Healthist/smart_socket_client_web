// store/themeStore.ts
import { defineStore } from "pinia";

export type ThemeColor = "orange" | "green" | "red" | "white";

export const useThemeStore = defineStore({
  id: "theme",
  state: () => ({
    themes: ["orange", "green", "red", "white"] as ThemeColor[],
    activeTheme: "orange" as ThemeColor
  }),
  getters: {
    getTheme: state => state.activeTheme,
    getThemes: state => state.themes
  },
  actions: {
    setTheme(theme: ThemeColor) {
      this.activeTheme = theme;
    }
  },
  persist: {
    key: "colorTheme",
    storage: localStorage
  }
});
