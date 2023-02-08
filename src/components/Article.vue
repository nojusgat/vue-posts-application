<template>
  <div class="card">
    <div class="card-content">
      <p class="title">
        {{ article.title }}
      </p>
      <p class="subtitle">
        {{ article.author.name }}
      </p>
      <time>{{ calculateDate }}</time>
    </div>
    <footer class="card-footer">
      <div class="level card-footer-item">
        <div class="level-item">
          <router-link
            :to="{ name: 'details', params: { id: article.id } }"
            tag="button"
            class="button is-info"
          >
            <span class="icon">
              <i class="fa-regular fa-eye"></i>
            </span>
            <span>Details</span>
          </router-link>
        </div>
        <div class="level-item">
          <button
            class="button is-primary"
            @click="
              openModal('ArticleFormModal', { article })
            "
          >
            <span class="icon">
              <i class="fa-solid fa-pen"></i>
            </span>
            <span>Edit</span>
          </button>
        </div>
        <div class="level-item">
          <button
            class="button is-danger"
            @click="openModal('ArticleDeleteModal', { id: article.id, redirect: false })"
          >
            <span class="icon">
              <i class="fa-solid fa-trash"></i>
            </span>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { articleMixin } from "../mixins/article";

export default {
  name: "Article",
  mixins: [articleMixin],
  props: {
    article: {
      type: Object
    }
  },
  methods: {
    openModal(component, props) {
      this.$store.commit("openModal", { component, props });
    }
  }
};
</script>
