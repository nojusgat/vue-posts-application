<template>
  <div class="container p-3">
    <Message />
    <div v-if="loading == true || article != null" class="box">
      <p class="title">
        <Skeleton :loading="loading">
          {{ articleWithAuthor.title }}
        </Skeleton>
      </p>
      <p class="subtitle">
        <Skeleton :loading="loading">
          {{ articleWithAuthor.author.name }}
        </Skeleton>
      </p>
      <div class="content is-normal">
        <Skeleton :loading="loading" :count="5">
          {{ articleWithAuthor.body }}
        </Skeleton>
      </div>
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <Skeleton :loading="loading" width="200px" height="25px">
              <time>{{ calculateDate }}</time>
            </Skeleton>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <Skeleton :loading="loading" width="100px" height="40px">
              <button
                class="button is-primary"
                @click="openModal('ArticleFormModal', { article })"
              >
                <span class="icon">
                  <i class="fa-solid fa-pen"></i>
                </span>
                <span>Edit</span>
              </button>
            </Skeleton>
          </div>
          <div class="level-item">
            <Skeleton :loading="loading" width="100px" height="40px">
              <button
                class="button is-danger"
                @click="
                  openModal('ArticleDeleteModal', {
                    id: article.id,
                    redirect: true
                  })
                "
              >
                <span class="icon">
                  <i class="fa-solid fa-trash"></i>
                </span>
                <span>Delete</span>
              </button>
            </Skeleton>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="is-flex is-align-items-center is-justify-content-center"
      style="height: calc(100vh - 1.5rem)"
    >
      <div class="notification is-warning" style="width: 100%">
        Article does not exist
      </div>
    </div>
  </div>
</template>

<script>
import { Skeleton } from "vue-loading-skeleton";
import { articleMixin } from "../mixins/article";
import Message from "../components/Message.vue";

export default {
  name: "PostDetails",
  mixins: [articleMixin],
  data() {
    return {
      loading: true
    };
  },
  components: {
    Message,
    Skeleton
  },
  methods: {
    getArticle() {
      this.article = null;
      this.loading = true;
      this.$http
        .get(`articles/${this.$route.params.id}`)
        .then(response => {
          this.article = response.data;
        })
        .catch(err => {
          console.error(err);
          this.article = null;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    openModal(component, props) {
      this.$store.commit("openModal", { component, props });
    }
  },
  computed: {
    article: {
      get() {
        return this.$store.state.articles[0];
      },
      set(value) {
        this.$store.commit("setArticles", [value]);
      }
    },
    authors: {
      get() {
        return this.$store.state.authors;
      },
      set(value) {
        this.$store.commit("setAuthors", value);
      }
    },
    articleWithAuthor() {
      if (this.article == null || this.authors == null) return {};

      const author = this.authors.find(
        author => author.id == this.article.author
      );
      const authorName = (author && author.name) || "unknown";
      return {
        ...this.article,
        author: {
          id: this.article.author,
          name: authorName
        }
      };
    }
  },
  created() {
    this.getArticle();
  }
};
</script>
