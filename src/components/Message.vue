<template>
  <article
    v-if="message"
    :class="['message', 'is-clickable', messageClass]"
    @click="closeMessage"
    title="Click to dismiss"
  >
    <div class="message-body">
      {{ message }}
    </div>
  </article>
</template>

<script>
import { messageMixin } from "../mixins/message";

export default {
  name: "Message",
  mixins: [messageMixin],
  computed: {
    messageClass() {
      if (this.$store.state.message.type == "success") return "is-success";
      if (this.$store.state.message.type == "warning") return "is-warning";
      return "is-danger";
    },
    message() {
      return this.$store.state.message.text;
    }
  }
};
</script>
