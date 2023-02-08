export const messageMixin = {
  methods: {
    showMessage(type, text) {
      this.$store.commit("sendMessage", { type, text });
    },
    closeMessage() {
      this.$store.commit("sendMessage", { type: "", text: "" });
    }
  }
};
