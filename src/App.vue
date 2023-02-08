<template>
  <div>
    <router-view />
    <Modal :is-active="modalIsActive" :close-modal="closeModal">
      <component :is="modalComponent" v-bind="modalProps"></component>
    </Modal>
  </div>
</template>

<script>
import Modal from "./components/Modal.vue";
import ArticleFormModal from "./components/ArticleFormModal.vue";
import ArticleDeleteModal from "./components/ArticleDeleteModal.vue";

export default {
  name: "app",
  components: {
    Modal,
    ArticleFormModal,
    ArticleDeleteModal
  },
  methods: {
    closeModal() {
      this.$store.commit("closeModal");
    }
  },
  computed: {
    modalIsActive() {
      return this.$store.state.modalIsActive;
    },
    modalComponent() {
      return this.$store.state.modalComponent;
    },
    modalProps() {
      return this.$store.state.modalProps;
    }
  },
  created() {
    this.$store.dispatch("loadAuthors");
  }
};
</script>