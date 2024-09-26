import { defineStore } from "pinia";

export const useDialogStore = defineStore({
  id: "dialog",
  state: () => ({
    isShowLogin: false
  }),
  getters: {
    // Optional: Add getters if needed
  },
  actions: {
    showLogin() {
      this.isShowLogin = true;
    },
    hideLogin() {
      this.isShowLogin = false;
    }
  }
});
