import { defineStore } from "pinia";

export type ThemeRounded = "base" | "muted" | "small";

export const useRoundedStore = defineStore({
  id: "themeRounded",
  state: () => ({
    roundeds: ["base", "muted", "small"] as ThemeRounded[],
    rounded: "base" as ThemeRounded
  }),
  getters: {
    getRounded: state => state.rounded,
    getRoundeds: state => state.roundeds
  },
  actions: {
    setRounded(theme: ThemeRounded) {
      this.rounded = theme;
    }
  },
  persist: {
    key: "themeRounded",
    storage: localStorage
  }
});
