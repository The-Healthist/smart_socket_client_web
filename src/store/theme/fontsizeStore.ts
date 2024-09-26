import { defineStore } from "pinia";

export type ThemeFontSize = "base" | "muted" | "large";

export const useFontSizeStore = defineStore({
  id: "themeFontSize",
  state: () => ({
    fontSizes: ["base", "muted", "large"] as ThemeFontSize[],
    fontSize: "base" as ThemeFontSize
  }),
  getters: {
    getFontSize: state => state.fontSize,
    getFontSizes: state => state.fontSizes
  },
  actions: {
    setFontSize(theme: ThemeFontSize) {
      console.log(theme);
      this.fontSize = theme;
    }
  },
  persist: {
    key: "themeFontSize",
    storage: localStorage
  }
});
