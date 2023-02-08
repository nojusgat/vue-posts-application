<template>
  <div class="modal-content notification">
    <div class="has-text-centered">
      <p class="title">
        <i class="fa-solid fa-triangle-exclamation is-size-1"></i>
      </p>
      <p class="title">
        Are you sure?
      </p>
      <div class="level pt-3 is-mobile">
        <div class="level-item">
          <button
            class="button is-danger"
            @click="submit"
            :class="{ 'is-loading': loading }"
          >
            <span class="icon">
              <i class="fa-solid fa-trash"></i>
            </span>
            <span>Delete</span>
          </button>
        </div>
        <div class="level-item">
          <button class="button is-danger is-outlined" @click="closeModal">
            <span class="icon">
              <i class="fa-solid fa-ban"></i>
            </span>
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { messageMixin } from "../mixins/message";

export default {
  name: "ArticleDeleteModal",
  mixins: [messageMixin],
  data() {
    return {
      loading: false
    };
  },
  props: {
    id: {
      type: Number
    },
    redirect: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    submit() {
      this.loading = true;
      this.$http
        .delete(`/articles/${this.id}`)
        .then(() => {
          this.$store.commit("removeArticle", { id: this.id });
          this.showMessage("success", "Article has been deleted");
          if (this.redirect) this.$router.replace({ name: "posts" });
        })
        .catch(err => {
          console.error(err);
          this.showMessage(
            "error",
            "Got an error while deleting article. Try again later"
          );
        })
        .finally(() => {
          this.loading = false;
          this.closeModal();
        });
    },
    closeModal() {
      this.$store.commit("closeModal");
    }
  }
};
</script>

<style scoped>
@media screen and (min-width: 769px) {
  .modal-content {
    width: 360px;
  }
}
</style>
